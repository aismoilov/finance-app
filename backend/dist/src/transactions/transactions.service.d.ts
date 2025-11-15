import { PrismaService } from '../prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number, type?: string, month?: string, year?: string): Promise<({
        category: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        date: Date;
        categoryId: number;
    })[]>;
    findOne(userId: number, transactionId: number): Promise<{
        category: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        date: Date;
        categoryId: number;
    }>;
    create(userId: number, createTransactionDto: CreateTransactionDto): Promise<{
        category: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        date: Date;
        categoryId: number;
    }>;
    update(userId: number, transactionId: number, updateTransactionDto: UpdateTransactionDto): Promise<{
        category: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            type: string;
            isDefault: boolean;
            userId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        type: string;
        userId: number;
        amount: number;
        description: string | null;
        date: Date;
        categoryId: number;
    }>;
    delete(userId: number, transactionId: number): Promise<void>;
    getStatistics(userId: number, month?: string, year?: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
}
