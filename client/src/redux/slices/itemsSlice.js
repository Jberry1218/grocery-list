import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: Math.random(), name: "Eggs" },
    { id: Math.random(), name: "Milk" },
    { id: Math.random(), name: "Steak" },
    { id: Math.random(), name: "Water" }
]

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push({ id: Math.random(), name: action.payload });
    },
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  },
})

export const { add, remove } = itemsSlice.actions

export default itemsSlice.reducer