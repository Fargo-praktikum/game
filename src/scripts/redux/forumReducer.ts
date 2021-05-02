import { AnyAction, Reducer } from "redux";
import { compareDate } from "../utils/compareDate";

const SET_FORUM_LIST = "SET_FORUM_LIST";

export interface IUser {
    id: number,
    firstName: string,
    secondName: string,
    avatar?: string,
}

export interface Comment {
    id: number,
    date: string,
    message: string,
    user: IUser,
}

export interface IMessage {
    id: number,
    title: string,
    description: string,
    date: string,
    user: IUser,
    comments: Comment[] | null,
}

// Можно будет перенести логику lastCommentInfo на бэк
export interface ILastCommentInfo {
    topicId: number
    topicTitle: string,
    comment: Comment,
}

export interface ITopic {
    id: number,
    title: string,
    description: string,
    messages: IMessage[] | null,
    lastCommentInfo?: ILastCommentInfo,
}


const initialState = {
    topicsList: null as ITopic[] | null,
};

export type forumReducerType = typeof initialState;



const forumReducer: Reducer<forumReducerType> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_FORUM_LIST:
            return {
                ...state,
                topicsList: action.forumData.map((topic: ITopic) => {
                    let lastCommentInfo: ILastCommentInfo | undefined = undefined;

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
                }),
            };
        default:
            return state;
    }
};

export default forumReducer;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setTopicsList = (forumData: ITopic[]) => ({ type: SET_FORUM_LIST, forumData });
