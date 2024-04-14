// "use client";
import Categories from "~/app/_components/Categories/Categories";
import { api } from "~/trpc/server";
const CategoryPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { success, data } = await api.category.getAllCategory({
    pageNumber: searchParams.page ? Number(searchParams.page) : 1,
  });
  console.log(data.totalPages);
  return (
    <Categories
      categories={
        // getAllCategory.data?.success ? getAllCategory.data.data.categories : []
        success ? data.categories : []
      }
      totalPages={
        // getAllCategory.data?.success ? getAllCategory.data.data.totalPages : 0
        success ? data.totalPages : 0
      }
      currentPage={
        // getAllCategory.data?.success ? getAllCategory.data.data.currentPage : 0
        success ? data.currentPage : 0
      }
    />
  );
};

export default CategoryPage;
