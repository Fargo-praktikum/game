import UserForumInfo from "./userForumInfo";

export default interface Comment {
    id: number;
    content: string;
    user: UserForumInfo;
    topicId: number;
    parentId: number | null;
    createdAt: Date;
    // id, count
    emojies: Record<number, number>;
}
