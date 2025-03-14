import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>
          &copy; 2025 To Do List | 이지원 |{" "}
          <Link
            href="https://github.com/dongeul24/frontend-assignment-todolist"
            target="_blank"
            className="hover:text-orange-300"
          >
            GitHub 레포지토리로 이동하기
          </Link>
        </p>
      </div>
    </footer>
  );
}
