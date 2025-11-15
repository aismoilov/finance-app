import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';

@Module({
  imports: [AuthModule, CategoriesModule, TransactionsModule, AiAssistantModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
