import { Request } from "express";
import { hashedPassword } from "../../helpers/hashPasswordHelper";
import prisma from "../../shared/prisma";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { AuthUtils } from "./auth.utils";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";


const login = async (req: Request) => {
  const { email, password }: ILoginUser = req.body;

  const isUserExist = await prisma.users.findUnique({
    where: {
      email,
            
    }
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await AuthUtils.comparePasswords(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }


//you can add user role here and authorize by role
  const { id: userId,email:userEmail, role: userRole } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, userEmail, userRole },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId,userEmail, userRole },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };

}


export const AuthServices = {
  login
}