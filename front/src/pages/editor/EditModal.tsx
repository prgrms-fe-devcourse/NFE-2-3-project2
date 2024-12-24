import { useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel";

interface EditModalProps {
  onClose: () => void;
  onSubmit: (date: { year: string; month: string; day: string }) => void;
}

interface ValidationErrors {
  year?: string;
  month?: string;
  day?: string;
}

function EditModal({ onClose, onSubmit }: EditModalProps) {
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // 개별 입력값의 형식만 검증하는 함수
  const validateInput = (name: string, value: string) => {
    const numValue = parseInt(value);

    // 기본 형식 검증만 수행
    switch (name) {
      case "year":
        if (!/^\d{4}$/.test(value)) {
          return "연도는 4자리 숫자여야 합니다";
        }
        break;
      case "month":
        if (!/^\d{1,2}$/.test(value)) {
          return "월은 2자리 이내의 숫자여야 합니다";
        }
        if (numValue < 1 || numValue > 12) {
          return "월은 1 ~ 12 사이여야 합니다";
        }
        break;
      case "day":
        if (!/^\d{1,2}$/.test(value)) {
          return "날짜는 2자리 이내의 숫자여야 합니다";
        }
        if (numValue < 1 || numValue > 31) {
          return "날짜는 1 ~ 31 사이여야 합니다";
        }
        break;
    }
    return "";
  };

  // 전체 날짜의 유효성을 검증하는 함수
  const validateFullDate = () => {
    const { year, month, day } = date;
    if (!year || !month || !day) {
      return {
        isValid: false,
        error: "날짜를 모두 입력해주세요",
      };
    }

    const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 제거

    if (selectedDate <= today) {
      return {
        isValid: false,
        error: "미래의 날짜를 선택해주세요",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  };

  const handleInputChange = (name: string, value: string) => {
    // 숫자만 입력 허용
    if (!/^\d*$/.test(value)) {
      return;
    }

    // 최대 길이 제한
    if (name === "year" && value.length > 4) return;
    if ((name === "month" || name === "day") && value.length > 2) return;

    setDate((prev) => ({ ...prev, [name]: value }));

    // 입력 중에는 형식 검증만 수행
    const error = validateInput(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = () => {
    // 각 필드의 기본 형식 검증
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    // 먼저 모든 필드가 입력되었는지 확인
    if (!date.year || !date.month || !date.day) {
      setErrors({
        year: !date.year ? "연도를 입력해주세요" : "",
        month: !date.month ? "월을 입력해주세요" : "",
        day: !date.day ? "일을 입력해주세요" : "",
      });
      return;
    }

    // 각 필드의 형식 검증
    Object.entries(date).forEach(([name, value]) => {
      const error = validateInput(name, value);
      if (error) {
        newErrors[name as keyof ValidationErrors] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // 모든 필드가 입력되었고 형식이 올바른 경우에만 전체 날짜 검증
    const { isValid, error } = validateFullDate();
    if (!isValid) {
      setErrors({ year: error }); // 날짜 관련 에러는 year 필드에 표시
      return;
    }

    // 모든 검증을 통과한 경우
    onSubmit(date);
    onClose();
  };

  // 첫 번째 에러 메시지 가져오기
  const getErrorMessage = () => {
    return Object.values(errors).find((error) => error) || "";
  };

  return (
    <div className="absolute top-32 left-12 shadow-md z-50 w-[80%] p-4 bg-white dark:bg-gray-600 rounded-lg">
      <button className="absolute right-2 top-1" onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
      </button>
      <h5 className="mb-3 text-primary dark:text-secondary">오픈 날짜 선택</h5>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-white">
          타임 캡슐을 오픈할 날짜를 선택해주세요.
          <br />
          해당 타임 캡슐 알림 요청을 받은 다른 사용자들도 해당 날짜에 알림을 받습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <InputWithLabel
                label="year"
                placeholder="year"
                value={date.year}
                disable={false}
                onChange={(e) => handleInputChange("year", e.target.value)}
                isError={errors.year}
              />
            </div>
            <span className="text-lg text-gray-400">/</span>
            <div className="flex-1">
              <InputWithLabel
                label="month"
                placeholder="month"
                value={date.month}
                disable={false}
                onChange={(e) => handleInputChange("month", e.target.value)}
                isError={errors.month}
              />
            </div>
            <span className="text-lg text-gray-400">/</span>
            <div className="flex-1">
              <InputWithLabel
                label="day"
                placeholder="day"
                value={date.day}
                disable={false}
                onChange={(e) => handleInputChange("day", e.target.value)}
                isError={errors.day}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white rounded bg-primary dark:text-black dark:bg-secondary w-fit"
            >
              확인
            </button>
          </div>
          {getErrorMessage() && <div className="text-sm text-red-500">{getErrorMessage()}</div>}
        </div>
      </div>
    </div>
  );
}

export default EditModal;
