import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAll(req: any, type?: string, month?: string, year?: string): Promise<({
        category: {
            createdAt: Date;
            id: number;
            name: string;
            userId: number | null;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
        };
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        updatedAt: Date;
        amount: number;
        description: string | null;
        type: string;
        date: Date;
        categoryId: number;
    })[]>;
    getStatistics(req: any, month?: string, year?: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
    findOne(req: any, id: string): Promise<{
        category: {
            createdAt: Date;
            id: number;
            name: string;
            userId: number | null;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
        };
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        updatedAt: Date;
        amount: number;
        description: string | null;
        type: string;
        date: Date;
        categoryId: number;
    }>;
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
        category: {
            createdAt: Date;
            id: number;
            name: string;
            userId: number | null;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
        };
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        updatedAt: Date;
        amount: number;
        description: string | null;
        type: string;
        date: Date;
        categoryId: number;
    }>;
    update(req: any, id: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        category: {
            createdAt: Date;
            id: number;
            name: string;
            userId: number | null;
            updatedAt: Date;
            type: string;
            isDefault: boolean;
        };
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        updatedAt: Date;
        amount: number;
        description: string | null;
        type: string;
        date: Date;
        categoryId: number;
    }>;
    delete(req: any, id: string): Promise<void>;
}
