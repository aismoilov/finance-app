export interface ChatMessage {
  id: number;
  sessionId: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: number;
  userId: number;
  title: string | null;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageDto {
  message: string;
  sessionId?: number;
}

export interface SendMessageResponse {
  sessionId: number;
  message: ChatMessage;
}
