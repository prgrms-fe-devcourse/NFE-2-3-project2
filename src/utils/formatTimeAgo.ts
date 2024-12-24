const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInMilliseconds = now.getTime() - targetDate.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = now.getMonth() - targetDate.getMonth();
  const diffInYears = now.getFullYear() - targetDate.getFullYear();

  if (diffInYears >= 1) return `${diffInYears}년 전`;
  else if (diffInMonths >= 1) return `${diffInMonths}개월 전`;
  else if (diffInDays >= 1) return `${diffInDays}일 전`;
  else if (diffInHours >= 1) return `${diffInHours}시간 전`;
  else if (diffInMinutes >= 1) return `${diffInMinutes}분 전`;
  else return "방금 전";
};

export default formatTimeAgo;
