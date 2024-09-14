import express, { NextFunction, Request, Response } from 'express';
import { UserValidation } from './user.validations';
import { UserController } from './user.controller';
import { validateSchema } from '../../middlewares/validationSchema';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();


router.post("/create", validateRequest(UserValidation.createUser), UserController.createUser)
router.get("/profile", auth(ENUM_USER_ROLE.SELLER), UserController.getMyProfile)
router.get("/all",UserController.getAllUser)

router.get("/:id", UserController.getOneUser)


export const userRoutes = router;