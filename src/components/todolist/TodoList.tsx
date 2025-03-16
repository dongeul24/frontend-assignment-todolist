"use client";

import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import { useTodos } from "@/hooks/useTodos";
import { getPagination } from "@/utils/getPagination";
import { FilterTodo } from "@/types/Todo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [filter, setFilter] = useState<FilterTodo>("all"); // 필터 종류
  const perPage = 4; //한 페이지에 4개의 Todos 보여주기

  const { data, isPending, isError } = useTodos(currentPage, perPage, filter);

  const totalPages = data?.pages || 1; //총 페이지 개수(마지막 페이지)
  const pages = getPagination(currentPage, data?.pages || 1); // 현재 페이지를 기준으로 표시할 페이지 번호 배열 생성

  // 로딩 표시
  if (isPending)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );

  // 에러 표시
  if (isError)
    return (
      <p className="text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-5">
      {/* 필터 컴포넌트 */}
      <TodoFilter filter={filter} setFilter={setFilter} />

      {/* Todo 리스트 */}
      <div className="flex flex-col gap-3">
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
          <FaChevronLeft />
        </button>

        {/* 모바일 환경에서는 현재 페이지 숫자만 표시 */}
        <span className="sm:hidden px-3 py-1 border rounded-md bg-blue-500 text-white">
          {currentPage}
        </span>

        {/* 데스크톱 환경에서는 전체 페이지 버튼 표시 */}
        <div className="hidden sm:flex space-x-2">
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
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
