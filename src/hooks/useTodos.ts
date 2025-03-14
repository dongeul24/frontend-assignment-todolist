import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/lib/todoApi";
import Pagination from "@/types/Pagination";

// 투두 목록 가져오기
export function useTodos(page: number, perPage: number) {
  const { data, isPending, isError } = useQuery<Pagination>({
    queryKey: ["todos", page],
    queryFn: () => getTodos(page, perPage),
  });

  return { data, isPending, isError };
}
