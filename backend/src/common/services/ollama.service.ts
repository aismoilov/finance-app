import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OllamaService {
  private readonly ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  private readonly model = 'qwen2:7b-instruct';

  async generateResponse(messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const systemPrompt = {
        role: 'system',
        content:
          'Ты финансовый помощник. Помогай пользователям управлять их финансами: давай советы по бюджетированию, накоплениям, инвестициям и экономии.\n\n' +
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
    } catch (error) {
      console.error('Ollama API error:', error.message);
      throw new HttpException(
        'Не удалось получить ответ от AI. Убедитесь что Ollama запущена.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
