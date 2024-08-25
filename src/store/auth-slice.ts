// import { auth, db } from "@/firebase";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
//
// export type User = {
//   createdAt?: string;
//   email: null | string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   uid: string;
//   username: string;
// };
//
// export type UsersState = {
//   authorizedUser: User | null;
// };
//
// // Инициализация состояния с типизацией
// const initialState: UsersState = {
//   authorizedUser: null,
// };
//
// const slice = createSlice({
//   extraReducers: (builder) => {
//     builder.addCase(
//       addUserAsync.fulfilled,
//       (state, action: PayloadAction<User>) => {
//         state.authorizedUser = action.payload;
//       },
//     );
//     builder.addCase(addUserAsync.rejected, (_state, action) => {
//       console.error("Error logging in:", action.payload);
//     });
//     builder.addCase(logoutUser.fulfilled, (state) => {
//       state.authorizedUser = null;
//       localStorage.removeItem("token");
//     });
//     builder.addCase(logoutUser.rejected, (_state, action) => {
//       console.error("Error logging out:", action.payload);
//     });
//   },
//   initialState,
//   name: "auth",
//   reducers: {},
//   selectors: {
//     getUserData: (sliceState) => sliceState.authorizedUser,
//     isAuth: (sliceState) => !!sliceState.authorizedUser,
//   },
// });
//
// //thunks
// export const addUserAsync = createAsyncThunk(
//   "users/addUserAsync",
//   async (
//     loginData: { email: string; password: string },
//     { rejectWithValue },
//   ) => {
//     try {
//       // Авторизация пользователя через Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         loginData.email,
//         loginData.password,
//       );
//       const user = userCredential.user;
//       const accessToken = await user.getIdToken();
//
//       localStorage.setItem("token", accessToken);
//       // Получение дополнительных данных пользователя из Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);
//
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//
//         return {
//           createdAt: user.metadata.creationTime,
//           email: user.email,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           phone: userData.phone,
//           uid: user.uid,
//           username: userData.username,
//         };
//       } else {
//         throw new Error("No such document!");
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
//
// export const logoutUser = createAsyncThunk(
//   "users/logoutUserAsync",
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
//
// export const authReducer = slice.reducer;
//
// export const { getUserData, isAuth } = slice.selectors;
import { auth, db } from "@/firebase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Типы данных пользователя
export type User = {
  createdAt?: string;
  email: null | string;
  firstName: string;
  lastName: string;
  phone: string;
  uid: string;
  username: string;
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
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      // dispatch(setLoading(true));

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
      // dispatch(setLoading(false));
    });
  });
});

// Thunk для авторизации пользователя
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue },
  ) => {
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
        };
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Thunk для выхода из системы
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

export const { getUserData, isAuth } = slice.selectors;
