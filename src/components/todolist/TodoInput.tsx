"use client";

import { useState } from "react";
import { useAddTodo } from "@/hooks/useTodos";
import { FaPlus } from "react-icons/fa";

const TodoInput = () => {
  const [textInput, setTextInput] = useState(""); // 추가할 투두 내용
  const { mutate: addTodoMutation } = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    addTodoMutation(textInput);
    setTextInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 w-full max-w-2xl mx-auto mb-4 min-h-[44px]"
    >
      {/* 할 일 입력할 입력창 */}
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md"
        placeholder="할 일을 입력하세요..."
      />

      {/* 추가 버튼 */}
      <button
        type="submit"
        className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 min-h-[44px] cursor-pointer"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoInput;
