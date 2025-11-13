"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.category.deleteMany({
        where: { isDefault: true },
    });
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
//# sourceMappingURL=seed.js.map