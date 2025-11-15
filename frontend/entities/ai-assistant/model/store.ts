import { defineStore } from 'pinia';
import { aiAssistantApi } from '../api/aiAssistantApi';
import type { ChatSession, SendMessageDto } from './types';

export const useAiAssistantStore = defineStore('aiAssistant', {
  state: () => ({
    sessions: [] as ChatSession[],
    currentSession: null as ChatSession | null,
    loading: false,
    sending: false,
  }),

  actions: {
    async fetchSessions() {
      this.loading = true;
      try {
        const response = await aiAssistantApi.getSessions();
        const raw: any = response?.data ?? response;
        if (Array.isArray(raw)) {
          this.sessions = raw;
        } else if (Array.isArray(raw?.data)) {
          this.sessions = raw.data;
        } else {
          this.sessions = [];
        }
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchSession(id: number) {
      this.loading = true;
      try {
        const response = await aiAssistantApi.getSession(id);
        this.currentSession = response.data;
      } catch (error) {
        console.error('Failed to fetch session:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async sendMessage(data: SendMessageDto) {
      this.sending = true;
      try {
        // Добавляем сообщение пользователя сразу в UI
        if (this.currentSession) {
          this.currentSession.messages.push({
            id: Date.now(), // временный ID
            sessionId: this.currentSession.id,
            role: 'user',
            content: data.message,
            createdAt: new Date().toISOString(),
          });
        }

        const response = await aiAssistantApi.sendMessage(data);
        const result = response.data;

        if (this.currentSession && this.currentSession.id === result.sessionId) {
          // Добавляем только ответ AI
          this.currentSession.messages.push(result.message);
        } else {
          // Если новая сессия, загружаем её полностью
          await this.fetchSession(result.sessionId);
        }

        await this.fetchSessions();
        return result;
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to send message';
      } finally {
        this.sending = false;
      }
    },

    async deleteSession(id: number) {
      try {
        await aiAssistantApi.deleteSession(id);
        this.sessions = this.sessions.filter((s) => s.id !== id);
        if (this.currentSession?.id === id) {
          this.currentSession = null;
        }
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to delete session';
      }
    },

    setCurrentSession(session: ChatSession | null) {
      this.currentSession = session;
    },
  },
});
