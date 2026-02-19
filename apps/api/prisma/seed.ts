import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding database...');

  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
  const states = ['SP', 'RJ', 'MG', 'PR', 'RS'];

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.upsert({
      where: { email: `instrutor${i}@cnh.app` },
      update: {},
      create: {
        email: `instrutor${i}@cnh.app`,
        name: `Instrutor ${i}`,
        phone: `119${String(i).padStart(8, '0')}`,
        role: UserRole.INSTRUCTOR,
        instructor: {
          create: {
            bio: `Instrutor credenciado com ${5 + i} anos de experiência na categoria B.`,
            city: cities[i % 5],
            state: states[i % 5],
            pricePerHour: 80 + i * 10,
            categories: i % 2 === 0 ? ['B', 'A'] : ['B'],
            rating: 4.5,
            totalReviews: i * 5,
          },
        },
      },
    });
    console.log(`Created instructor: ${user.name}`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
