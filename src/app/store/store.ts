import { api } from "@/shared/api/api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import gamesFilterReducer from "@/features/gamesFilterSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    gamesFilter: gamesFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
