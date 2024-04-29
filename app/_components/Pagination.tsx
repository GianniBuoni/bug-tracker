"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params);
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <div className="join mt-3">
      <button
        className="join-item btn"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        «
      </button>
      <button
        className="join-item btn"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        ‹
      </button>
      <button className="join-item btn">
        Page {currentPage} of {pageCount}
      </button>
      <button
        className="join-item btn"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        ›
      </button>
      <button
        className="join-item btn"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
