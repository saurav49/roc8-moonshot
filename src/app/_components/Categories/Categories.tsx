"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "~/app/_components";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { PAGE_SIZE } from "~/server/api/routers/category";
import { toast } from "sonner";

export type CheckedCategoriesType = Record<
  string,
  {
    id: string;
    name: string;
  }
>;

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
  const { data, isSuccess, isLoading, refetch } =
    api.user.getLikedCategoriesByEmail.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnReconnect: false,
    });
  const likeCategory = api.user.likeCategory.useMutation({
    onSettled: () => {
      void refetch();
    },
  });
  const unlikeCategory = api.user.unlikeCategory.useMutation({
    onSettled: () => {
      void refetch();
    },
  });
  React.useEffect(() => {
    if (likeCategory.isError) {
      toast.error("Something went wrong, please try again");
    }
    if (unlikeCategory.isError) {
      toast.error("Something went wrong, please try again");
    }
  }, [likeCategory.isError, unlikeCategory.isError]);
  const [checkedCategories, setCheckedCategories] =
    React.useState<null | CheckedCategoriesType>(null);
  React.useEffect(() => {
    if (
      isSuccess &&
      !isLoading &&
      data?.success &&
      data?.data &&
      Array.isArray(data.data) &&
      data.data.length > 0
    ) {
      const cat = data.data.reduce((acc: CheckedCategoriesType, obj) => {
        acc[obj.name] = { id: obj.id, name: obj.name };
        return acc;
      }, {});
      setCheckedCategories(() => cat);
      return;
    }
    setCheckedCategories(null);
  }, [data?.data, data?.success, isLoading, isSuccess]);
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
    router.push(`/?page=${pageNo + 1}`, { scroll: false });
  };
  const handlePrevBtnClick = () => {
    if ((pageNo - 1) % PAGE_SIZE === 0) {
      setMinPageLimit(minPageLimit - PAGE_SIZE);
      setMaxPageLimit(maxPageLimit - PAGE_SIZE);
    }
    setPageNo((prevState) => prevState - 1);
    router.push(`/?page=${pageNo - 1}`, { scroll: false });
  };
  const pages = Array.from(Array(totalPages + 1).keys()).map((ele) => {
    return ele <= maxPageLimit && ele > minPageLimit ? (
      <li
        className={`mx-2 cursor-pointer text-xl font-medium ${pageNo === ele ? `text-black` : `text-[#cccccc]`}`}
        key={ele}
        onClick={() => {
          setPageNo(ele);
          router.push(`/?page=${ele}`, { scroll: false });
        }}
      >
        {ele}
      </li>
    ) : null;
  });
  const handleCheckbox = (data: { id: string; name: string }) => {
    const isChecked = checkedCategories
      ? !!checkedCategories[data.name]?.name
      : false;
    setCheckedCategories((prevState) => {
      if (prevState && isChecked) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [data.name]: _, ...updatedObj } = prevState;
        return updatedObj;
      } else {
        return { ...prevState, [data.name]: { ...data } };
      }
    });
    if (isChecked) {
      unlikeCategory.mutate({
        category: {
          id: data.id,
        },
      });
    } else {
      likeCategory.mutate({
        category: {
          id: data.id,
        },
      });
    }
  };
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
                checked={
                  checkedCategories
                    ? checkedCategories[data.name]?.name === data.name
                    : false
                }
                onChange={() => handleCheckbox(data)}
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            {pages}
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

export default Categories;
