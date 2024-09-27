import {faker } from "@faker-js/faker"
import { PrismaClient }  from '@prisma/client';
import bcrypt from "bcrypt";

export const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

async function main() {
  // Step 1: Create some categories
//   const categories = await prisma.category.createMany({
//     data: [
//       { name: 'Clothing' },
//       { name: 'Electronics' },
//       { name: 'Home & Furniture' },
//       { name: 'Beauty & Personal Care' }
//     ]
//   });
//
//   // Step 2: Create some colors
//   const colors = await prisma.color.createMany({
//     data: [
//       { name: 'Red', hex: '#FF0000' },
//       { name: 'Blue', hex: '#0000FF' },
//       { name: 'Green', hex: '#008000' },
//       { name: 'Black', hex: '#000000' },
//       { name: 'White', hex: '#FFFFFF' }
//     ]
//   });
//
  // const colorIds = await prisma.color.findMany({ select: { id: true } });
 const colorIds =[1,2,3,4,5]
//   // Step 3: Create some sizes
//   const sizes = await prisma.size.createMany({
//     data: [
//       { name: 'S' },
//       { name: 'M' },
//       { name: 'L' },
//       { name: 'XL' }
//     ]
//   });
//
//   const sizeIds = await prisma.size.findMany({ select: { id: true } });
// const HashedPassword ="$2b$10$9UVQZgbQcy/w3SYE.dFuUu4Cceavy5x0TcvjxO12Wocbr8sED7.gG" 
//   // Step 4: Create users (both admins and customers)
//   const admin = await prisma.user.create({
//     data: {
//       email: 'admin@example.com',
//       password: HashedPassword,
//       name: 'Admin User',
//       role: 'ADMIN'
//     }
//   });

  const customers = [1,2,3,4,5];
  // for (let i = 0; i < 5; i++) {
  //   const customer = await prisma..create({
  //     data: {
  //       email: faker.internet.email(),
  //       password: HashedPassword,
  //       name: faker.name.firstName(),
  //       role: 'CUSTOMER'
  //     }
  //   });
  //   customers.push(customer);
  // }

  // Step 5: Generate Products with Color-Based Size Variants and Reviews
  for (let i = 0; i < 10; i++) {
    const productName = faker.commerce.productName();
    const productDescription = faker.commerce.productDescription();
    const basePrice = parseFloat(faker.commerce.price());

    // Create product with random category
    const product = await prisma.product.create({
      data: {
        name: productName,
        description: productDescription,
        price: basePrice,
        categoryId: faker.helpers.arrayElement([1, 2, 3, 4]), // Randomly select from existing category IDs
        variants: {
          create: [
            {
              colorId: faker.helpers.arrayElement([1, 2, 3, 4,5]),
              sizes: {
                create: [
                  {
                    sizeId: faker.helpers.arrayElement([1, 2, 3, 4,5]),
                    stock:faker.helpers.arrayElement([10, 20, 30, 40,50]),
                    price: parseFloat(faker.commerce.price())
                  },
                  {
                    sizeId: faker.helpers.arrayElement([1, 2, 3, 4,5]),
                    stock: faker.helpers.arrayElement([10, 20, 30, 40,50]),
                    price: parseFloat(faker.commerce.price())
                  }
                ]
              }
            },
            {
              colorId: faker.helpers.arrayElement([1,2,3,4,5]),
              sizes: {
                create: [
                  {
                    sizeId: faker.helpers.arrayElement([1,2,3,4,5]),
                    stock: faker.helpers.arrayElement([10, 20, 30, 40,50]),
                    price: parseFloat(faker.commerce.price())
                  },
                  {
                    sizeId: faker.helpers.arrayElement([1,2,3,4,5]),
                    stock: faker.helpers.arrayElement([10, 20, 30, 40,50]),
                    price: parseFloat(faker.commerce.price())
                  }
                ]
              }
            }
          ]
        }
      }
    });

    // Create reviews for the product
    for (let j = 0; j < 3; j++) {
      await prisma.review.create({
        data: {
          rating: faker.number.int({min:1,max:5}),
          comment: faker.lorem.sentence(),
          productId: product.id,
          userId: faker.helpers.arrayElement(customers)
        }
      });
    }

    console.log(`Created product: ${product.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

