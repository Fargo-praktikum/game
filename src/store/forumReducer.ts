import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ForumAPI from "../api/forumApi";
import Topic from "../models/forum/topic";
import UserForumInfo from "../models/forum/userForumInfo";
import { TAppDispatch } from "./store";
//import { compareDate } from "../scripts/utils/compareDate";

const forumApi = new ForumAPI();

///
export interface Comment {
    id: number,
    date: string,
    message: string,
    user: UserForumInfo,
}

export interface Message {
    id: number,
    title: string,
    description: string,
    date: string,
    user: UserForumInfo,
    comments: Comment[] | null,
}

// Можно будет перенести логику lastCommentInfo на бэк
export interface LastCommentInfo {
    topicId: number
    topicTitle: string,
    comment: Comment,
}
///



interface ForumState {
    topics: Topic[] | null;
}

const initialState: ForumState = {
    topics: null
};

const forumSlice = createSlice({
    name: "forum",
    initialState,
    reducers: {
        setTopicsList(state, action: PayloadAction<Topic[]>) {
            state.topics = action.payload;
        }
    }
});

export const { setTopicsList } = forumSlice.actions;

export default forumSlice.reducer;

export const getTopics = () => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<Topic[]>> => {
        const data = await forumApi.getTopics();

        return dispatch(setTopicsList(data.topics));
    };
};
