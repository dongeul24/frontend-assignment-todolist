"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-orange-300 text-white py-4 shadow-md">
      <div className="container max-w-screen-lg mx-auto flex justify-between items-center px-4 md:px-8">
        {/* 로고 */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </div>
    </header>
  );
}
