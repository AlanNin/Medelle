import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import React from "react";

export default function BottomPagination({
  totalPages,
  page,
  setPage,
  onChange,
}: {
  totalPages: number;
  page: number;
  setPage: (newPage: number) => void;
  onChange?: () => void;
}) {
  const getPageNumbers = (): (number | "ellipsis-prev" | "ellipsis-next")[] => {
    // if there are very few pages, show them all
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis-prev" | "ellipsis-next")[] = [];

    // always show the first
    pages.push(1);

    let start: number;
    let end: number;

    // define the dynamic range of three pages
    if (page <= 2) {
      // near the start: show [2, 3]
      start = 2;
      end = 3;
    } else if (page >= totalPages - 1) {
      // near the end: show [totalPages-2, totalPages-1]
      start = totalPages - 2;
      end = totalPages - 1;
    } else {
      // in the middle: show [page-1, page, page+1]
      start = page - 1;
      end = page + 1;
    }

    // only show ellipsis if range does not touch first
    if (start > 2) {
      pages.push("ellipsis-prev");
    }

    // insert the dynamic block
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // only show ellipsis if range does not touch last
    if (end < totalPages - 1) {
      pages.push("ellipsis-next");
    }

    // always show the last
    pages.push(totalPages);

    return pages;
  };

  function ChangePageNumber(number: number) {
    setPage(number);
    onChange?.();
  }

  function ChangePagePrevious() {
    setPage(Math.max(Number(page) - 1, 1));
    onChange?.();
  }

  function ChangePageNext() {
    setPage(Math.min(Number(page) + 1, totalPages || 0));
    onChange?.();
  }

  return (
    <Pagination className={cn("mt-auto", totalPages === 1 && "hidden")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            label="Anterior"
            className={cn(
              "select-none cursor-pointer",
              page === 1 && "muted-foreground opacity-50 pointer-events-none",
              totalPages === 1 && "hidden"
            )}
            onClick={ChangePagePrevious}
          />
        </PaginationItem>

        {getPageNumbers().map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis-prev" || item === "ellipsis-next" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className={cn(
                  "select-none cursor-pointer",
                  item === page && "bg-primary hover:bg-primary"
                )}
                onClick={() => ChangePageNumber(item)}
                isActive={Number(page) === item}
              >
                <p
                  className={cn(
                    item === page &&
                      "text-primary-foreground hover:text-primary-foreground"
                  )}
                >
                  {item}
                </p>
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            label="Siguiente"
            className={cn(
              "select-none cursor-pointer",
              Number(page) === totalPages &&
                "muted-foreground opacity-50 pointer-events-none",
              totalPages === 1 && "hidden"
            )}
            onClick={ChangePageNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
