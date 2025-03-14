"use client";

import { format } from "date-fns";
import { Todo } from "@/types/Todo";
import { useDeleteTodo } from "@/hooks/useTodos";
import { RiDeleteBin6Fill } from "react-icons/ri";

type TodoFormProps = {
  todo: Todo;
};

const TodoForm = ({ todo }: TodoFormProps) => {
  const deleteTodoMutation = useDeleteTodo();

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg">
      {/* 할 일 내용 */}
      <span
        className={`flex-1 ml-3 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>

      {/* 날짜 표시 */}
      <span className="text-sm text-gray-500">
        {format(new Date(todo.date), "yyyy. MM. dd. HH:mm")}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => deleteTodoMutation.mutate(todo.id)}
        className="ml-3 px-3 py-3 text-red-500 border-red-500 border-2 rounded-md hover:bg-red-500 hover:text-white transition cursor-pointer"
      >
        <RiDeleteBin6Fill />
      </button>
    </div>
  );
};

export default TodoForm;
