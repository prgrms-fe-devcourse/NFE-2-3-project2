import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  deletePosts,
  fetchPostIdsFromChannels,
  getValidChannelIdList,
} from "./handleDeletePost";
import PostEditor from "./../PostEditor";
import { getChannelIdList } from "./../../utills/mycourse/setPostTitle";

import images from "../../assets/images/importImages";
import Loader from "../../components/skeletonUI/Loader";
import { useUserStore } from "../../stores/useInfoStore";
import { getCourses } from "../../api/react-query/courseApi";
import LikeButton from "../../components/main/courseContent/LikeButton";
import { useCommentStore } from "../../stores/main/comment/useCommentStore";
import CourseContentDoc from "../../components/main/courseContent/CourseContentDoc";

export default function CourseContent() {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();
  const { setComments } = useCommentStore();
  const {
    data: courseData,
    isLoading: isCourseLoading,
    refetch,
  } = useQuery({
    queryKey: ["getCourses", contentId],
    queryFn: () => {
      if (!contentId) {
        throw new Error("Content ID is required");
      }
      return getCourses(contentId!);
    },
  });
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    if (courseData) {
      setComments(courseData.comments);
      setLikeCount(courseData.likes.length);
    }
  }, [courseData, setComments]);

  const handleLike = (calc: 1 | -1) => {
    setLikeCount((prev) => prev + calc);
  };

  const { setUserId, userId } = useUserStore();
  useEffect(() => {
    setUserId();
  }, [setUserId, userId]);

  const [isEditorOpened, setEditorOpened] = useState<boolean>(false);

  const onEditClicked = async () => {
    try {
      setEditorOpened(true);
      // 수정 작업 완료 후
      await refetch();
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const onExitEditor = () => {
    setEditorOpened(false);
    refetch();
  };

  const onDeleteClicked = async () => {
    const titleStringtoObj = JSON.parse(courseData.title);
    const channelIdList = getChannelIdList(titleStringtoObj.locationObjs);
    console.log(channelIdList, "채널리스트");

    // 유효한 채널 ID 목록 가져오기
    const validChannelIdList = getValidChannelIdList(channelIdList);

    // 채널 ID에서 삭제 대상 게시물 ID 가져오기
    const postIdsToDelete = await fetchPostIdsFromChannels(
      validChannelIdList,
      courseData
    );
    // 현재 포스트에 대한 ID 추가
    if (contentId) {
      postIdsToDelete.push(contentId);
    }
    // 게시물 삭제 처리
    const isDeleted = await deletePosts(postIdsToDelete);

    // 삭제 성공 시 페이지 이동
    if (isDeleted) {
      navigate("/my-page");
    }
  };

  return (
    <>
      {isCourseLoading ? (
        <div className="flex flex-col items-center justify-center h-[1500px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="relative w-full h-auto rounded-lg shadow-lg">
            <div className="relative">
              <img
                src={
                  courseData.image
                    ? courseData.image
                    : images.course_background_img
                }
                alt="background"
                className="object-cover w-full h-[500px] object-center"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-full top-[419px]">
              <div className="py-[38px] bg-[#F9FBFE] rounded-t-[40px]  shadow-[0_-8px_10px_0_rgba(48,72,100,0.25)] h-auto min-h-[1200px] pb-[120px]">
                <LikeButton courseObj={courseData} onLike={handleLike} />
                <div className="px-[61px] h-auto overflow-y-auto ">
                  <CourseContentDoc
                    courseObj={courseData}
                    likeCount={likeCount}
                    userId={userId!}
                    onEditClicked={onEditClicked}
                    onDeleteClicked={onDeleteClicked}
                  />
                </div>
              </div>
            </div>
            <PostEditor
              isEditorOpened={isEditorOpened}
              onExitEditor={onExitEditor}
              courseObj={courseData}
            />
          </div>
        </>
      )}
    </>
  );
}
