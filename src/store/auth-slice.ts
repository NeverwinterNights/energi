import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";

export type User = {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  createdAt?: string;
};

export type UsersState = {
  authorizedUser: User | null;
};

// Инициализация состояния с типизацией
const initialState: UsersState = {
  authorizedUser: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
  },
  selectors: {
    isAuth: (sliceState) => !!sliceState.authorizedUser,
    getUserData: (sliceState) => sliceState.authorizedUser,
  },
});

//thunks
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Авторизация пользователя через Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password,
      );
      const user = userCredential.user;
      const accessToken = await user.getIdToken();
      localStorage.setItem("token", accessToken);
      // Получение дополнительных данных пользователя из Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: user.uid,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          username: userData.username,
          createdAt: user.metadata.creationTime,
        };
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "users/logoutUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const authReducer = slice.reducer;

export const { isAuth, getUserData } = slice.selectors;
