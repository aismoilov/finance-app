import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(req: any, type?: string): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        userId: number | null;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
    }[]>;
    create(req: any, createCategoryDto: CreateCategoryDto): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        userId: number | null;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
    }>;
    update(req: any, id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        userId: number | null;
        updatedAt: Date;
        type: string;
        isDefault: boolean;
    }>;
    delete(req: any, id: string): Promise<void>;
}
