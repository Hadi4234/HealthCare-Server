import { Request } from 'express';
import { hashedPassword } from '../../helpers/hashPasswordHelper';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import { IAuthUser, IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';

const createUser = async (req: Request) => {
  const { email, password }: { email: string; password: string } = req.body;

  const hashPassword = await hashedPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
    },
  });
  return user;
};

const getMyProfile = async (authUser: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: authUser.userEmail,
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  return user;
};

const getOneUser = async (authUser: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: authUser,
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  return user;
};

// const getAllUser = async (
//   filters: any,
//   options: IPaginationOptions,
//   authUser: IAuthUser,
// ): Promise<IGenericResponse<products[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);

//   // auth role base logic here

//   // const andConditions = [];

//   // if (authUser?.role === userRole.USER) {
//   //   andConditions.push({
//   //     products: {
//   //       email: authUser?.email,
//   //     },
//   //   });
//   // } else {
//   //   andConditions.push({
//   //     products: {
//   //       email: authUser?.email,
//   //     },
//   //   });
//   // }

//   // if (Object.keys(filters).length > 0) {
//   //   andConditions.push({
//   //     AND: Object.keys(filters).map(key => ({
//   //       [key]: {
//   //         equals: (filters as any)[key],
//   //       },
//   //     })),
//   //   });
//   // }

//   // const whereConditions: Prisma.productsWhereInput =
//   //   andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.user.findMany({
//     // where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: 'asc',
//           },
//   });
//   const total = await prisma.user.count({
//     // where: whereConditions,
//   });

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

export const UserServices = {
  createUser,
  getMyProfile,
  getOneUser,
};
