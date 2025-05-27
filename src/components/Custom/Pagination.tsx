"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButtonPrevious,
  PaginationButton,
  PaginationEllipsis,
  PaginationButtonNext,
} from "../ui/pagination";
import { IPagination } from "@/types/default";
import { useQueryParams } from "@/hooks/utils/useQueryParams";

const CustomPagination = ({ ...props }: IPagination) => {
  const { query, setQueryParam } = useQueryParams();
  const page = Number(query.page || 1);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationButtonPrevious
              onClick={() => setQueryParam("page", page - 1)}
            />
          </PaginationItem>
        )}
        {page !== 1 && page - 1 > 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => setQueryParam("page", 1)}>
              1
            </PaginationButton>
          </PaginationItem>
        )}
        {page !== 1 && 1 < page - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationButton onClick={() => setQueryParam("page", page - 1)}>
              {page - 1}
            </PaginationButton>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationButton isActive>{page}</PaginationButton>
        </PaginationItem>
        {props.last_page > page && (
          <PaginationItem>
            <PaginationButton onClick={() => setQueryParam("page", page + 1)}>
              {page + 1}
            </PaginationButton>
          </PaginationItem>
        )}
        {props.last_page > page + 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {props.last_page !== page && props.last_page - 1 > page && (
          <PaginationItem>
            <PaginationButton
              onClick={() => setQueryParam("page", props.last_page)}
            >
              {props.last_page}
            </PaginationButton>
          </PaginationItem>
        )}
        {props.last_page > page && (
          <PaginationItem>
            <PaginationButtonNext
              onClick={() => setQueryParam("page", page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
