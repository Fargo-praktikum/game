export default interface CommentCreateRequest {
    content: string;
    userId: number;
    topicId: number;
    parentId: number | null;
}
