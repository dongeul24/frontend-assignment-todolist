import TodoInput from "@/components/todolist/TodoInput";
import TodoList from "@/components/todolist/TodoList";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">나만의 Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default Home;
