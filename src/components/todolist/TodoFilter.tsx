"use client";

import { FilterTodo } from "@/types/Todo";

type TodoFilterProps = {
  filter: FilterTodo;
  setFilter: (filter: FilterTodo) => void;
};

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  return (
    // 필터 영역
    <div className="flex justify-center mb-4 space-x-2">
      {/* 모든 Todos 보여주기 */}
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 border rounded-md cursor-pointer hover:bg-blue-300 ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
      >
        전체
      </button>

      {/* 완료된 Todos 보여주기 */}
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 border rounded-md cursor-pointer hover:bg-green-300 ${
          filter === "completed" ? "bg-green-500 text-white" : "bg-gray-100"
        }`}
      >
        완료
      </button>

      {/* 미완료된 Todos 보여주기 */}
      <button
        onClick={() => setFilter("incomplete")}
        className={`px-4 py-2 border rounded-md cursor-pointer hover:bg-red-300  ${
          filter === "incomplete" ? "bg-red-500 text-white" : "bg-gray-100"
        }`}
      >
        미완료
      </button>
    </div>
  );
};

export default TodoFilter;
