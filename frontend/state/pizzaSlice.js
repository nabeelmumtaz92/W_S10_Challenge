// /frontend/state/pizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';



const pizzaSlice = createSlice({
  name: 'pizza',
  initialState:{size:'All'},
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {setFilter } = pizzaSlice.actions;
export default pizzaSlice.reducer;
