import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_store/auth.reducer";
import chatReducer from "./chat_store/chat.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ["chat", "auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);



