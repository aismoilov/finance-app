export declare class OllamaService {
    private readonly ollamaUrl;
    private readonly model;
    generateResponse(messages: Array<{
        role: string;
        content: string;
    }>): Promise<string>;
}
