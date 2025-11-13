import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing default categories
  await prisma.category.deleteMany({
    where: { isDefault: true },
  });

  // Expense categories
  const expenseCategories = [
    'Жильё',
    'Питание',
    'Транспорт',
    'Связь и интернет',
    'Одежда и обувь',
    'Здоровье',
    'Образование',
    'Развлечения и досуг',
    'Подарки и праздники',
    'Налоги и сборы',
    'Финансовые обязательства',
  ];

  // Income categories
  const incomeCategories = [
    'Зарплата',
    'Доп. доход',
    'Дивиденды',
  ];

  console.log('Seeding expense categories...');
  await prisma.category.createMany({
    data: expenseCategories.map((name) => ({
      name,
      type: 'expense',
      isDefault: true,
    })),
  });

  console.log('Seeding income categories...');
  await prisma.category.createMany({
    data: incomeCategories.map((name) => ({
      name,
      type: 'income',
      isDefault: true,
    })),
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
