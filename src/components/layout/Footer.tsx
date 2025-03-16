import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container max-w-screen-lg mx-auto text-center px-4 md:text-sm">
        <p className="text-sm md:text-base">
          &copy; 2025 To Do List | 이지원
          <Link
            href="https://github.com/dongeul24/frontend-assignment-todolist"
            target="_blank"
            className="hover:text-orange-300 underline"
          >
            <br /> GitHub 레포지토리
          </Link>
        </p>
      </div>
    </footer>
  );
}
