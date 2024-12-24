export const MAX_NAME_LENGTH = 7;

export const AUTH_PLACEHOLDERS = {
  name: "이름을 입력해주세요 (7자 이내)",
  email: "이메일을 입력해주세요",
  password: "비밀번호를 입력해주세요",
} as const;

export const AUTH_TOAST_MESSAGE = {
  login: "로그인이 완료되었습니다.",
  loginErr: "로그인에 실패했습니다. 정보를 확인하고 다시 시도해주세요.",
  register: "회원가입이 완료되었습니다.",
  registerErr: "회원가입에 실패했습니다. 다시 시도해주세요.",
} as const;

export const REGISTER_ERROR_MESSAGE = {
  none: "이름을 입력해주세요.",
  blank: "공백만 있는 이름은 사용할 수 없습니다.",
  exceed: "이름은 최대 7자까지만 입력할 수 있습니다.",
} as const;
