import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GamesFilterState {
  search: string;
}

const initialState: GamesFilterState = {
  search: "",
};

const gamesFilterSlice = createSlice({
  name: "gamesFilter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = gamesFilterSlice.actions;
export default gamesFilterSlice.reducer;
