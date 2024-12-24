import lottieJson from "../assets/lottie/loading-b.json";
import Lottie from "react-lottie-player";

export default function InfinityLoading() {
  return (
    <>
      <Lottie
        className="w-[50px] h-[50px]"
        loop
        animationData={lottieJson}
        play
      />
    </>
  );
}
