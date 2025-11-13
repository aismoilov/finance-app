export declare class CreateTransactionDto {
    amount: number;
    description?: string;
    type: string;
    categoryId: number;
    date?: string;
}
export declare class UpdateTransactionDto {
    amount?: number;
    description?: string;
    categoryId?: number;
    date?: string;
}
