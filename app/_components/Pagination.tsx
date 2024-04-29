import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  return (
    <div className="join">
      <button className="join-item btn" disabled={currentPage === 1}>
        «
      </button>
      <button className="join-item btn" disabled={currentPage === 1}>
        ‹
      </button>
      <button className="join-item btn">
        Page {currentPage} of {pageCount}
      </button>
      <button className="join-item btn" disabled={currentPage === pageCount}>
        ›
      </button>
      <button className="join-item btn" disabled={currentPage === pageCount}>
        »
      </button>
    </div>
  );
};

export default Pagination;
