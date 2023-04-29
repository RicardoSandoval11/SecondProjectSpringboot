import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        status: 'checking',
        categories: null,
        allCategories: null
    },
    reducers: {
        onLoadingCategories: ( state, { payload } ) => {
            state.categories = payload;
            state.status = 'completed';
        },
        onLoadingAllCategories: ( state, { payload } ) => {
            state.allCategories = payload;
            state.status = 'completed';
        }
    }
});

export const {
    onLoadingCategories,
    onLoadingAllCategories
} = categorySlice.actions;