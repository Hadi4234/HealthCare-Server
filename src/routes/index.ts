import express from 'express';

import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/product/product.route';
import { CategoryRouter } from '../modules/category/category.route';
import path from 'path';
import { orderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/category',
    route: CategoryRouter,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
