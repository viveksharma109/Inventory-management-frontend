import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        items: [],
        quantity: [],
        grandTotal: 0,
    },
    reducers: {
        setOrderItems: (state, action) => {
            state.items = action.payload;
        },
        setOrderQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        setOrderGrandTotal: (state, action) => {
            state.grandTotal = action.payload;
        }
    },
});

export const { setOrderItems, setOrderQuantity, setOrderGrandTotal } = orderSlice.actions;
export default orderSlice.reducer;
