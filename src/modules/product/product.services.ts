import { Request, Response } from 'express';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createProduct = async prod => {
  const product = await prisma.product.create({
    data: prod,
  });
  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'product not created!!');
  return product;
};

const getSingleProduct = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });
  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'product not found!!');
  return product;
};
const getAllProduct = async () => {
  const product = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          color: true,
          sizes: true,
        },
      },
    },
  });
  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'product not found!!');
  return product;
};
const getProdcutByCategory = async (id: number) => {
  const product = await prisma.category.findMany({
    where: {
      id,
    },
    include: {
      products: true,
      parent: {
        include: {
          parent: true,
        },
      },
    },
  });
  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'product not found!!');
  return product;
};
export const productService = {
  createProduct,
  getSingleProduct,
  getAllProduct,
  getProdcutByCategory,
};
