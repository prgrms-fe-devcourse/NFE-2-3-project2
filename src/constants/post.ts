export const POST_TEXT = {
  noComment: "댓글이 아직 없어요...\n이 포스팅의 첫 번째 댓글을 달아주세요!",
  postErr: "포스트 정보를 가져오는 데 실패했습니다.",
  youtubeErr: "올바른 유튜브 URL을 입력해주세요.",
} as const;

export const POST_PLACEHOLDER = {
  title: "제목을 입력해주세요",
  content: "내용을 입력해주세요",
  youtube: "유튜브 URL을 입력해주세요",
  comment: "댓글을 적어주세요",
} as const;

export const POST_TOAST_MESSAGE = {
  createPost: "포스팅이 등록되었습니다.",
  createPostErr: "포스팅 등록에 실패했습니다.",
  editPost: "포스팅이 수정되었습니다.",
  editPostErr: "포스팅 수정에 실패했습니다.",
  deleteComment: "댓글이 삭제되었습니다.",
  deleteCommentErr: "댓글 삭제에 실패했습니다.",
  deletePost: "포스팅이 삭제되었습니다.",
  deletePostErr: "포스팅 삭제에 실패했습니다.",
} as const;
