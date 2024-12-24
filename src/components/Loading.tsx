import Lottie from "react-lottie-player";
import lottieJson from "../assets/lottie/loading-b.json";
import { twMerge } from "tailwind-merge";
import { useLoadingStore } from "../stores/loadingStore";

export default function Loading() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div
      className={twMerge(
        "absolute z-20 flex justify-center items-center w-full bg-white/80 dark:bg-lightBlackDark/50"
      )}
      style={{ height: "calc(100vh - 70px)" }}
    >
      <Lottie
        className="w-[130px] h-[130px]"
        loop
        animationData={lottieJson}
        play
      />
    </div>
  );
}
