/* 아래의 Post의 title값을 JSON.parse(title) 해서 나오는 객체의 인터페이스입니다!! */
interface CustomTitle {
  title: string;
  contents: string;
  youtubeUrl: string;
  image: string;
}

interface Channel {
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: string[];
  followers: Follow[];
  following: Follow[];
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface MessageUser {
  image?: string; // 프로필 이미지
  role: string;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: Channel;
  author: User;
  createdAt: string;
  updatedAt: string;
}

interface Like {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

interface Notification {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post?: string; // 포스트 id
  follow?: string; // 사용자 id
  like?: string;
  comment?: Comment;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

interface Follow {
  _id: string;
  user: string; // 사용자 id
  follower: string; // 사용자 id
  createdAt: string;
  updatedAt: string;
}

interface Conversation {
  _id: string[];
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
}

interface Message {
  _id: string;
  message: string;
  sender: MessageUser;
  receiver: MessageUser;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface YoutubeVideosType {
  items: YoutubeVideoType[];
}

interface SearchPost {
  likes: Like[];
  comments: string[];
  _id: string;
  title: string;
  image: string;
  imagePublicId: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
