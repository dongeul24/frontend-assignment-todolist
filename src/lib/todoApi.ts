import Pagination from "@/types/Pagination";

const API_URL = "http://localhost:3000/todos";

// 모든 투두 가져오기 (GET)
export async function getTodos(
  page: number = 1,
  perPage: number = 5
): Promise<Pagination> {
  const response = await fetch(`${API_URL}?_page=${page}&_per_page=${perPage}`);
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
