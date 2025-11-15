import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number, type?: string, month?: string, year?: string) {
    const where: any = { userId };

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

  async findOne(userId: number, transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException('Not allowed to access this transaction');
    }

    return transaction;
  }

  async create(userId: number, createTransactionDto: CreateTransactionDto) {
    const { categoryId, date, ...rest } = createTransactionDto;

    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        OR: [{ userId }, { isDefault: true }],
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
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

  async update(userId: number, transactionId: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException('Not allowed to update this transaction');
    }

    const { categoryId, date, ...rest } = updateTransactionDto;
    const updateData: any = { ...rest };

    if (categoryId) {
      const category = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
          OR: [{ userId }, { isDefault: true }],
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
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

  async delete(userId: number, transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException('Not allowed to delete this transaction');
    }

    await this.prisma.transaction.delete({
      where: { id: transactionId },
    });
  }

  async getStatistics(userId: number, month?: string, year?: string) {
    const where: any = { userId };

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
}
