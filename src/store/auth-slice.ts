import { auth, db } from "@/firebase";
import { CreateUserFormValues } from "@/schemas/create-user-modal-schema";
import { setLoading } from "@/store/app-slice";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Типы данных пользователя
export type User = {
  createdAt?: string;
  email: null | string;
  firstName: string;
  lastName: string;
  phone: string;
  uid: string;
  username: string;
  posts: number;
};

// Тип состояния пользователя
export type UsersState = {
  authorizedUser: User | null;
};

// Инициализация состояния
const initialState: UsersState = {
  authorizedUser: null,
};

// Создание слайса
const slice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(
      addUserAsync.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.authorizedUser = action.payload;
      },
    );
    builder.addCase(addUserAsync.rejected, (_state, action) => {
      console.error("Error logging in:", action.payload);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.authorizedUser = null;
      localStorage.removeItem("token");
    });
    builder.addCase(logoutUser.rejected, (_state, action) => {
      console.error("Error logging out:", action.payload);
    });
    builder.addCase(
      createUserAsync.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.authorizedUser = action.payload;
      },
    ),
      builder.addCase(createUserAsync.rejected, (_state, action) => {
        console.error("Error creating user:", action.payload);
      });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        state.authorizedUser = action.payload;
      },
    );
    builder.addCase(fetchCurrentUser.rejected, (_state, action) => {
      console.error("Error fetching current user:", action.payload);
    });
  },
  initialState,
  name: "auth",
  reducers: {},
  selectors: {
    getUserData: (sliceState) => sliceState.authorizedUser,
    isAuth: (sliceState) => !!sliceState.authorizedUser,
  },
});

// Thunks

// Thunk для проверки авторизации пользователя и получения его данных (me запрос)
export const fetchCurrentUser = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue, dispatch }) => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      dispatch(setLoading(true));

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Убедитесь, что поля правильные и соответствуют типу User
            resolve({
              createdAt: user.metadata.creationTime,
              email: user.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone,
              uid: user.uid,
              username: userData.username,
              posts: userData.posts || 0,
            });
          } else {
            resolve(null);
          }
        } catch (error: any) {
          reject(rejectWithValue(error.message));
        }
      } else {
        resolve(null);
      }
      dispatch(setLoading(false));
    });
  });
});

// Thunk для авторизации пользователя
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password,
      );
      const user = userCredential.user;
      const accessToken = await user.getIdToken();

      localStorage.setItem("token", accessToken);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        return {
          createdAt: user.metadata.creationTime,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          uid: user.uid,
          username: userData.username,
          posts: userData.posts || 0,
        };
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const createUserAsync = createAsyncThunk<
  User,
  CreateUserFormValues,
  { rejectValue: string }
>("users/createUserAsync", async (data, { rejectWithValue }) => {
  try {
    // Создание пользователя в Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    const user = userCredential.user;

    // Сохранение данных пользователя в Firestore
    const userDocRef = doc(db, "users", user.uid);

    await setDoc(userDocRef, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      username: data.username,
      createdAt: user.metadata.creationTime,
      posts: 0, // Изначально 0
    });

    return {
      createdAt: user.metadata.creationTime,
      email: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      uid: user.uid,
      username: data.username,
      posts: 0,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk для выхода из системы
export const logoutUser = createAsyncThunk(
  "users/logoutUserAsync",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true));
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
    dispatch(setLoading(false));
  },
);

export const authReducer = slice.reducer;

export const { getUserData, isAuth } = slice.selectors;
