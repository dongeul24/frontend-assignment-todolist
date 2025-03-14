// Todo 타입
export type Todo = {
  id: string; // 고유 아이디
  text: string; // 투두 내용
  completed: boolean; // 완료/미완료 표시
  date: string; // 작성 날짜
};

export default Todo;

// EditTodo 타입
export type EditTodo = Pick<Todo, "id" | "text">;

// ToggleTodo 타입
export type ToggleTodo = Omit<Todo, "text" | "date">;
