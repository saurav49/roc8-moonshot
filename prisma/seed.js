import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const AMOUNT_OF_DATA = 100;

const prisma = new PrismaClient();

const generateCategories = () => {
  const categories = [];
  for (let i = 0; i < AMOUNT_OF_DATA; i++) {
    categories.push({ name: faker.commerce.product() });
  }
  return categories;
};

const load = async () => {
  const categories = generateCategories();
  try {
    await prisma.category.deleteMany();
    console.log("Deleted records in category table");

    await prisma.category.createMany({
      data: categories,
    });
    console.log("Added category data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
void load();
