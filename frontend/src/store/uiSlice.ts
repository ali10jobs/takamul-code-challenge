import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Locale = "en" | "ar";

interface UiState {
  locale: Locale;
  isRTL: boolean;
  isServicesDropdownOpen: boolean;
  isSearchOpen: boolean;
}

const initialState: UiState = {
  locale: "en",
  isRTL: false,
  isServicesDropdownOpen: false,
  isSearchOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
      state.isRTL = action.payload === "ar";
    },
    toggleLocale(state) {
      state.locale = state.locale === "en" ? "ar" : "en";
      state.isRTL = state.locale === "ar";
    },
    setServicesDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isServicesDropdownOpen = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setLocale, toggleLocale, setServicesDropdownOpen, setSearchOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
