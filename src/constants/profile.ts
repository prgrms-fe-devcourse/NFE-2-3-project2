export const FOLLOWING_DEFAULT_COUNT = 6;

export const PROFILE_TEXT = {
  error: "사용자 정보를 찾을 수 없어요...",
  noFollowing: "현재 팔로잉한 유저가 없어요...",
  noPost: "현재 작성된 포스트가 없어요...",
} as const;

export const PROFILE_PLACEHOLDER = {
  password: "비밀번호를 입력해주세요",
  passwordCheck: "비밀번호를 다시 한번 입력해주세요",
} as const;

export const PROFILE_ERROR_MESSAGE = {
  password: "비밀번호가 일치하지 않습니다.",
  blank: "공백만 있는 이름은 사용할 수 없습니다.",
  exceed: "이름은 최대 7자까지만 입력할 수 있습니다.",
} as const;

export const PROFILE_TOAST_MESSAGE = {
  password: "비밀번호가 변경되었습니다.",
  passwordErr: "비밀번호 변경에 실패했습니다.",
  profile: "프로필이 수정되었습니다.",
  profileErr: "프로필 수정에 실패했습니다.",
} as const;
