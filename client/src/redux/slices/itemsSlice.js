import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  itemsList: [],
  status: "idle",
  error: null
}

export const fetchItems = createAsyncThunk("items/getItems", async () => {
  const response = await fetch("/api/items/")
  return response.json();
})

export const updateItem = createAsyncThunk("items/updateItem", async (item) => {
  const response = await fetch("/api/items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: item.name, 
      category: item.category,
      count: item.count
    })
  })
  return response.json();
})

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeItem: (state, action) => {
      return state.itemsList.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.itemsList = state.itemsList.concat(action.payload)
    },
    [fetchItems.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateItem.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload);

      // Need to update items state using payload
      let catInd = 0;
      for (let i = 0; i < state.itemsList.length; i++) {
        if (state.itemsList[i]._id === action.payload.category) {
          catInd = i;
        }
      }
      let itInd = 0;
      for (let i = 0; i < state.itemsList[catInd].items.length; i++) {
        if (state.itemsList[catInd].items[i].name === action.payload.name) {
          itInd = i;
        }
      }
      state.itemsList[catInd].items[itInd].count = action.payload.count;
    }
  }
})

export const { removeItem } = itemsSlice.actions

export default itemsSlice.reducer