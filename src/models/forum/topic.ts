import UserForumInfo from "./userForumInfo";

export default interface Topic {
    id: number;
    title: string;
    message: string;
    user: UserForumInfo;
    createdAt: Date;
}
