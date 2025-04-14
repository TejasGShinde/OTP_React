import {createSlice} from "@reduxjs/toolkit"

const initialState = { value: [] };


export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCard: (state, action) => {
            state.value.push(action.payload);
        }
    }
})


export const { addToCard } = cartSlice.actions;

export default cartSlice.reducer;