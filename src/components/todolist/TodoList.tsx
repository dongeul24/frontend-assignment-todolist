"use client";

import { useState } from "react";
import TodoForm from "./TodoForm";
import { useTodos } from "@/hooks/useTodos";

export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { data, isPending, isError } = useTodos(currentPage, perPage);

  if (isPending) return <p className="text-center">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );

  // 페이지네이션 로직
  const totalPages = data?.pages || 1;
  const visiblePages = 4; // 표시할 페이지 개수
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-5">
      {/* Todo 리스트 */}
      <div className="space-y-3">
        {data?.data.map((todo) => (
          <TodoForm key={todo.id} todo={todo} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* 이전 버튼 */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          이전
        </button>

        {/* 페이지 버튼 */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded-md cursor-pointer ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
