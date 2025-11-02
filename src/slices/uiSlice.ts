// UI state management slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'en'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'tr' | 'az'>) => {
      state.language = action.payload;
    },
    resetUI: (state) => {
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  clearError,
  setTheme,
  setLanguage,
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;