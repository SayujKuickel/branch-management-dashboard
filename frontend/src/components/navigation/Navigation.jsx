"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 m-4">
      <Link
        href="/"
        className="p-2 text-sm bg-amber-100 grid items-center w-fit rounded-lg cursor-pointer"
      >
        GO HOME
      </Link>

      <div
        onClick={() => router.back()}
        className="p-2 text-sm bg-amber-100 grid items-center w-fit rounded-lg cursor-pointer"
      >
        GO BACK
      </div>
    </div>
  );
};

export default Navigation;
