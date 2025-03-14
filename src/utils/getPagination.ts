export function getPagination(
  currentPage: number,
  totalPages: number,
  visiblePages: number = 4 // 한 페이지에 보여질 페이지 목록 개수
) {
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
}
