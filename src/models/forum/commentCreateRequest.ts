export default interface CommentCreateRequest {
    content: string;
    topicId: number;
    parentId: number | null;
}
