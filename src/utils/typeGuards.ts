export const isCustomTitle = <
  T extends {
    youtubeUrl?: unknown;
    title?: unknown;
    contents?: unknown;
    image?: unknown;
  }
>(
  object: T
) => {
  return (
    typeof object === "object" &&
    object !== null &&
    typeof object.youtubeUrl === "string" &&
    typeof object.title === "string" &&
    typeof object.contents === "string" &&
    typeof object.image === "string"
  );
};
