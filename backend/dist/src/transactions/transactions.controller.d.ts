import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAll(req: any, type?: string, month?: string, year?: string): Promise<({
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
    getStatistics(req: any, month?: string, year?: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
    findOne(req: any, id: string): Promise<{
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
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
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
    update(req: any, id: string, updateTransactionDto: UpdateTransactionDto): Promise<{
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
    delete(req: any, id: string): Promise<void>;
}
