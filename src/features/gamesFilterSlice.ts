import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GamesFilterState {
  search: string;
  gameType: string | null;
}

const initialState: GamesFilterState = {
  search: "",
  gameType: null,
};

const gamesFilterSlice = createSlice({
  name: "gamesFilter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setGameType(state, action: PayloadAction<string>) {
      state.gameType = action.payload;
    },
  },
});

export const { setSearch, setGameType } = gamesFilterSlice.actions;
export default gamesFilterSlice.reducer;
