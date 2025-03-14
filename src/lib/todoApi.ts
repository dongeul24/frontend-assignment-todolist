import Pagination from "@/types/Pagination";
import Todo from "@/types/Todo";

const API_URL = "http://localhost:3000/todos";

// 모든 투두 가져오기 (GET)
export async function getTodos(
  page: number = 1,
  perPage: number = 5
): Promise<Pagination> {
  const response = await fetch(
    `${API_URL}?_page=${page}&_per_page=${perPage}&_sort=-date` // 최신순 정렬
  );
  if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

  const originalData = await response.json();
  const data = originalData.data;

  // 데이터 총 개수
  const totalCount = originalData.items;

  return {
    data,
    first: 1,
    items: data.length,
    last: Math.ceil(totalCount / perPage),
    next: page * perPage < totalCount ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
    pages: Math.ceil(totalCount / perPage),
  };
}

// 투두 추가 (POST)
export const addTodo = async (text: string): Promise<Todo> => {
  const newTodo: Todo = {
    id: crypto.randomUUID(), // 고유한 ID 생성
    text,
    completed: false,
    date: new Date().toISOString(), // 날짜 추가
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error("데이터를 추가하는 데 실패했습니다.");
  return response.json();
};
