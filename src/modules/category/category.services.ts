import prisma from '../../shared/prisma';

const getAllCategory = async () => {
  const category = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      subcategories: {
        include: {
          subcategories: true,
        },
      },
    },
  });
  return category;
};
const getAllParent = async () => {
  const category = await prisma.category.findMany({
    where: {
      parentId: null,
    },
  });
  return category;
};

const getAll = async () => {
  const parent = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      subcategories: true,
    },
  });

  return parent;
};

const getCategoryByParentId = async (id: number) => {
  const category = await prisma.category.findMany({
    where: {
      parentId: id,
    },
    include: {
      subcategories: true,
    },
  });
  return category;
};

const createSubCategory = async (parentId: number, name: string) => {
  const category = await prisma.category.create({
    data: {
      name,
      parentId,
    },
  });
  return category;
};

export const categoryServices = {
  getAllCategory,
  getCategoryByParentId,
  createSubCategory,
  getAllParent,
  getAll,
};
