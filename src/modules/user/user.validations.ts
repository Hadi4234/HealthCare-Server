import * as z from 'zod';

const createUser = z.object({
  body:z.object({
    email: z.string().email(),
    password: z.string(),
  })
});

const updateUser = createUser.partial();

const getOneUser = z.object({
   params:z.object({
     id: z.number(),
   })
});


export const UserValidation = {
  createUser,
  updateUser,
  getOneUser
}