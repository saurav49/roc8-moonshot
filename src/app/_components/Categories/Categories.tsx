"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "~/app/_components";

function Categories({
  categories,
  totalPages,
}: {
  categories: Array<{
    id: string;
    name: string;
  }>;
  totalPages: number;
}) {
  console.log({ categories, totalPages });
  return (
    <div className="flex h-[691px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
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
              key={data.id}
              className="my-3 flex items-center justify-center"
            >
              <input type="checkbox" id={data.name} className="h-6 w-6" />
              <label htmlFor={data.name} className="ml-3 text-base font-normal">
                {data.name}
              </label>
            </div>
          );
        })}
        <Pagination className="!flex !items-center !border !border-red-600">
          <PaginationContent className="!flex !items-center !border !border-red-600">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="flex items-center gap-2"
              />
            </PaginationItem>
            {/* {Array.from(Array(totalPages).keys()).map((page) => {
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={`${page}`}>{page}</PaginationLink>
                </PaginationItem>
              );
            })}  */}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="flex items-center gap-2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export { Categories };
