import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number, type?: string) {
    const where: any = {
      OR: [{ userId }, { isDefault: true }],
    };

    if (type) {
      where.type = type;
    }

    return this.prisma.category.findMany({
      where,
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });
  }

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId,
      },
    });
  }

  async update(
    userId: number,
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.isDefault) {
      throw new ForbiddenException('Cannot update default category');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Not allowed to update this category');
    }

    return this.prisma.category.update({
      where: { id: categoryId },
      data: updateCategoryDto,
    });
  }

  async delete(userId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.isDefault) {
      throw new ForbiddenException('Cannot delete default category');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Not allowed to delete this category');
    }

    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
