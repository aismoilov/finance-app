import { AiAssistantService } from './ai-assistant.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class AiAssistantController {
    private readonly aiAssistantService;
    constructor(aiAssistantService: AiAssistantService);
    sendMessage(req: any, dto: SendMessageDto): Promise<{
        sessionId: any;
        message: {
            role: string;
            content: string;
            createdAt: Date;
            id: number;
            sessionId: number;
        };
    }>;
    getSessions(req: any): Promise<({
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
    getSession(req: any, id: string): Promise<{
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
    deleteSession(req: any, id: string): Promise<void>;
}
