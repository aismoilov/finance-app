import { PrismaService } from '../prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number, type?: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }[]>;
    create(userId: number, createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }>;
    update(userId: number, categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }>;
    delete(userId: number, categoryId: number): Promise<void>;
}
