import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './mainReducer';
import { messageReducer } from "./messageReducer";

export const rootReducer = combineReducers({
  mainReducer,
  messageReducer
});

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));
