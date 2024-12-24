import { useEffect, useState } from "react";

import UserInfoInput from "./UserInfoInput";

interface UserInfoFormProps {
  fullNameLabel: string;
  emailLabel: string;
  regionLabel: string;
  defaultFullName?: string;
  defaultEmail?: string;
  defaultRegion?: string;
  onSubmit: (updatedInfo: {
    fullName: string;
    email: string;
    region: string;
  }) => void;
}

export default function UserInfoForm({
  fullNameLabel,
  regionLabel,
  emailLabel,
  defaultFullName = "",
  defaultEmail = "",
  defaultRegion = "",
  onSubmit,
}: UserInfoFormProps) {
  const [fullName, setFullName] = useState(defaultFullName);
  const [email, setEmail] = useState(defaultEmail);
  const [region, setRegion] = useState(defaultRegion);

  useEffect(() => {
    setFullName(defaultFullName);
    setEmail(defaultEmail);
    setRegion(defaultRegion);
  }, [defaultFullName, defaultEmail, defaultRegion]);

  const isChanged =
    fullName !== defaultFullName ||
    email !== defaultEmail ||
    region !== defaultRegion;

  const handleSubmit = () => {
    if (isChanged) {
      onSubmit({ fullName, email, region });
    }
  };

  return (
    <div className="flex flex-col items-center gap-7">
      {/* 닉네임 */}
      <UserInfoInput
        label={fullNameLabel}
        id="name"
        value={fullName}
        onChange={setFullName}
      />
      {/* 지역 */}
      <UserInfoInput
        label={regionLabel}
        id="region"
        value={region}
        onChange={setRegion}
      />

      {/* 이메일 */}
      <UserInfoInput
        label={emailLabel}
        disabled={true}
        id="email"
        value={email}
        onChange={setEmail}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isChanged}
        className={`mt-4 w-44 rounded-3xl
          ${
            isChanged
              ? "bg-primary-600 hover:bg-primary-400"
              : "bg-primary-300 cursor-not-allowed"
          }
          text-white px-6 py-2 rounded hover:bg-blue-400 font-pretendard font-medium`}
      >
        저장
      </button>
    </div>
  );
}
