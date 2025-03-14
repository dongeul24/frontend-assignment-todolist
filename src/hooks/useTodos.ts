import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, deleteTodo } from "@/lib/todoApi";
import Pagination from "@/types/Pagination";

// 투두 목록 가져오기
export function useTodos(page: number, perPage: number) {
  const { data, isPending, isError } = useQuery<Pagination>({
    queryKey: ["todos", page],
    queryFn: () => getTodos(page, perPage),
  });

  return { data, isPending, isError };
}

// 새 투두 추가
export function useAddTodo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { mutate, isPending, isError };
}

// 투두 삭제
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return { mutate, isPending, isError };
}
