import express, { NextFunction, Request, Response } from 'express';

import { validateSchema } from '../../middlewares/validationSchema';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  orderController.createOrder,
);

export const orderRoutes = router;
