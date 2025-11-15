"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const ollama_service_1 = require("../common/services/ollama.service");
let AiAssistantService = class AiAssistantService {
    constructor(prisma, ollama) {
        this.prisma = prisma;
        this.ollama = ollama;
    }
    async sendMessage(userId, dto) {
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
    async getSessions(userId) {
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
    async getSession(userId, sessionId) {
        return this.prisma.chatSession.findFirst({
            where: { id: sessionId, userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
    }
    async deleteSession(userId, sessionId) {
        await this.prisma.chatSession.deleteMany({
            where: { id: sessionId, userId },
        });
    }
};
exports.AiAssistantService = AiAssistantService;
exports.AiAssistantService = AiAssistantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ollama_service_1.OllamaService])
], AiAssistantService);
//# sourceMappingURL=ai-assistant.service.js.map