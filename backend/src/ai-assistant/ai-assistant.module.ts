import { Module } from '@nestjs/common';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { PrismaService } from '../prisma.service';
import { OllamaService } from '../common/services/ollama.service';

@Module({
  controllers: [AiAssistantController],
  providers: [AiAssistantService, PrismaService, OllamaService],
})
export class AiAssistantModule {}
