import Pagination from "@/types/Pagination";
import Todo, { ToggleTodo, EditTodo, FilterTodo } from "@/types/Todo";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/todos`;

// 모든 투두 가져오기 (GET)
export async function getTodos(
  page: number = 1,
  perPage: number = 5,
  filter: FilterTodo
): Promise<Pagination> {
  console.log("API 요청 확인:", API_URL);
  let url = `${API_URL}?_page=${page}&_limit=${perPage}&_sort=date&_order=desc`; // 최신순 정렬

  if (filter === "completed") {
    url += `&completed=true`;
  } else if (filter === "incomplete") {
    url += `&completed=false`;
  }

  const response = await fetch(url);
  console.log("응답 헤더:", response.headers);

  if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

  const originalData = await response.json();

  const data = originalData;

  // totalCount가 X-Total-Count에 없으면 data.length 사용
  const totalCount = response.headers.get("X-Total-Count") || data.length;

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

// 투두 삭제 (DELETE)
export const deleteTodo = async (id: Todo["id"]) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// 투두 수정 (PATCH)
export const editTodo = async ({ id, text }: EditTodo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }), // text 수정
  });

  if (!response.ok) throw new Error("데이터를 수정하는 데 실패했습니다.");
  return response.json();
};

// 투두 완료, 미완료 토글 (PATCH)
export const toggleTodo = async ({ id, completed }: ToggleTodo) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
};
