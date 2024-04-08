import React from "react";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
  totalCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalCount,
  onPageChange,
}: IPaginationProps) => {
  const pageCount = Math.ceil(totalCount / 10);
  // Pagination component logic here
  return (
    <div className="mt-4 flex justify-end">
      <ReactPaginate
        pageRangeDisplayed={5}
        previousLabel={"< prev"}
        nextLabel={"next >"}
        breakLabel={"..."}
        onPageChange={({ selected = 0 }) => onPageChange(selected)}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active-page"}
        disableInitialCallback={true}
      />
    </div>
  );
};

export default Pagination;
