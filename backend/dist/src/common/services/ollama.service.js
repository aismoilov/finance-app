"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaService = void 0;
const common_1 = require("@nestjs/common");
let OllamaService = class OllamaService {
    constructor() {
        this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
        this.model = 'qwen2:7b-instruct';
    }
    async generateResponse(messages) {
        try {
            const systemPrompt = {
                role: 'system',
                content: 'Ты финансовый помощник. Помогай пользователям управлять их финансами: давай советы по бюджетированию, накоплениям, инвестициям и экономии.\n\n' +
                    'Форматируй ответы структурировано:\n' +
                    '- Используй нумерованные списки (1., 2., 3.) для последовательных шагов\n' +
                    '- Используй маркированные списки (•) для перечислений\n' +
                    '- Делай абзацы между разными мыслями\n' +
                    '- Выделяй ключевые моменты на отдельных строках\n' +
                    '- Пиши кратко и практично\n' +
                    '- Отвечай на русском языке\n\n' +
                    'Пример форматирования:\n' +
                    '**Главная рекомендация:**\n' +
                    'Описание рекомендации\n\n' +
                    '**Конкретные шаги:**\n' +
                    '1. Первый шаг с пояснением\n' +
                    '2. Второй шаг с пояснением\n\n' +
                    '**Дополнительно:**\n' +
                    '• Важный пункт один\n' +
                    '• Важный пункт два',
            };
            const response = await fetch(`${this.ollamaUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [systemPrompt, ...messages],
                    stream: false,
                }),
            });
            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.message.content;
        }
        catch (error) {
            console.error('Ollama API error:', error.message);
            throw new common_1.HttpException('Не удалось получить ответ от AI. Убедитесь что Ollama запущена.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
};
exports.OllamaService = OllamaService;
exports.OllamaService = OllamaService = __decorate([
    (0, common_1.Injectable)()
], OllamaService);
//# sourceMappingURL=ollama.service.js.map