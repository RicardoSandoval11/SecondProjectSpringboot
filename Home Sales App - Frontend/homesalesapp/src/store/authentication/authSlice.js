import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        loginFailedMsg: null,
        registerFailedMsg: null,
        recoverPasswordRequestSuccessMsg: null,
        recoverPasswordRequestFailedMsg: null,
        verifyCodeSuccessMsg: null,
        verifyCodeFailedMsg: null,
        UpdatePasswordSuccessMsg: null,
        UpdatePasswordFailedMsg: null
    },
    reducers: {
        onChecking: ( state, payload ) => {
            state.status = 'checking';
        },
        onLogin: ( state ) => {
            state.status = 'authenticated';
        },
        onLoginFailed: (state) => {
            state.loginFailedMsg = 'Wrong Credentials';
            state.status = 'not-authenticated';
        },
        onRegister: (state) => {
            state.status = 'authenticated';
        },
        onRegisterFailed: (state, payload) => {
            state.registerFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onLogout: (state) => {
            state.status= 'not-authenticated';
        },
        onCleanMessages: ( state ) => {
            state.loginFailedMsg = null;
            state.registerFailedMsg = null;
            state.recoverPasswordRequestSuccessMsg = null;
            state.recoverPasswordRequestFailedMsg = null;
            state.verifyCodeSuccessMsg = null;
            state.verifyCodeFailedMsg = null;
            state.UpdatePasswordSuccessMsg = null;
            state.UpdatePasswordFailedMsg = null;
        },
        onRecoverPasswordRequestSuccess: ( state, { payload } ) => {
            state.recoverPasswordRequestSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onRecoverPasswordRequestFailed: ( state, { payload } ) => {
            state.recoverPasswordRequestFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onVerifyCodeUpdatePasswordSuccess: ( state, { payload } ) => {
            state.verifyCodeSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onVerifyCodeUpdatePasswordFailed: ( state, { payload } ) => {
            state.verifyCodeFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onUpdatePassword: ( state, { payload } ) => {
            state.UpdatePasswordSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onUpdatePasswordFailed: ( state, { payload } ) => {
            state.UpdatePasswordFailedMsg = payload;
            state.status = 'not-authenticated';
        }
    }
});

export const {
    onChecking,
    onLogin,
    onLoginFailed,
    onRegister,
    onRegisterFailed,
    onLogout,
    onCleanMessages,
    onRecoverPasswordRequestSuccess,
    onRecoverPasswordRequestFailed,
    onVerifyCodeUpdatePasswordSuccess,
    onVerifyCodeUpdatePasswordFailed,
    onUpdatePassword,
    onUpdatePasswordFailed
} = authSlice.actions;