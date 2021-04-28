import {AnyAction, Reducer} from "redux";

const SET_FORUM_LIST = "SET_FORUM_LIST";

export interface IComment {
    user: {
        id: number,
        firstName: string,
        secondName: string,
        avatar: string | null,
    },
    date: string,
    message: string,
}

export interface ITopic {
    id: number,
    title: string,
    description: string,
    comments: IComment[] | null,
}

// Можно будет перенести логику lastCommentInfo на бэк
export interface ILastCommentInfo {
    topicId: number
    topicTitle: string,
    comment: IComment,
}

export interface IForumItem {
    id: number,
    title: string,
    description: string,
    topics: ITopic[] | null,
    lastCommentInfo?: ILastCommentInfo,
}


const initialState = {
    forumList: null as IForumItem[] | null,
};

export type forumReducerType = typeof initialState;



const compareDate = (dateOne: string, dateTwo: string) => {
    return (new Date(dateOne)).getTime() < (new Date(dateTwo)).getTime();
}

const forumReducer: Reducer<forumReducerType> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_FORUM_LIST:
            return {
                ...state,
                forumList: action.forumData.map((forumItem: IForumItem) => {
                    let lastCommentInfo: ILastCommentInfo | undefined = undefined;

                    forumItem.topics?.forEach((topic) => {
                        if (topic.comments) {
                            const lastCommentInTopic = topic.comments[topic.comments.length - 1];
                            if (!lastCommentInfo || compareDate(lastCommentInfo.comment.date, lastCommentInTopic.date)) {
                                lastCommentInfo = {
                                    topicId: topic.id,
                                    topicTitle: topic.title,
                                    comment: lastCommentInTopic,
                                };
                            }
                        }
                    })

                    return {...forumItem, lastCommentInfo}
                }),
            };
        default:
            return state;
    }
};

export default forumReducer;


export const setForumList = (forumData: IForumItem[]) => ({ type: SET_FORUM_LIST, forumData });
