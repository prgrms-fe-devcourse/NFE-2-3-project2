import { useNavigate, useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";
import { useEffect, useState } from "react";
import { getOnePost } from "../api/post";
import NotFound from "./NotFound";
import { deleteLike, postLike } from "../api/like";
import { useAuthStore } from "../store/authStore";
import confirmAndNavigateToLogin from "../utils/confirmAndNavigateToLogin";
import { createNotification } from "../api/notification";

export default function Post() {
  const navigate = useNavigate();
  const { channelName, postId } = useParams();

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();
  const [likeInformation, setLikeInformation] = useState<Like | null>(null);
  const [likeCount, setLikeCount] = useState(post?.likes.length || 0);

  const loggedInUser = useAuthStore((state) => state.user);
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);

  // 좋아요 정보 찾기
  const findLikeInformation = (fetchedPost: Post) => {
    const likeInfo =
      fetchedPost.likes.find((like) => like.user === loggedInUser?._id) ?? null;
    setLikeInformation(likeInfo);
  };

  const getPost = async () => {
    const fetchedPost = await getOnePost(postId);
    if (!fetchedPost) {
      navigate("/not-found");
      return;
    }

    setPost(fetchedPost);
    setComments(fetchedPost.comments);
    findLikeInformation(fetchedPost);
    setLikeCount(fetchedPost.likes.length);
  };

  const handleLikeClick = async () => {
    confirmAndNavigateToLogin(navigate);
    if (likeInformation) {
      const result = await deleteLike(likeInformation._id);
      if (result) {
        setLikeInformation(null);
        setLikeCount((prev) => Math.max(0, prev - 1));
      }
    } else {
      const result = await postLike(postId!);
      if (!result) return;

      setLikeInformation(result);
      setLikeCount((prev) => prev + 1);

      if (!checkIsMyUserId(post?.author._id ?? "")) {
        await createNotification({
          notificationType: "LIKE",
          notificationTypeId: result._id,
          userId: post!.author._id,
          postId: result.post,
        });
      }
    }
  };

  // 댓글 날짜를 갱신하기 위해 풀링 사용
  useEffect(() => {
    getPost();
    const intervalId = setInterval(getPost, 1000 * 60); // 1분

    return () => clearInterval(intervalId);
  }, [postId]);

  if (!post || !comments) return;
  if (channelName !== post?.channel?.name) return <NotFound />;

  return (
    <>
      <PostDetail
        post={post}
        likeCount={likeCount}
        likeInformation={likeInformation}
        handleLikeClick={handleLikeClick}
      />
      <Comment
        postAuthorId={post.author._id}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}
