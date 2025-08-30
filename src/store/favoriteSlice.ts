import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setLoading, setError } =
  favoriteSlice.actions;

export const selectFavorites = (state: { favorites: FavoriteState }) =>
  state.favorites.favorites;
export const selectIsLoading = (state: { favorites: FavoriteState }) =>
  state.favorites.isLoading;
export const selectError = (state: { favorites: FavoriteState }) =>
  state.favorites.error;

export default favoriteSlice.reducer;
