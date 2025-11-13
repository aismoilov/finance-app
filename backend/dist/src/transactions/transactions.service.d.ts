import { PrismaService } from '../prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number, type?: string, month?: string, year?: string): Promise<({
        category: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        categoryId: number;
        date: Date;
    })[]>;
    findOne(userId: number, transactionId: number): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        categoryId: number;
        date: Date;
    }>;
    create(userId: number, createTransactionDto: CreateTransactionDto): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        categoryId: number;
        date: Date;
    }>;
    update(userId: number, transactionId: number, updateTransactionDto: UpdateTransactionDto): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        categoryId: number;
        date: Date;
    }>;
    delete(userId: number, transactionId: number): Promise<void>;
    getStatistics(userId: number, month?: string, year?: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
}
