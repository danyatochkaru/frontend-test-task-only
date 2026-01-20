import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { topicReducer } from "../entities";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
	'topic': topicReducer,
})

export const store = configureStore({
	reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = () => useDispatch<AppDispatch>()