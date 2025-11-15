import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OllamaService } from '../common/services/ollama.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class AiAssistantService {
  constructor(
    private prisma: PrismaService,
    private ollama: OllamaService,
  ) {}

  async sendMessage(userId: number, dto: SendMessageDto) {
    let session;

    if (dto.sessionId) {
      session = await this.prisma.chatSession.findFirst({
        where: { id: dto.sessionId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });
    }

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: {
          userId: userId,
          title: dto.message.substring(0, 50),
        },
        include: { messages: true },
      });
    }

    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: dto.message,
      },
    });

    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    conversationHistory.push({ role: 'user', content: dto.message });

    const aiResponse = await this.ollama.generateResponse(conversationHistory);

    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: aiResponse,
      },
    });

    return {
      sessionId: session.id,
      message: assistantMessage,
    };
  }

  async getSessions(userId: number) {
    return this.prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async getSession(userId: number, sessionId: number) {
    return this.prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async deleteSession(userId: number, sessionId: number) {
    await this.prisma.chatSession.deleteMany({
      where: { id: sessionId, userId },
    });
  }
}
