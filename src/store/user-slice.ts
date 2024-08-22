import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Advertisement, User } from "@/types";

// Инициализация состояния с типизацией
export type UsersState = {
  users: User[];
  adverts: {
    [userId: string]: Advertisement[];
  };
};

// Инициализация состояния
const initialState: UsersState = {
  users: [], // Массив User[]
  adverts: {},
};

// Слайс
const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
    builder.addCase(fetchAllUsers.rejected, (_state, action) => {
      console.error("Error fetching users:", action.payload);
    });
    builder.addCase(
      createAdvertisement.fulfilled,
      (state, action: PayloadAction<Advertisement>) => {
        const ad = action.payload;
        if (!state.adverts[ad.userId]) {
          state.adverts[ad.userId] = [];
        }
        state.adverts[ad.userId].push(ad);
      },
    );
    builder.addCase(createAdvertisement.rejected, (_state, action) => {
      console.error("Error creating advertisement:", action.payload);
    });
  },
});

// Thunks
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push({
          uid: doc.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          username: userData.username,
          createdAt: userData.createdAt,
        });
      });
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createAdvertisement = createAsyncThunk(
  "users/createAdvertisement",
  async (
    {
      title,
      description,
      price,
      photoUrl,
    }: { title: string; description: string; price: number; photoUrl?: string },
    { getState, rejectWithValue },
  ) => {
    try {
      // Получаем информацию о текущем пользователе из состояния
      const state = getState() as { users: UsersState; auth: { uid: string } };
      const currentUser = state.users.users.find(
        (user) => user.uid === state.auth.uid,
      );

      if (!currentUser) {
        throw new Error("User not found");
      }

      // Создаем объявление
      const newAd: Omit<Advertisement, "id"> = {
        title,
        description,
        price,
        userId: currentUser.uid,
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        createdAt: new Date().toISOString(),
        photoUrl,
      };

      // Добавляем объявление в Firebase Firestore
      const docRef = await addDoc(collection(db, "advertisements"), newAd);
      return { ...newAd, id: docRef.id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const userReducer = slice.reducer;
// export const {} = slice.selectors;
