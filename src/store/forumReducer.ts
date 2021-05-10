import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareDate } from "../scripts/utils/compareDate";

export interface UserForumInfo {
    id: number,
    firstName: string,
    secondName: string,
    avatar?: string,
}

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

export interface Topic {
    id: number,
    title: string,
    description: string,
    messages: Message[] | null,
    lastCommentInfo?: LastCommentInfo,
}

interface ForumState {
    topicsList: Topic[] | null;
}

const initialState: ForumState = {
    topicsList: null
};

const forumSlice = createSlice({
    name: "forum",
    initialState,
    reducers: {
        setTopicsList(state, action: PayloadAction<Topic[]>) {
            state.topicsList = action.payload.map((topic: Topic) => {
                let lastCommentInfo: LastCommentInfo | undefined = undefined;

                topic.messages?.forEach((message) => {
                    if (message.comments) {
                        const lastCommentInTopic = message.comments[message.comments.length - 1];
                        if (!lastCommentInfo || compareDate(lastCommentInfo.comment.date, lastCommentInTopic.date)) {
                            lastCommentInfo = {
                                topicId: message.id,
                                topicTitle: message.title,
                                comment: lastCommentInTopic,
                            };
                        }
                    }
                });

                return { ...topic, lastCommentInfo };
            });
        }
    }
});

export const { setTopicsList } = forumSlice.actions;

export default forumSlice.reducer;
