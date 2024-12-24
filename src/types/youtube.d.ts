interface YoutubeVideoType {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: ThumbnailsType;
    channelTitle: string;
    tags: string[];
  };
}

interface ThumbnailsType {
  default: ThumbnailType;
  medium: ThumbnailType | null;
  high: ThumbnailType | null;
  standard: ThumbnailType | null;
  maxres: ThumbnailType | null;
}

interface ThumbnailType {
  url: string;
  width: number;
  height: number;
}
