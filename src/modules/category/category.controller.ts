import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { Request, Response } from 'express';
import { categoryServices } from './category.services';
import { z } from 'zod';

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched',
    data: { category },
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched',
    data: { category },
  });
});

const getAllParent = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.getAllParent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Category fetched',
    data: { category },
  });
});

const getAllCategoryByParentId = catchAsync(
  async (req: Request, res: Response) => {
    const id = z.coerce.number().parse(req.params.id);
    const category = await categoryServices.getCategoryByParentId(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched',
      data: { category },
    });
  },
);

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const parentId = z.coerce.number().parse(req.body.parentId);
  const name = z.string().min(1).max(32).parse(req.body.name);
  const category = await categoryServices.createSubCategory(parentId, name);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created',
    data: { category },
  });
});

export const categoryController = {
  getAllCategories,
  getAllCategoryByParentId,
  createSubCategory,
  getAllParent,
  getAll,
};
