import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Advert = {
  title: string;
  created: Date;
  modified: Date;
  description: string;
  category: string;
  price: number;
  views: number;
  id: string;
};

const initialState: { [key: string]: Advert[] } = {};

const slice = createSlice({
  name: "advert",
  initialState,
  reducers: {
    addAdvert: (
      state,
      action: PayloadAction<{
        userId: string;
        advert: Omit<Advert, "created" | "modified" | "id">;
      }>,
    ) => {
      const id = Math.random().toString(36).slice(2, 11);
      const currentTime = new Date();

      const newAdvert: Advert = {
        ...action.payload.advert,
        id,
        created: currentTime,
        modified: currentTime,
      };

      if (Array.isArray(state[action.payload.userId])) {
        state[action.payload.userId].push(newAdvert);
      } else {
        state[action.payload.userId] = [newAdvert];
      }
    },

    // getAllAdvert: (state, action: PayloadAction<>) => {
    // },
    // getCurrentAdvert: (state, action: PayloadAction<>) => {
    // },
    updateAdvert: (
      state,
      action: PayloadAction<{
        userId: string;
        advertId: string;
        updatedData: Partial<Omit<Advert, "id" | "created">>;
      }>,
    ) => {
      const { userId, advertId, updatedData } = action.payload;
      const userAdverts = state[userId];

      if (userAdverts) {
        const advertIndex = userAdverts.findIndex((ad) => ad.id === advertId);

        if (advertIndex !== -1) {
          const existingAdvert = userAdverts[advertIndex];

          // Обновляем только поля, которые были переданы
          userAdverts[advertIndex] = {
            ...existingAdvert,
            ...updatedData,
            modified: new Date(), // Обновляем время изменения
          };
        }
      }
    },
    deleteAdvert: (
      state,
      action: PayloadAction<{
        userId: string;
        advertId: string;
      }>,
    ) => {
      const { userId, advertId } = action.payload;
      const userAdverts = state[userId];

      if (userAdverts) {
        // Фильтруем массив объявлений, исключая удаляемое объявление
        state[userId] = userAdverts.filter((ad) => ad.id !== advertId);
      }
    },
  },
  selectors: {
    selectAdvertById: (
      sliceState: typeof initialState,
      userId: string,
      advertId: string,
    ) => {
      const userAdverts = sliceState[userId];
      if (userAdverts) {
        return userAdverts.find((advert) => advert.id === advertId) || null;
      }
      return null;
    },
    getAllAdvert: (sliceState: typeof initialState, userId: string) => {
      return sliceState[userId] || [];
    },
  },
});
export const advertReducer = slice.reducer;
// export const {
//   addAdvert,
//   getCurrentAdvert,
//   getAllAdvert,
//   updateAdvert,
//   deleteAdvert,
// } = slice.actions;
// export const {} = slice.selectors;
