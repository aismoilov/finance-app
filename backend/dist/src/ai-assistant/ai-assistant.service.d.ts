import { PrismaService } from '../prisma.service';
import { OllamaService } from '../common/services/ollama.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class AiAssistantService {
    private prisma;
    private ollama;
    constructor(prisma: PrismaService, ollama: OllamaService);
    sendMessage(userId: number, dto: SendMessageDto): Promise<{
        sessionId: any;
        message: {
            role: string;
            content: string;
            createdAt: Date;
            id: number;
            sessionId: number;
        };
    }>;
    getSessions(userId: number): Promise<({
        messages: {
            role: string;
            content: string;
            createdAt: Date;
            id: number;
            sessionId: number;
        }[];
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        title: string | null;
        updatedAt: Date;
    })[]>;
    getSession(userId: number, sessionId: number): Promise<{
        messages: {
            role: string;
            content: string;
            createdAt: Date;
            id: number;
            sessionId: number;
        }[];
    } & {
        createdAt: Date;
        id: number;
        userId: number;
        title: string | null;
        updatedAt: Date;
    }>;
    deleteSession(userId: number, sessionId: number): Promise<void>;
}
