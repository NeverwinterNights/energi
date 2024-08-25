import { db } from "@/firebase";
import { setLoading } from "@/store/app-slice";
import { Advertisement, User } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore"; // Инициализация состояния с типизацией

// Инициализация состояния с типизацией
export type UsersState = {
  adverts: {
    [userId: string]: Advertisement[];
  };
  users: User[];
};

// Инициализация состояния
const initialState: UsersState = {
  adverts: {},
  users: [], // Массив User[]
};

// Слайс
const slice = createSlice({
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
  initialState,
  name: "users",
  reducers: {},
  selectors: {
    getAllUsers: (state: UsersState) => state.users, // Селектор для получения всех пользователей
  },
});

// Thunks
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));

      const querySnapshot = await getDocs(collection(db, "users"));
      const users: User[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        users.push({
          createdAt: userData.createdAt,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          uid: doc.id,
          username: userData.username,
        });
      });

      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const createAdvertisement = createAsyncThunk(
  "users/createAdvertisement",
  async (
    {
      description,
      photoUrl,
      price,
      title,
    }: { description: string; photoUrl?: string; price: number; title: string },
    { getState, rejectWithValue },
  ) => {
    try {
      // Получаем информацию о текущем пользователе из состояния
      const state = getState() as { auth: { uid: string }; users: UsersState };
      const currentUser = state.users.users.find(
        (user) => user.uid === state.auth.uid,
      );

      if (!currentUser) {
        throw new Error("User not found");
      }

      // Создаем объявление
      const newAd: Omit<Advertisement, "id"> = {
        createdAt: new Date().toISOString(),
        description,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        photoUrl,
        price,
        title,
        userId: currentUser.uid,
        username: currentUser.username,
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
export const { getAllUsers } = slice.selectors;

// export const {} = slice.selectors;
