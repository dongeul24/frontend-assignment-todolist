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
import Swal from "sweetalert2";

// 투두 목록 가져오기
export function useTodos(page: number, perPage: number, filter: FilterTodo) {
  const { data, isPending, isError } = useQuery<Pagination>({
    queryKey: ["todos", page, filter],
    queryFn: () => getTodos(page, perPage, filter),
    staleTime: 10000, // 10초 동안 새로운 요청 보내지 않음
    gcTime: 60000, // 60초 동안 캐시 유지
    refetchOnWindowFocus: false, // 창을 다시 포커스할 때 재요청 방지
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
      Swal.fire("추가 완료", "새로운 할 일이 추가되었습니다.", "success");
    },
    onError: () => {
      Swal.fire(
        "추가 실패",
        "할 일을 추가하는 중 오류가 발생했습니다.",
        "error"
      );
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

      Swal.fire("삭제 완료", "할 일이 삭제되었습니다.", "success");
    },
    onError: () => {
      Swal.fire(
        "삭제 실패",
        "할 일을 삭제하는 데 문제가 발생했습니다.",
        "error"
      );
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
      Swal.fire("수정 완료", "할 일이 수정되었습니다.", "success");
    },
    onError: () => {
      Swal.fire(
        "수정 실패",
        "할 일을 수정하는 중 오류가 발생했습니다.",
        "error"
      );
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
    onError: () => {
      Swal.fire(
        "완료/미완료 설정 실패",
        "할 일을 완료/미완료 설정하는 중 오류가 발생했습니다.",
        "error"
      );
    },
  });
  return { mutate, isPending, isError };
}
