"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "~/app/_components";
import { PAGE_SIZE } from "~/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
function Categories({
  categories,
  totalPages,
  currentPage,
}: {
  categories: Array<{
    id: string;
    name: string;
  }>;
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const [pageNo, setPageNo] = React.useState<number>(0);
  React.useEffect(() => {
    setPageNo(currentPage);
  }, [currentPage]);
  const [minPageLimit, setMinPageLimit] = React.useState<number>(0);
  const [maxPageLimit, setMaxPageLimit] = React.useState<number>(PAGE_SIZE);
  const handleNextBtnClick = () => {
    if (pageNo + 1 > maxPageLimit) {
      setMinPageLimit(minPageLimit + PAGE_SIZE);
      setMaxPageLimit(maxPageLimit + PAGE_SIZE);
    }
    setPageNo((prevState) => prevState + 1);
    router.push(`/category?page=${pageNo + 1}`, { scroll: false });
  };
  const handlePrevBtnClick = () => {
    if ((pageNo - 1) % PAGE_SIZE === 0) {
      setMinPageLimit(minPageLimit - PAGE_SIZE);
      setMaxPageLimit(maxPageLimit - PAGE_SIZE);
    }
    setPageNo((prevState) => prevState - 1);
    router.push(`/category?page=${pageNo - 1}`, { scroll: false });
  };
  const pages = Array.from(Array(totalPages).keys()).map((ele) => {
    return ele <= maxPageLimit && ele > minPageLimit ? (
      <li
        className={`mx-2 cursor-pointer text-xl font-medium ${pageNo === ele ? `text-black` : `text-[#cccccc]`}`}
        key={ele}
        onClick={() => {
          setPageNo(ele);
          router.push(`/category?page=${ele}`, { scroll: false });
        }}
      >
        {ele}
      </li>
    ) : null;
  });
  // const handlePrevEllipsisBtnClick = () => {
  //   if (pageNo - 1 >= minPageLimit) {
  //     setMaxPageLimit((prevState) => prevState - 1);
  //     setMinPageLimit((prevState) => prevState - 1);
  //     setPageNo(pageNo - 1);
  //   }
  // };
  // const handleNextEllipsisBtnClick = () => {
  //   if (pageNo + 1 < totalPages) {
  //     setMaxPageLimit((prevState) => prevState + 1);
  //     setMinPageLimit((prevState) => prevState + 1);
  //     setPageNo(pageNo + 1);
  //   }
  // };
  // let pageIncrementEllipsis = null;
  // if (pages.length > maxPageLimit) {
  //   pageIncrementEllipsis = (
  //     <PaginationItem className="flex items-center justify-center">
  //       <button type="button" onClick={() => handleNextEllipsisBtnClick()}>
  //         <ChevronRight />
  //       </button>
  //     </PaginationItem>
  //   );
  // }
  // let pageDecrementEllipsis = null;
  // if (minPageLimit >= 1) {
  //   pageDecrementEllipsis = (
  //     <PaginationItem className="flex items-center justify-center">
  //       <button type="button" onClick={() => handlePrevEllipsisBtnClick()}>
  //         <ChevronLeft />
  //       </button>
  //     </PaginationItem>
  //   );
  // }
  return (
    <div className="flex h-[579px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <h1 className="mb-2 text-3xl font-semibold text-black">
        Please mark your interests!
      </h1>
      <p className="mb-[31px] mt-[13px]  text-base font-normal text-black">
        We will keep you notified.
      </p>

      <div className="flex w-full flex-col items-start">
        <h2 className="mb-5 text-xl font-medium">My saved interests!</h2>
        {categories.slice(0, 6).map((data: { id: string; name: string }) => {
          return (
            <div
              className="relative flex items-center justify-between py-2 pl-[15px] pr-[22px]"
              key={data.id}
            >
              <input
                type="checkbox"
                name={data.name}
                id={data.name}
                // checked={checked}
                // onChange={() => checkboxHandler(pageIndex)}
                className="peer flex h-[23px] w-[23px] shrink-0 cursor-pointer appearance-none items-center justify-center
                          rounded-md border border-[#cccccc] bg-[#cccccc]
                          outline-none checked:bg-black
                          focus-within:outline-offset-2 hover:border
                          hover:border-[#cccccc]
                          hover:opacity-60
                          checked:hover:bg-black/60 focus-visible:outline-none
                          active:ring-4 active:ring-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-50 peer-active:ring-4 peer-active:ring-[#eff6ff]"
              />
              <svg
                className="lucide lucide-check pointer-events-none absolute left-[17px] top-[7px] mt-1 hidden h-5 w-5 fill-none peer-checked:block peer-hover:block"
                xmlns="http://www.w3.org/2000/svg"
                // width="24"
                // height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5" stroke={true ? "#fff" : "#878787"} />
              </svg>
              <label
                htmlFor={data.name}
                className="peer ml-3 cursor-pointer text-base font-normal"
              >
                {data.name}
              </label>
            </div>
          );
        })}
        <Pagination className="mt-16 !flex !items-center">
          <PaginationContent className="!flex w-full !items-center">
            <PaginationItem className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => handlePrevBtnClick()}
                disabled={pageNo === 1}
                className={`${pageNo === 1 ? "cursor-not-allowed text-gray" : "cursor-pointer"}`}
              >
                <ChevronsLeft />
              </button>
            </PaginationItem>
            {/* {pageDecrementEllipsis} */}
            {pages}
            {/* {pageIncrementEllipsis} */}
            <PaginationItem className="flex items-center justify-center">
              <button type="button" onClick={() => handleNextBtnClick()}>
                <ChevronsRight />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export { Categories };
