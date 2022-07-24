import {  legacy_createStore as createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducers from "./reducers"
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"]
}
const persistedReducer = persistReducer(persistConfig, reducers())
const initialState = {}
const middleware = [thunk]
const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store)
export { store, persistor }
