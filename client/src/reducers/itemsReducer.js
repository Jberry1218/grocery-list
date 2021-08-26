import { 
    ITEMS_LOADING,
    ITEMS_LOADED,
    UPDATE_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
    FOUND_ITEM,
    RESET_FOUND_ITEMS,
    TOGGLE_SHOPPING_MODE,
    CLEAR_ITEMS
} from "../actions/types";

const initialState = {
    itemsList: [],
    loading: false,
    shoppingMode: false
};

// Find index of category and item from itemList
let findIndex = (state, category, item) => {
    let catInd = -1;
    for (let i = 0; i < state.itemsList.length; i++) {
      if (state.itemsList[i]._id === category) {
        catInd = i;
      }
    }
    let itInd = -1;
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

export default function(state = initialState, action) {
    switch (action.type) {
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ITEMS_LOADED:
            return {
                ...state,
                itemsList: action.payload,
                loading: false
            }
        case UPDATE_ITEM: {
            let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
            state.itemsList[catInd].items[itInd].count = action.payload.count;
            return {
                ...state
            }
        }
        case ADD_ITEM:
            let item = {
                name: action.payload.name,
                id: action.payload._id,
                category: action.payload.category,
                count: action.payload.count,
                found: action.payload.found
            }
            let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
            if (catInd === -1) {
                state.itemsList.push({
                    _id: action.payload.category,
                    items: [item]
                })
            } else if (itInd === -1) {
                state.itemsList[catInd].items.push(item)
            } else {
                state.itemsList[catInd].items[itInd].count = action.payload.count;
            }
            return {
                ...state
            }
        case DELETE_ITEM: {
            let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
            if (state.itemsList[catInd].items.length === 1) {
                state.itemsList.splice(catInd, 1);
            } else {
                state.itemsList[catInd].items.splice(itInd, 1);
            }
            return {
                ...state
            }
        }
        case FOUND_ITEM: {
            let [ catInd, itInd ] = findIndex(state, action.payload.category, action.payload.name);
            state.itemsList[catInd].items[itInd].found = action.payload.found;
            return {
                ...state
            }
        }
        case RESET_FOUND_ITEMS:
            for (let i = 0; i < state.itemsList.length; i++) {
                for (let j = 0; j < state.itemsList[i].items.length; j++) {
                    state.itemsList[i].items[j].found = false;
                }
            }
            return {
                ...state
            }
        case TOGGLE_SHOPPING_MODE:
            return {
                ...state,
                shoppingMode: !state.shoppingMode
            }
        case CLEAR_ITEMS:
            return {
                ...state,
                itemsList: []
            }
        default:
            return state;
    }
}