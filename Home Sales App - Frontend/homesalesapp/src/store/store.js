import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./authentication/authSlice";
import { categorySlice } from "./categories/categorySlice";
import { messageSlice } from "./messages/messageSlice";
import { priceSlice } from "./prices/priceSlice";
import { propertiesSlice } from "./properties/propertiesSlice";
import { userSlice } from "./users/userSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        properties: propertiesSlice.reducer,
        categories: categorySlice.reducer,
        prices: priceSlice.reducer,
        messages: messageSlice.reducer,
        users: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});