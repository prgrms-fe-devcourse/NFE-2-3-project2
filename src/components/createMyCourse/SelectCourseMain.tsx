import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import styles from "./SelectCourseMain.module.css";
import { useSliderStore } from "./../../stores/sliderStore";
import { getChannelIdList } from "./../../utills/mycourse/setPostTitle";
import PostingGuideTitle from "../../components/createMyCourse/PostingGuideTitle";

import SliderBox from "../../components/createMyCourse/flow2/selectmain/sliderarea/SliderBox";
import CreateMyCourseFlowButton from "../../components/createMyCourse/CreateMyCourseFlowButton";
import AddedCoursebox from "../../components/createMyCourse/flow2/selectmain/addcoursearea/AddedCoursebox";
import AddNewMyCourseButton from "../../components/createMyCourse/flow2/selectmain/addcoursearea/AddNewMyCourseButton";

export default function SelectCourseMain({
  locationObjs,
  locationObjDelete,
  onPlus,
  onNext,
}: SelectCourseMainProps) {
  const [courseBoxes, setCourseBoxes] = useState(locationObjs);

  const [isCompletedThisPage, setIsCompletedThisPage] = useState(false);
  const handleDelete = (id: number) => {
    setCourseBoxes((prev) => prev.filter((_, index) => index !== id));
    locationObjDelete(id);
  };
  const { estimatedTime, estimatedCost } = useSliderStore();
  const handlePlus = () => {
    onPlus(estimatedTime, estimatedCost, locationObjs);
  };

  const channelIdList = getChannelIdList(locationObjs);

  const handleNext = () => {
    onNext(estimatedTime, estimatedCost, locationObjs, channelIdList);
  };

  useEffect(() => {
    if (courseBoxes.length > 0 && estimatedTime > 0 && estimatedCost > 0) {
      setIsCompletedThisPage(true);
    } else {
      setIsCompletedThisPage(false);
    }
  }, [courseBoxes, estimatedTime, estimatedCost]);

  return (
    <div>
      <PostingGuideTitle titleText="나만의 코스를 생성" mt={50} />

      <section
        id="course-editor"
        className={twMerge(styles.courseEditorContainer)}
      >
        {courseBoxes.map((box, index) => (
          <AddedCoursebox
            key={Math.random()}
            locationName={box.locationName}
            index={index}
            locationAddress={box.locationAddress}
            locationCategory={box.locationCategory}
            onDelete={handleDelete}
          />
        ))}
        <AddNewMyCourseButton onPlus={handlePlus} />
      </section>

      <div
        id="course-data-selector"
        className="flex flex-col items-center mb-[110px]"
      >
        <SliderBox />
      </div>

      <div className="flex flex-col items-center justify-center">
        <CreateMyCourseFlowButton
          onNext={handleNext}
          isCompleteThisPage={isCompletedThisPage}
        >
          완료
        </CreateMyCourseFlowButton>
      </div>
    </div>
  );
}
