import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { jwtHelpers } from '../helpers/jwtHelpers';
import { ENUM_USER_ROLE } from '../enums/user';
import prisma from '../shared/prisma';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

      // checking if the token is missing
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as string,
      ) as JwtPayload;

      const { userRole, userEmail, userId } = decoded;

      // checking if the user is exist
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
      // checking if the user is already deleted

      // const status = user?.status;

      // if (status === 'BLOCKED') {
      //   throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked !');
      // }

      // if (
      //   user.passwordChangedAt &&
      //   User.isJWTIssuedBeforePasswordChanged(
      //     user.passwordChangedAt,
      //     iat as number
      //   )
      // ) {
      //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      // }

      if (requiredRoles && !requiredRoles.includes(userRole)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
