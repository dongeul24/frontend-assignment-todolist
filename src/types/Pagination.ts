import Todo from "./Todo";

// 페이지네이션을 위한 타입 정의
export type Pagination = {
  data: Todo[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export default Pagination;