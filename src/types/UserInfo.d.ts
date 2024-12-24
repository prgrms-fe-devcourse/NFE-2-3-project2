interface UserInfo {
  _id: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  role: string; // 예시로 Regular와 Admin 역할을 추가했습니다. 다른 역할이 있을 경우 수정 가능.
  banned: boolean;
  isOnline: boolean;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  followers: string[]; // 팔로워 목록 (user ID 배열)
  following: string[]; // 팔로우 목록 (user ID 배열)
  likes: string[]; // 좋아요 목록 (post ID 배열)
  comments: string[]; // 댓글 목록 (comment ID 배열)
  messages: string[]; // 메시지 목록 (message ID 배열)
  notifications: string[]; // 알림 목록 (notification ID 배열)
  posts: string[]; // 게시물 목록 (post ID 배열)
  __v: number; // 버전 번호 (MongoDB의 internal version)
}
interface UserInfoType {
  _id: string;
  fullName: string;
  email: string;
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: PostsType[];
  likes: LikeType[];
  comments: string[];
  followers: FollowersType[];
  following: FollowingType[];
  notifications: NotificationType[];
  messages: MessageType[];
  createdAt: string;
  updatedAt: string;
}
interface PostsType {
  likes: LikeType[];
  comments: string[];
  _id: string;
  title: string;
  image: string;
  imagePublicId: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface LikeType {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
}
interface FollowersType {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
interface FollowingType {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
interface NotificationType {
  seen: boolean;
  _id: string;
  author: string;
  user: string;
  post: string;
  follow: string;
  comment: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
interface MessageType {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
