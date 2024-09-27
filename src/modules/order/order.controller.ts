import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { z } from 'zod';
import prisma from '../../shared/prisma';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created',
    data: { order },
  });
});

export const orderController = {
  createOrder,
};
