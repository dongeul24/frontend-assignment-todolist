"use client";

import { useState } from "react";
import formatDate from "@/utils/formatDate";
import { Todo } from "@/types/Todo";
import TodoDetail from "./TodoDetail";
import ModifyTodoButton from "./ModifyTodoButton";
import { useDeleteTodo, useEditTodo, useToggleTodo } from "@/hooks/useTodos";
import Swal from "sweetalert2";

type TodoFormProps = {
  todo: Todo;
  isDetailPage?: boolean;
};

const TodoForm = ({ todo, isDetailPage = false }: TodoFormProps) => {
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();
  const toggleTodoMutation = useToggleTodo();

  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 아닌지 상태 확인
  const [newText, setNewText] = useState(todo.text); //수정 내용
  const [showDetail, setShowDetail] = useState(false); // 상세 모달 열린 상태 확인

  // 수정 기능
  const handleEdit = () => {
    if (!newText.trim()) return;
    editTodoMutation.mutate({ id: todo.id, text: newText });
    setIsEditing(false);
  };

  // 삭제 재확인 모달
  const confirmDelete = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제하면 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "삭제 취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodoMutation.mutate(todo.id); // "삭제하기" 클릭 시 삭제 실행
      }
    });
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 sm:p-6 rounded-lg shadow-md transition hover:shadow-lg">
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
        <div
          className={`flex-1 p-2 ml-3 rounded max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-gray-200 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
          onClick={() => setShowDetail(true)}
        >
          {todo.text}
        </div>
      )}

      {/* 날짜 표시 (모바일에서는 숨기고, sm 이상에서만 보이게) */}
      <span className="hidden sm:block text-sm text-gray-500">
        {formatDate(todo.date)}
      </span>

      {/* 버튼 그룹 */}
      <ModifyTodoButton
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleEdit={handleEdit}
        confirmDelete={confirmDelete}
        isDetailPage={isDetailPage} // 상세 페이지 여부 전달
      />

      {/* 상세 모달 컴포넌트 */}
      {showDetail && (
        <TodoDetail todo={todo} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
};

export default TodoForm;
