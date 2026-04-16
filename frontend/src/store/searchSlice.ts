import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchTab = "team" | "services";

interface SearchState {
  query: string;
  activeTab: SearchTab;
  currentPage: number;
  totalPages: number;
}

const initialState: SearchState = {
  query: "",
  activeTab: "team",
  currentPage: 1,
  totalPages: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setActiveTab(state, action: PayloadAction<SearchTab>) {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setQuery, setActiveTab, setCurrentPage, setTotalPages } =
  searchSlice.actions;
export default searchSlice.reducer;
