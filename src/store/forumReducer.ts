import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ForumAPI from "../api/forumApi";
import Comment from "../models/forum/comment";
import CommentCreateRequest from "../models/forum/commentCreateRequest";
import Emoji from "../models/forum/emoji";
import Topic from "../models/forum/topic";
import TopicCreateRequest from "../models/forum/topicCreateRequest";
import { TAppDispatch } from "./store";

const forumApi = new ForumAPI();

interface ForumState {
    topics: Topic[];
    comments: Comment[];
    emojies: Emoji[];
}

const initialState: ForumState = {
    topics: [],
    comments: [],
    emojies: []
};

const forumSlice = createSlice({
    name: "forum",
    initialState,
    reducers: {
        setTopicsList(state, action: PayloadAction<Topic[]>) {
            state.topics = action.payload;
        },
        addTopic(state, action: PayloadAction<Topic>) {
            state.topics.push(action.payload);
        },
        setComments(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload;
        },
        setEmojies(state, action: PayloadAction<Emoji[]>) {
            state.emojies = action.payload;
        },
        setCommentEmoji(state, action: PayloadAction<{ commentId: number, emojiId: number }>) {
            const commentIndex = state.comments.findIndex((item) => { return item.id === action.payload.commentId; });
            if (commentIndex >= 0) {
                state.comments[commentIndex].emojies[action.payload.emojiId] =
                (state.comments[commentIndex].emojies[action.payload.emojiId] ?? 0) + 1;
            }
        },
        addComment(state, action: PayloadAction<Comment>) {
            state.comments.push(action.payload);
        }
    }
});

export const { setTopicsList, addTopic, setComments, setEmojies, setCommentEmoji, addComment } = forumSlice.actions;

export default forumSlice.reducer;

export const getTopics = () => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<Topic[]>> => {
        const data = await forumApi.getTopics();

        return dispatch(setTopicsList(data.topics));
    };
};

export const createTopic = (data: TopicCreateRequest) => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<Topic>> => {
        const topic = await forumApi.createTopic(data);

        return dispatch(addTopic(topic));
    };
};

export const getComments = (topicId: number) => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<Comment[]>> => {
        const data = await forumApi.getComments(topicId);

        return dispatch(setComments(data));
    };
};

export const getEmojies = () => {
    return async (dispath: TAppDispatch): Promise<PayloadAction<Emoji[]>> => {
        const data = await forumApi.getEmojies();

        return dispath(setEmojies(data));
    };
};

export const addCommentEmoji = (data: { commentId: number, emojiId: number }) => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<{ commentId: number, emojiId: number }>> => {
        await forumApi.addCommentEmoji(data.commentId, data.emojiId);

        return dispatch(setCommentEmoji(data));
    };
};

export const createComment = (data: CommentCreateRequest) => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<Comment>> => {
        const comment = await forumApi.createComment(data);

        return dispatch(addComment(comment));
    };
};
