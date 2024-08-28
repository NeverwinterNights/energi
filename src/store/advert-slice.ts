import { Advert, AdvertState, FetchAdvertsParams } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit as firebaseLimit,
  startAfter as firebaseStartAfter,
  getDocs,
  getFirestore,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const initialState: AdvertState = {
  advertByAllUser: {},
  advertById: {},
  allAdverts: [],
  lastVisible: null,
};

// Санка для получения объявлений с пагинацией
export const fetchAdvertsWithPagination = createAsyncThunk<
  { adverts: Advert[]; lastVisible: null | string }, // Тип возвращаемого значения
  FetchAdvertsParams, // Тип аргумента
  { rejectValue: string }
>(
  "advert/fetchAdvertsWithPagination",
  async (params = {}, { rejectWithValue }) => {
    try {
      const db = getFirestore();
      const advertsRef = collection(db, "adverts");
      const limitValue = params.limit ?? 10; // Устанавливаем значение по умолчанию для limit
      let q = query(
        advertsRef,
        orderBy("created", "desc"),
        firebaseLimit(limitValue),
      );

      if (params.startAfter) {
        const startAfterDoc = doc(db, "adverts", params.startAfter);

        q = query(
          advertsRef,
          orderBy("created", "desc"),
          firebaseStartAfter(startAfterDoc),
          firebaseLimit(limitValue),
        );
      }
      const querySnapshot = await getDocs(q);
      const adverts: Advert[] = [];
      let lastVisible: null | string = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Advert, "id">;

        adverts.push({
          ...data,
          id: doc.id,
          created: (data.created as unknown as Timestamp)
            .toDate()
            .toISOString(),
          modified: (data.modified as unknown as Timestamp)
            .toDate()
            .toISOString(), // Преобразование в строку
        });
      });

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        lastVisible = lastDoc.id;
      }
      console.log("adverts", adverts);

      return { adverts, lastVisible };
    } catch (error) {
      return rejectWithValue("Failed to fetch adverts");
    }
  },
);

// Санка для получения объявлений пользователя
export const fetchUserAdverts = createAsyncThunk<
  Advert[], // Тип данных, возвращаемых санкой
  string, // Тип аргумента (userId)
  { rejectValue: string }
>("advert/fetchUserAdverts", async (userId, { rejectWithValue }) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, "adverts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const adverts: Advert[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Advert, "id">;

      adverts.push({
        ...data,
        id: doc.id,
        created: (data.created as unknown as Timestamp).toDate().toISOString(),
        modified: (data.modified as unknown as Timestamp)
          .toDate()
          .toISOString(), // Преобразование в строку
      });
    });

    return adverts;
  } catch (error) {
    return rejectWithValue("Failed to fetch adverts");
  }
});

// Создание объявления
export const createAdvert = createAsyncThunk<
  Advert, // Тип возвращаемого значения
  {
    advert: Omit<Advert, "created" | "id" | "modified" | "views">;
    userId: string;
  }, // Тип аргумента
  { rejectValue: string }
>("advert/createAdvert", async (payload, { rejectWithValue }) => {
  try {
    const { advert, userId } = payload;
    const db = getFirestore();
    const newAdvert = {
      ...advert,
      userId,
      created: Timestamp.now(),
      modified: Timestamp.now(),
      views: 0,
    };
    const docRef = await addDoc(collection(db, "adverts"), newAdvert);

    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      posts: increment(1), // Увеличиваем количество постов на 1
    });

    return {
      ...newAdvert,
      id: docRef.id,
      created: newAdvert.created.toDate().toISOString(),
      modified: newAdvert.modified.toDate().toISOString(),
    };
  } catch (error) {
    return rejectWithValue("Failed to create advert");
  }
});

// Удаление объявления
export const deleteAdvert = createAsyncThunk<
  { advertId: string; userId: string }, // Тип возвращаемого значения
  { advertId: string; userId: string }, // Тип аргумента
  { rejectValue: string }
>("advert/deleteAdvert", async (payload, { rejectWithValue }) => {
  try {
    const { advertId } = payload;
    const db = getFirestore();

    await deleteDoc(doc(db, "adverts", advertId));

    return payload;
  } catch (error) {
    return rejectWithValue("Failed to delete advert");
  }
});
// Обновление объявления
export const updateAdvert = createAsyncThunk<
  Advert, // Тип возвращаемого значения
  {
    advertId: string;
    updatedData: Partial<Omit<Advert, "created" | "id">>;
    userId: string;
  }, // Тип аргумента
  { rejectValue: string }
>("advert/updateAdvert", async (payload, { rejectWithValue }) => {
  try {
    const { advertId, updatedData } = payload;
    const db = getFirestore();
    const advertRef = doc(db, "adverts", advertId);
    const updateData = {
      ...updatedData,
      modified: Timestamp.now(),
    };

    await updateDoc(advertRef, updateData);

    return {
      ...updateData,
      id: advertId,
      created: new Date().toISOString(),
      modified: updateData.modified.toDate().toISOString(),
    } as Advert;
  } catch (error) {
    return rejectWithValue("Failed to update advert");
  }
});

const slice = createSlice({
  initialState,
  name: "advert",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAdverts.fulfilled, (state, action) => {
        const userId = action.meta.arg;

        state.advertById[userId] = action.payload;
      })
      .addCase(fetchUserAdverts.rejected, (_state, action) => {
        console.error(action.payload || "Failed to fetch user adverts");
      })
      // Создание объявления
      .addCase(createAdvert.fulfilled, (state, action) => {
        const newAdvert = action.payload;
        const userId = newAdvert.userId;

        if (Array.isArray(state.advertByAllUser[userId])) {
          state.advertByAllUser[userId].push(newAdvert);
        } else {
          state.advertByAllUser[userId] = [newAdvert];
        }
        // Обновляем advertById
        state.advertById[newAdvert.id] = [newAdvert];

        state.allAdverts.unshift(newAdvert);
      })
      .addCase(createAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to create advert");
      })
      // Удаление объявления
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        const { advertId, userId } = action.payload;

        const advertsAllUser = state.advertByAllUser[userId];

        if (advertsAllUser) {
          state.advertByAllUser[userId] = advertsAllUser.filter(
            (ad) => ad.id !== advertId,
          );
        }
        delete state.advertById[advertId];
      })
      .addCase(deleteAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to delete advert");
      })
      // Обновление объявления
      .addCase(updateAdvert.fulfilled, (state, action) => {
        const updatedAdvert = action.payload;
        const userId = updatedAdvert.userId;

        const advertsAllUser = state.advertByAllUser[userId];

        if (advertsAllUser) {
          const advertIndex = advertsAllUser.findIndex(
            (ad) => ad.id === updatedAdvert.id,
          );

          if (advertIndex !== -1) {
            advertsAllUser[advertIndex] = updatedAdvert;
          }
        }
        state.advertById[updatedAdvert.id] = [updatedAdvert];
      })
      .addCase(updateAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to update advert");
      })
      // Обработка получения объявлений с пагинацией
      .addCase(fetchAdvertsWithPagination.fulfilled, (state, action) => {
        const { adverts, lastVisible } = action.payload;

        const newAdverts = adverts.filter(
          (newAd) =>
            !state.allAdverts.some((existingAd) => existingAd.id === newAd.id),
        );

        state.allAdverts = [...state.allAdverts, ...newAdverts];
        state.lastVisible = lastVisible;
      })
      .addCase(fetchAdvertsWithPagination.rejected, (_state, action) => {
        console.error(action.payload || "Failed to fetch adverts");
      });
  },
  selectors: {
    getAllAdverts: (state: AdvertState) => state.allAdverts,
    getLastVisible: (state: AdvertState) => state.lastVisible,
    getAdvertsByUserId: (state: AdvertState, userId: string) =>
      state.advertByAllUser[userId] || [],
  },
});

export const { getAllAdverts, getLastVisible } = slice.selectors;
export const advertReducer = slice.reducer;
