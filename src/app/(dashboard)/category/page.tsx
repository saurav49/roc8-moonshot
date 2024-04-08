import { Categories } from "~/app/_components";
import { api } from "~/trpc/server";
const CategoryPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { success, data } = await api.category.getAllCategory({
    pageNumber: searchParams.page ? Number(searchParams.page) : 1,
  });
  return (
    <Categories
      categories={success ? data.categories : []}
      totalPages={success ? data.totalPages : 0}
    />
  );
};

export default CategoryPage;
