import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  itemsList: [],
  shoppingMode: false,
  status: "idle",
  error: null
}

export const fetchItems = createAsyncThunk("items/getItems", async () => {
  const response = await fetch("/api/items/")
  return response.json();
})

export const updateItem = createAsyncThunk("items/updateItem", async (item) => {
  const response = await fetch("/api/items/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: item.id,
      count: item.count
    })
  })
  return response.json();
})

export const deleteItem = createAsyncThunk("items/deleteItem", async (item) => {
  const response = await fetch("/api/items/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: item.id,
      name: item.name,
      category: item.category
    })
  })
  return response.json();
})

export const addItem = createAsyncThunk("items/addItem", async (item) => {
  const response = await fetch("/api/items/add", {
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

export const foundItem = createAsyncThunk("items/foundItem", async (item) => {
  const response = await fetch("/api/items/found", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: item.id,
      found: item.found
    })
  })
  return response.json();
})

export const foundReset = createAsyncThunk("items/foundReset", async () => {
  const response = await fetch("/api/items/foundreset")
  return response.json();
})

// Find index of category and item from itemList
let findIndex = (state, category, item) => {
  let catInd = -1;
  for (let i = 0; i < state.itemsList.length; i++) {
    if (state.itemsList[i]._id === category) {
      catInd = i;
    }
  }
  let itInd = 0;
  if (catInd === -1) {
    return [catInd, itInd];
  }
  for (let i = 0; i < state.itemsList[catInd].items.length; i++) {
    if (state.itemsList[catInd].items[i].name === item) {
      itInd = i;
    }
  }
  return [catInd, itInd]
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: { toggleShopping(state) {
      state.shoppingMode = !state.shoppingMode
    }
  },
  extraReducers: {
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.itemsList = state.itemsList.concat(action.payload);
    },
    [updateItem.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
      state.itemsList[catInd].items[itInd].count = action.payload.count;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
      console.log(action.payload)
      if (state.itemsList[catInd].items.length === 1) {
        state.itemsList.splice(catInd, 1);
      } else {
        state.itemsList[catInd].items.splice(itInd, 1);
      }
    },
    [addItem.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
      if (catInd === -1) {
        state.itemsList.push({
          _id: action.payload.category,
          items: [action.payload]
        })
      } else {
        state.itemsList[catInd].items.push(action.payload)
      }
    },
    [foundItem.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
      state.itemsList[catInd].items[itInd].found = action.payload.found;
    },
    [foundReset.fulfilled]: (state) => {
      state.status = 'succeeded';
      window.location.reload();
    }
  }
})

export const { toggleShopping } = itemsSlice.actions

export default itemsSlice.reducer