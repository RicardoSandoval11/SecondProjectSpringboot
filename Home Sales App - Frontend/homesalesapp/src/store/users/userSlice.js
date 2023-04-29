import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        status: 'searching',
        publicDetails: [],
        privateDetalis: [],
        propertiesSold: null,
        updateUserInformationSuccess: null,
        updateUserInformationFailed: null
    },
    reducers: {
        onLoadingPublicDetails: ( state, { payload } ) => {
            state.publicDetails =payload;
            state.status = 'completed';
        },
        onLoadPrivateDetails: ( state, { payload } ) => {
            state.privateDetalis = payload;
            state.status = 'completed';
        },
        onLoadPropertiesSoldNumber: ( state, { payload } ) => {
            state.propertiesSold = payload;
            state.status = 'completed';
        },
        onSearching: (state) => {
            state.status = 'searching'
        },
        onUpdateUserSuccess: (state, { payload }) => {
            state.updateUserInformationSuccess = payload;
            state.status = 'completed';
        },
        onUpdateUserFailed: (state, { payload }) => {
            state.updateUserInformationFailed = payload;
            state.status = 'completed';
        },
        onClearMessages: (state) => {
            state.updateUserInformationFailed = null;
            state.updateUserInformationSuccess = null;
        }
    }
});

export const {
    onLoadPrivateDetails,
    onLoadingPublicDetails,
    onLoadPropertiesSoldNumber,
    onSearching,
    onUpdateUserSuccess,
    onUpdateUserFailed,
    onClearMessages
} = userSlice.actions;