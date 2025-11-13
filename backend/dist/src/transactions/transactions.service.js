"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, type, month, year) {
        const where = { userId };
        if (type) {
            where.type = type;
        }
        if (month && year) {
            const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
            const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }
        return this.prisma.transaction.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(userId, transactionId) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                category: true,
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (transaction.userId !== userId) {
            throw new common_1.ForbiddenException('Not allowed to access this transaction');
        }
        return transaction;
    }
    async create(userId, createTransactionDto) {
        const { categoryId, date, ...rest } = createTransactionDto;
        const category = await this.prisma.category.findFirst({
            where: {
                id: categoryId,
                OR: [{ userId }, { isDefault: true }],
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return this.prisma.transaction.create({
            data: {
                ...rest,
                categoryId,
                userId,
                date: date ? new Date(date) : new Date(),
            },
            include: {
                category: true,
            },
        });
    }
    async update(userId, transactionId, updateTransactionDto) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (transaction.userId !== userId) {
            throw new common_1.ForbiddenException('Not allowed to update this transaction');
        }
        const { categoryId, date, ...rest } = updateTransactionDto;
        const updateData = { ...rest };
        if (categoryId) {
            const category = await this.prisma.category.findFirst({
                where: {
                    id: categoryId,
                    OR: [{ userId }, { isDefault: true }],
                },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            updateData.categoryId = categoryId;
        }
        if (date) {
            updateData.date = new Date(date);
        }
        return this.prisma.transaction.update({
            where: { id: transactionId },
            data: updateData,
            include: {
                category: true,
            },
        });
    }
    async delete(userId, transactionId) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (transaction.userId !== userId) {
            throw new common_1.ForbiddenException('Not allowed to delete this transaction');
        }
        await this.prisma.transaction.delete({
            where: { id: transactionId },
        });
    }
    async getStatistics(userId, month, year) {
        const where = { userId };
        if (month && year) {
            const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
            const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }
        const transactions = await this.prisma.transaction.findMany({
            where,
        });
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense,
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map