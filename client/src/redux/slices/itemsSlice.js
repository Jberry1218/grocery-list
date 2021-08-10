import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null
}

export const fetchItems = createAsyncThunk("items/getItems", async () => {
  const response = await fetch("/api/items/")
  return response.json();
})

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({ id: Math.random(), name: action.payload });
    },
    removeItem: (state, action) => {
      return state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.concat(action.payload)
    },
    [fetchItems.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { addItem, removeItem } = itemsSlice.actions

export default itemsSlice.reducer