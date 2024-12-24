interface AuthorC {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string; // 또는 Date로 변경 가능
  updatedAt: string; // 또는 Date로 변경 가능
  __v: number;
  username: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[]; // postId 목록
  likes: string[]; // likeId 목록
  comments: string[]; // commentId 목록
  followers: string[]; // followerId 목록
  following: string[]; // followingId 목록
  notifications: string[]; // notificationId 목록
  messages: string[]; // messageId 목록
}

interface CommentType {
  _id: string;
  comment: string;
  author: AuthorC;
  post: string;
  createdAt: string; // 또는 Date로 변경 가능
  updatedAt: string; // 또는 Date로 변경 가능
  __v: number;
}
