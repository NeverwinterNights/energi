import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// Тип объявления
type Advert = {
  category: string;
  created: Date;
  description: string;
  id: string;
  modified: Date;
  price: number;
  title: string;
  views: number;
  userId: string;
};

// Расширенная структура стейта
type AdvertState = {
  advertByAllUser: { [key: string]: Advert[] };
  advertById: { [key: string]: Advert[] };
};

const initialState: AdvertState = {
  advertByAllUser: {},
  advertById: {},
};

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
        created: (data.created as unknown as Timestamp).toDate(), // Преобразование Timestamp в Date
        modified: (data.modified as unknown as Timestamp).toDate(), // Преобразование Timestamp в Date
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
  { advert: Omit<Advert, "created" | "id" | "modified">; userId: string }, // Тип аргумента
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
    };
    const docRef = await addDoc(collection(db, "adverts"), newAdvert);

    return {
      ...newAdvert,
      id: docRef.id,
      created: newAdvert.created.toDate(),
      modified: newAdvert.modified.toDate(),
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
      created: new Date(), // Используем текущую дату как временную метку
      modified: updateData.modified.toDate(),
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

        // Обновляем advertByAllUser
        if (Array.isArray(state.advertByAllUser[userId])) {
          state.advertByAllUser[userId].push(newAdvert);
        } else {
          state.advertByAllUser[userId] = [newAdvert];
        }

        // Обновляем advertById
        state.advertById[newAdvert.id] = [newAdvert];
      })
      .addCase(createAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to create advert");
      })
      // Удаление объявления
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        const { advertId, userId } = action.payload;

        // Удаляем из advertByAllUser
        const advertsAllUser = state.advertByAllUser[userId];

        if (advertsAllUser) {
          state.advertByAllUser[userId] = advertsAllUser.filter(
            (ad) => ad.id !== advertId,
          );
        }

        // Удаляем из advertById
        delete state.advertById[advertId];
      })
      .addCase(deleteAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to delete advert");
      })
      // Обновление объявления
      .addCase(updateAdvert.fulfilled, (state, action) => {
        const updatedAdvert = action.payload;
        const userId = updatedAdvert.userId;

        // Обновляем advertByAllUser
        const advertsAllUser = state.advertByAllUser[userId];

        if (advertsAllUser) {
          const advertIndex = advertsAllUser.findIndex(
            (ad) => ad.id === updatedAdvert.id,
          );

          if (advertIndex !== -1) {
            advertsAllUser[advertIndex] = updatedAdvert;
          }
        }

        // Обновляем advertById
        state.advertById[updatedAdvert.id] = [updatedAdvert];
      })
      .addCase(updateAdvert.rejected, (_state, action) => {
        console.error(action.payload || "Failed to update advert");
      });
  },
});

// Экспортируем редьюсер и экшены
export const advertReducer = slice.reducer;
