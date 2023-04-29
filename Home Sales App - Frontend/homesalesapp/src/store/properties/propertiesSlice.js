import { createSlice } from "@reduxjs/toolkit";

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState: {
        status: 'checking',
        lastCreatedProperties: [],
        lastCreatedDepartments: [],
        lastCreatedOther: [],
        propertyDetails: [],
        allProperties: [],
        propertiesByCategory: [],
        userProperties: [],
        // Handle messages
        successSendMsg: null,
        failedSendMsg: null,
        successRemovePropertyMsg: null,
        failedRemovePropertyMsg: null,
        createPropertySuccess: null,
        createPropertyFailed: null,
        updatePropertySuccess: null,
        updatePropertyFailed: null,
        // pagination
        totalPages: null,
        currentPage: null
    },
    reducers: {
        onLoadingLastCreatedProperties: ( state, { payload } ) => {
            state.lastCreatedProperties = payload;
            state.status = 'completed';
        },
        onLoadingPropertyDetails: ( state, {payload} ) => {
            state.propertyDetails = payload;
            state.status = 'completed';
        },
        onLoadingAllProperties: ( state, { payload } ) => {
            state.allProperties = payload.content;
            state.totalPages = payload.totalPages;
            state.currentPage = payload.pageable.pageNumber;
            state.status = 'completed';
        },
        onLoadingPropertiesByCategory: ( state, { payload } ) => {
            state.propertiesByCategory = payload.content;
            state.totalPages = payload.totalPages;
            state.currentPage = payload.currentPage;
            state.status = 'completed';
        },
        onLoadingLastCreatedDepartments: ( state, { payload } ) => {
            state.lastCreatedDepartments = payload;
            state.status = 'completed';
        },
        onLoadingLastCreatedOther: ( state, { payload } ) => {
            state.lastCreatedOther = payload;
            state.status = 'completed';
        },
        onSendMessage: (state, {payload}) => {
            state.successSendMsg = payload;
            state.status = 'completed';
        },
        onSendMessageFailed: (state, { payload }) => {
            state.failedSendMsg = payload;
            state.status = 'completed';
        },
        onClearmessages: (state) => {
            state.failedSendMsg = null;
            state.successSendMsg = null;
            state.successRemovePropertyMsg = null;
            state.failedRemovePropertyMsg = null;
            state.createPropertySuccess = null;
            state.createPropertyFailed = null;
            state.updatePropertySuccess = null;
            state.updatePropertyFailed = null;
        },
        onLoadUserProperties: ( state, { payload } ) => {
            state.userProperties = payload.content;
            state.totalPages = payload.totalPages;
            state.currentPage = payload.currentPage;
            state.status = 'completed';
        },
        onSucessRemoveProperty: ( state, { payload } ) => {
            state.successRemovePropertyMsg = payload;
            state.status = 'completed';
        },
        onFailedRemoveProperty: ( state, { payload } ) => {
            state.failedRemovePropertyMsg = payload;
            state.status = 'completed';
        },
        onCreatePropertySuccess: ( state, { payload } ) => {
            state.createPropertySuccess = payload;
            state.status = 'completed';
        },
        onCreatePropertyFailed: ( state, { payload } ) => {
            state.createPropertyFailed= payload;
            state.status = 'completed';
        },
        onUpdatePropertySuccess: ( state, {payload} ) => {
            state.updatePropertySuccess = payload;
            state.status = 'completed';
        },
        onUpdatePropertyFailed: ( state, { payload } ) => {
            state.updatePropertyFailed = payload;
            state.status = 'completed';
        },
        onChecking: ( state ) => {
            state.status = 'checking';
        }
    }
});

export const {
    onLoadingLastCreatedProperties,
    onLoadingLastCreatedDepartments,
    onLoadingLastCreatedOther,
    onLoadingPropertyDetails,
    onLoadingAllProperties,
    onLoadingPropertiesByCategory,
    onSendMessage,
    onSendMessageFailed,
    onClearmessages,
    onLoadUserProperties,
    onSucessRemoveProperty,
    onFailedRemoveProperty,
    onCreatePropertySuccess,
    onCreatePropertyFailed,
    onUpdatePropertySuccess,
    onUpdatePropertyFailed,
    onChecking
} = propertiesSlice.actions;