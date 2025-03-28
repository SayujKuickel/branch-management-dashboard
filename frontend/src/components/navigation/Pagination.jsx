"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components";

const Pagination = ({ page, limit }) => {
  const pathname = usePathname();
  const router = useRouter();

  function handlePagination(pageNumber, dataLimit) {
    const params = [`page=${pageNumber}`, `limit=${dataLimit}`];

    router.push(`${pathname}?${params.join("&")}`);
  }

  return (
    <section className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <span>Showing</span>

        <select
          className="border border-primary/25 bg-primary/5 hover:bg-primary/25 p-2 rounded-lg"
          value={limit}
          onChange={(e) => handlePagination(0, e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <span>items per page.</span>
      </div>

      <div className="flex gap-2">
        {page > 0 && (
          <Button
            icon="prev"
            btnType="secondary"
            onClick={() => handlePagination(page - 1, limit)}
          />
        )}

        <Button
          icon="next"
          btnType="secondary"
          onClick={() => handlePagination(page + 1, limit)}
        />
      </div>
    </section>
  );
};

export default Pagination;
