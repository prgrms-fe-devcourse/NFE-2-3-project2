import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import AuthButton from "../components/common/AuthButton";
import Logo from "../assets/Logo";
import { login } from "../api/auth";
import { useNavigate } from "react-router";
import { useToastStore } from "../store/toastStore";
import { AUTH_PLACEHOLDERS, AUTH_TOAST_MESSAGE } from "../constants/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });
  const { showToast } = useToastStore();

  const validate = (): boolean => {
    let isValid = true;
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
      isValid = false;
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login({
      email: email.value,
      password: password.value,
    });

    if (result) {
      showToast(AUTH_TOAST_MESSAGE.login);
      navigate(-1);
      return;
    } else {
      showToast(AUTH_TOAST_MESSAGE.loginErr);
      return;
    }
  };

  return (
    <section className="mx-auto flex screen-100vh items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <Logo className="mx-auto w-auto h-[100px] mb-10" />
        <div className="flex flex-col gap-5">
          <InputLabel
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            placeholder={AUTH_PLACEHOLDERS.email}
            isWarning={email.isWarning}
            onChange={(e) =>
              setEmail({ value: e.target.value, isWarning: false })
            }
          />
          <InputLabel
            label="비밀번호"
            id="password"
            type="password"
            value={password.value}
            placeholder={AUTH_PLACEHOLDERS.password}
            isWarning={password.isWarning}
            password
            onChange={(e) =>
              setPassword({ value: e.target.value, isWarning: false })
            }
          />
        </div>
        <div className="flex flex-col gap-5 mt-24">
          <AuthButton type="submit" primary>
            로그인
          </AuthButton>
          <AuthButton type="button" onClick={() => navigate("/register")}>
            회원가입 하러가기
          </AuthButton>
        </div>
      </form>
    </section>
  );
}
