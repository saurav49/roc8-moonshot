import { Categories } from "~/app/_components";
import { api } from "~/trpc/server";
const CategoryPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const categories = await api.category.getAllCategory({
    pageNumber: searchParams.page ? Number(searchParams.page) : 1,
  });
  const totalPages = await api.category.getTotalPages();
  return <Categories categories={categories} totalPages={totalPages} />;
};

export default CategoryPage;
