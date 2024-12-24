import { useEffect, useRef, useState } from "react";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import { Comment, getPostDetail } from "../../utils/getPostDetail";
import { delCommentFn, newCommentFn } from "../../utils/commentFn";
import { addPostLike, removePostLike } from "../../utils/postLikeFn";
import { useAuth } from "../../stores/authStore";

export default function CommentSec({
  likes,
  // comments,
  postId,
  postAuthorId,
}: {
  likes: LikeType[];
  // comments: CommentType[];
  postId: string | undefined;
  postAuthorId: string;
}) {
  const [commentList, setCommentList] = useState<Comment[]>([]); //댓글 목록
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(false); // 에러 상태
  const [newComment, setNewComment] = useState<string>(""); //등록할 댓글
  const commentinputRef = useRef<HTMLTextAreaElement | null>(null); // 댓글 인풋
  const [likeList, setLikeList] = useState<LikeType[]>(likes); // 좋아요 목록
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false); // 게시글 좋아요 상태

  //로그인 상태
  const isLogin = useAuth((state) => state.isLoggedIn);
  const UserId = useAuth((state) => state.user?._id);

  //댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        //포스트 아이디
        const postDetail = await getPostDetail(`/posts/${postId}`);
        setCommentList(postDetail?.comments || []); // 댓글 목록 상태 업데이트
      } catch (error) {
        console.log(`댓글 불러오기 실패: ${error}`);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  //댓글 등록하기
  const handleCommentSubmit = async (comment: string) => {
    const option = {
      comment,
      postId,
      postAuthorId,
    };

    try {
      const newComment = await newCommentFn(option);
      setCommentList((commentList) => [...commentList, newComment]);
      setNewComment(""); //인풋 비우기
      commentinputRef.current?.focus();
    } catch (err) {
      console.log(err);
    }
  };

  //내가 작성한 댓글 삭제
  const handleDelete = async (commentId: string) => {
    try {
      await delCommentFn(commentId);
      // 상태 업데이트
      setCommentList((commentList) =>
        commentList.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 좋아요 여부 확인
  const checkIfLiked = () => likeList.some((like) => like.user === UserId);

  useEffect(() => {
    if (!isLogin) return setIsLiked(false);
    setIsLiked(checkIfLiked());
  }, [likeList, isLogin]);

  // 포스트 좋아요 토글
  const handleLike = async (postId: string, postAuthorId: string) => {
    if (!isLogin) return;

    // 좋아요 여부 확인
    const alreadyLiked = checkIfLiked();
    setIsLiked(alreadyLiked);

    try {
      // 이미 좋아요 누른 경우
      if (alreadyLiked) {
        //좋아요 취소
        const likeId = likeList.find((like) => like.user === UserId)?._id;
        if (likeId) {
          await removePostLike(likeId);
          setLikeList((likeList) =>
            likeList.filter((like) => like._id !== likeId)
          );
          setIsLiked(false);
        }
      } else {
        //좋아요 등록
        const data = await addPostLike(postId, postAuthorId);
        setLikeList((likeList) => [...likeList, data]);
        setIsLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 응답 상태
  if (isLoading) return <p>댓글 불러오는 중...</p>;
  if (error) return <p>댓글을 불러오는데 실패했습니다.</p>;

  return (
    <>
      {/* 코멘트 폼 */}
      <div className="mt-4">
        <CommentForm
          // likes={likes}
          // comments={comments}
          postId={postId}
          postAuthorId={postAuthorId}
          handleCommentSubmit={handleCommentSubmit}
          newComment={newComment}
          commentList={commentList}
          setNewComment={setNewComment}
          commentinputRef={commentinputRef}
          handleLike={handleLike}
          likeList={likeList}
          isLiked={isLiked}
        />
      </div>
      <div className="">
        {/* 댓글 박스 */}
        {commentList.length === 0 ? (
          <p className="text-base dark:text-white">
            아직 댓글이 없습니다! 댓글을 작성해 주세요 😊
          </p>
        ) : (
          commentList.map((comment) => (
            <CommentBox
              key={comment._id}
              comment={comment}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}
