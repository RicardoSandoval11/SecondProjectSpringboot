import { createSlice } from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: 'prices',
    initialState: {
        status: 'checking',
        prices: null
    },
    reducers: {
        onLoadingPrices: ( state, { payload } ) => {
            state.prices = payload;
            state.status = 'completed';
        },
    }
});

export const {
    onLoadingPrices
} = priceSlice.actions;