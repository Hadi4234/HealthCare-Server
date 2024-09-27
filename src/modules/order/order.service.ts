import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Request } from 'express';
import prisma from '../../shared/prisma';

type product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const createOrder = async (req: Request) => {
  const user = req.user;
  const cart: product[] = req.body;
  const products = cart.map(item => {
    async function getProduct() {
      const product = await prisma.product.findUnique({
        where: { id: 2, price: item.price },
      });
      if (!product)
        throw new ApiError(httpStatus.BAD_REQUEST, 'product not found!!');
      console.log('product found');
      return product;
    }
    getProduct();
  });

  if (!products) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product not found!!');
  }

  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found!!');

  const order = {
    user,
    cart,
  };
  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'order not created!!');
  } else {
    return order;
  }

  // switch statement use korte hobe
};

export const orderService = {
  createOrder,
};
