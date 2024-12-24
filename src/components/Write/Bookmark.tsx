import YoutubeIcon from "../../assets/youtube.png";

interface BookmarkProps {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function Bookmark({
  title,
  description,
  url,
  thumbnail,
}: BookmarkProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <article className="border border-gray-c8 dark:border-gray-c8/50 rounded-lg hover:bg-gray-ee dark:hover:bg-gray-ee/10 bg-white dark:bg-white/5 p-5 flex gap-20 justify-between">
        <section className="w-full max-w-[1000px] flex flex-col justify-between">
          <div>
            <p className="font-semibold text-xl dark:text-white">{title}</p>
            <p className="text-sm line-clamp-2 dark:text-gray-ee">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <img src={YoutubeIcon} alt="유튜브 아이콘" />
            <p className="text-gray-22/70 dark:text-gray-c8">{url}</p>
          </div>
        </section>
        <img src={thumbnail} alt={url} className="h-32" />
      </article>
    </a>
  );
}
