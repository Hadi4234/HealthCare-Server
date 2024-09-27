import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { productService } from './product.services';
import { z } from 'zod';
import prisma from '../../shared/prisma';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created',
    data: { product },
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = z.coerce.number().parse(req.params.id);

  const product = await prisma.product.findFirst({
    where: { id: id },
    include: {
      category: {
        include: {
          parent: true,
        },
      },
      reviews: true,
    },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product fetched where id= ${id}`,
    data: product,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getAllProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched',
    data: product,
  });
});
const getProdcutByCategory = catchAsync(async (req: Request, res: Response) => {
  const id = z.coerce.number().parse(req.params.id);
  const product = await productService.getProdcutByCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched',
    data: product,
  });
});

export const productController = {
  createProduct,
  getSingleProduct,
  getAllProduct,
  getProdcutByCategory,
};
