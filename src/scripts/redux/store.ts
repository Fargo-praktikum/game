import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./authReducer";
import forumReducer from "./forumReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    forum: forumReducer,
});

export type rootStateType = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// composeEnhancers для расширения в браузере
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default store;
