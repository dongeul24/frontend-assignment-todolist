"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Todo } from "@/types/Todo";
import { useDeleteTodo, useEditTodo, useToggleTodo } from "@/hooks/useTodos";
import { RiDeleteBin6Fill, RiEdit2Fill, RiSave2Fill } from "react-icons/ri";

type TodoFormProps = {
  todo: Todo;
};

const TodoForm = ({ todo }: TodoFormProps) => {
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();
  const toggleTodoMutation = useToggleTodo();
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 아닌지 상태 확인
  const [newText, setNewText] = useState(todo.text); //수정 내용

  const handleEdit = () => {
    if (!newText.trim()) return;
    editTodoMutation.mutate({ id: todo.id, text: newText });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg">
      {/* 체크박스 (완료/미완료 토글) */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          toggleTodoMutation.mutate({ id: todo.id, completed: todo.completed })
        }
        className="w-5 h-5 accent-green-500 cursor-pointer disabled:opacity-50"
      />
      {/* 할 일 내용 (수정 모드) */}
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 ml-3 px-2 py-1 border rounded"
        />
      ) : (
        <span
          className={`flex-1 ml-3 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* 날짜 표시 */}
      <span className="text-sm text-gray-500">
        {format(new Date(todo.date), "yyyy. MM. dd. HH:mm")}
      </span>

      {/* 버튼 그룹 */}
      <div className="flex items-center ml-3 space-x-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="px-3 py-2 text-blue-500 border-blue-500 border-2 rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer"
          >
            <RiSave2Fill />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-2 text-green-500 border-green-500 border-2 rounded-md hover:bg-green-500 hover:text-white transition cursor-pointer"
          >
            <RiEdit2Fill />
          </button>
        )}

        {/* 삭제 버튼 */}
        <button
          onClick={() => deleteTodoMutation.mutate(todo.id)}
          className="px-3 py-2 text-red-500 border-red-500 border-2 rounded-md hover:bg-red-500 hover:text-white transition cursor-pointer"
        >
          <RiDeleteBin6Fill />
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
