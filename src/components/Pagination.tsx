import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  nowPage: number;
  setNowPage: (page: number) => void;
  total: number;
  limit: number;
  className?: string;
};

export function DefaultPagination({ ...props }: PaginationProps) {
  const totalPage = Math.ceil(props.total / props.limit);
  if (props.total < props.limit) {
    <Pagination className={`${props.className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {props.nowPage}
          </PaginationLink>
        </PaginationItem>
        ;
      </PaginationContent>
    </Pagination>;
  }
  return (
    <Pagination className={`${props.className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {props.nowPage !== 1 && (
          <PaginationItem>
            <PaginationLink href="#">{props.nowPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {props.nowPage}
          </PaginationLink>
        </PaginationItem>
        {props.nowPage !== totalPage && (
          <PaginationItem>
            <PaginationLink href="#">{props.nowPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
