import { createSlice } from "@reduxjs/toolkit";

import { TopicState } from "../types/state";

const initialState: TopicState = {
	currentTopicIndex: 0,
}

const topicSlice = createSlice({
	name: 'topic',
	initialState,
	reducers: {
		setCurrentTopicIndex(state, action) {
			state.currentTopicIndex = action.payload;
		},
	}
})

export const { setCurrentTopicIndex } = topicSlice.actions;
export default topicSlice.reducer;