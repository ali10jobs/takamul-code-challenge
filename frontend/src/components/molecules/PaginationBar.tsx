"use client";

import React, { useState } from "react";
import Button from "@/components/atoms/Button";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const [jumpValue, setJumpValue] = useState("");

  if (totalPages <= 1) return null;

  const visiblePages: number[] = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + 2);
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(jumpValue);
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
        setJumpValue("");
      }
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 py-8">
      <Button
        variant="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-muted hover:text-text-main disabled:opacity-30"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 text-sm rounded ${
            page === currentPage
              ? "text-primary font-bold"
              : "text-muted hover:text-text-main"
          }`}
        >
          {page}
        </button>
      ))}

      <input
        type="text"
        value={jumpValue}
        onChange={(e) => setJumpValue(e.target.value)}
        onKeyDown={handleJump}
        placeholder=""
        className="w-10 h-8 text-center text-sm border border-divider rounded focus:outline-none focus:border-primary"
      />

      <span className="text-sm text-muted">{totalPages}</span>

      <Button
        variant="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-muted hover:text-text-main disabled:opacity-30"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}
