import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubeContainer({
  videoId,
}: {
  videoId: string | null;
}) {
  const opts: YouTubeProps["opts"] = {
    height: "334",
    width: "618",
    playerVars: {
      rel: 0,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} className="min-h-[334px]" />;
}
