import express from 'express';
import { validateSchema } from '../../middlewares/validationSchema';

import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';

const router = express.Router();

router.get('/get-all', categoryController.getAllCategories);
router.get('/all', categoryController.getAll);
router.get('/get-all-parent', categoryController.getAllParent);
router.get(
  '/get-by-parent-id/:id',
  categoryController.getAllCategoryByParentId,
);
router.post('/create-sub-category', categoryController.createSubCategory);

export const CategoryRouter = router;
