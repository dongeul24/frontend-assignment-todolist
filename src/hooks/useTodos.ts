import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/lib/todoApi";
import Pagination from "@/types/Pagination";
import { EditTodo, ToggleTodo, FilterTodo } from "@/types/Todo";

// 투두 목록 가져오기
export function useTodos(page: number, perPage: number, filter: FilterTodo) {
  const { data, isPending, isError } = useQuery<Pagination>({
    queryKey: ["todos", page, filter],
    queryFn: () => getTodos(page, perPage, filter),
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

// 투두 수정
export function useEditTodo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (todo: EditTodo) => editTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { mutate, isPending, isError };
}

// 완료/미완료 토글
export function useToggleTodo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (todo: ToggleTodo) => toggleTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return { mutate, isPending, isError };
}
