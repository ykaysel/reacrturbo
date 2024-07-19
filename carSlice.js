import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    filters: {
      cars: 'none',
      model: 'none',
      usedtype: '',
      ban: 'none'
    },
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setCars, setFilters } = carSlice.actions;
export default carSlice.reducer;
