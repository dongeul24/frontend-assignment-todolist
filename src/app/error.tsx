"use client";

import Swal from "sweetalert2";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Swal.fire({
    icon: "error",
    title: "오류 발생",
    text: "데이터를 불러오는 중 문제가 발생했습니다.",
    confirmButtonText: "다시 시도",
  }).then(() => reset());

  return null;
}
