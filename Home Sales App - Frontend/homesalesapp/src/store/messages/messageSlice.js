import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        status: 'checking',
        userMessages: [],
        numberOfMessages: null,
        totalPages: null,
        currentPage: null,
        removeMessageMsgSuccess: null,
        removeMessageMsgFailed: null
    },
    reducers: {
        onLoadingUserMessages: ( state, {payload} ) => {
            state.userMessages = payload.content;
            state.totalPages = payload.totalPages;
            state.status = 'completed'
        },
        onLoadNumberOfMessages: ( state, {payload} ) => {
            state.numberOfMessages = payload;
            state.status = 'completed';
        },
        onRemoveMessageSuccess: ( state, { payload } ) => {
            state.removeMessageMsgSuccess = payload;
            state.status = 'completed';
        },
        onRemoveMessageFailed: ( state, { payload } ) => {
            state.removeMessageMsgFailed = payload;
            state.status = 'completed';
        },
        onClearMessages: ( state ) => {
            state.removeMessageMsgFailed = null;
            state.removeMessageMsgSuccess = null;
            state.status = 'completed';
        }
    }
});

export const {
    onLoadNumberOfMessages,
    onLoadingUserMessages,
    onRemoveMessageSuccess,
    onRemoveMessageFailed,
    onClearMessages
} = messageSlice.actions;