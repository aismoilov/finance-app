import api from '../../../shared/api/client';
import type { ChatSession, SendMessageDto, SendMessageResponse } from '../model/types';

export const aiAssistantApi = {
  sendMessage: (data: SendMessageDto) =>
    api.post<SendMessageResponse>('/ai-assistant/message', data),

  getSessions: () => api.get<ChatSession[]>('/ai-assistant/sessions'),

  getSession: (id: number) => api.get<ChatSession>(`/ai-assistant/sessions/${id}`),

  deleteSession: (id: number) => api.delete(`/ai-assistant/sessions/${id}`),
};
