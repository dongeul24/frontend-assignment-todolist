"use client";

import { useState } from "react";
import { Todo } from "@/types/Todo";
import formatDate from "@/utils/formatDate";
import { useEditTodo } from "@/hooks/useTodos";
import { RiEdit2Fill, RiSave2Fill } from "react-icons/ri";

type TodoDetailProps = {
  todo: Todo;
  onClose: () => void;
};

const TodoDetail = ({ todo, onClose }: TodoDetailProps) => {
  const editTodoMutation = useEditTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text); // 수정할 내용

  // 수정 기능
  const handleEdit = () => {
    if (!newText.trim()) return; // 빈 값 방지
    editTodoMutation.mutate({ id: todo.id, text: newText });
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 할 일 내용 (수정 가능) */}
        <div className="mt-4">
          <div className="text-lg font-semibold text-gray-600">📝 할 일</div>
          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full px-2 py-1 border rounded mt-2"
            />
          ) : (
            <p className="text-base text-gray-800 mt-2">{todo.text}</p>
          )}
        </div>

        {/* 작성 날짜 */}
        <div className="mt-4">
          <div className="text-lg font-semibold text-gray-600">
            📆 작성 날짜
          </div>
          <p className="text-base text-gray-500">{formatDate(todo.date)}</p>
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

        {/* 버튼 그룹 */}
        <div className="mt-6 flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition"
            >
              <RiSave2Fill className="inline-block mr-1" />
              저장
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition"
            >
              <RiEdit2Fill className="inline-block mr-1" />
              수정
            </button>
          )}

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
