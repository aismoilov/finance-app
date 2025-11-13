import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(req: any, type?: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }[]>;
    create(req: any, createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }>;
    update(req: any, id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
        userId: number | null;
    }>;
    delete(req: any, id: string): Promise<void>;
}
