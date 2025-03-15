"use client";

import { Todo } from "@/types/Todo";
import formatDate from "@/utils/formatDate";

type TodoDetailProps = {
  todo: Todo;
  onClose: () => void;
};

const TodoDetail = ({ todo, onClose }: TodoDetailProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 할 일 내용 */}
        <div className="mt-4">
          <div className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            {todo.text}
          </div>
        </div>

        {/* 작성 날짜 */}
        <div className="mt-4">
          <div className="text-lg font-semibold text-gray-600">
            📆 작성 날짜
          </div>
          <p className="text-base text-gray-500"> {formatDate(todo.date)}</p>
        </div>

        {/* 완료 여부 */}
        <div className="mt-4">
          <div className="text-lg font-semibold text-gray-600">✨ 상태</div>
          <p
            className={`text-base font-semibold ${
              todo.completed ? "text-green-600" : "text-red-600"
            }`}
          >
            {todo.completed ? "완료됨 ✅" : "미완료 ❌"}
          </p>
        </div>

        {/*  닫기 버튼 */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
