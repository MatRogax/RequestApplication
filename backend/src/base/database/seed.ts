import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin1 = await prisma.admin.create({
    data: {
      name: 'Admin One',
      email: 'admin1@example.com',
      password: 'adminpassword1',
    },
  });

  const admin2 = await prisma.admin.create({
    data: {
      id: '',
      name: 'Admin Two',
      email: 'admin2@example.com',
      password: 'adminPassword2.',
    },
  });

  console.log({ admin1, admin2 });

  const user1 = await prisma.user.create({
    data: {
      name: 'User One',
      email: 'user1@example.com',
      password: 'userPassword1.',
      cpf: '11122233344',
      address: 'User Address 1',
      phone: '1122334455',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User Two',
      email: 'user2@example.com',
      password: 'userpassword2',
      cpf: '55566677788',
      address: 'User Address 2',
      phone: '5566778899',
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: 'Category One',
      description: 'Description for Category One',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Category Two',
      description: 'Description for Category Two',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Category Three',
      description: 'Description for Category Three',
    },
  });
  console.log({ category1, category2, category3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
