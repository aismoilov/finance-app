<template>
  <NuxtLayout name="dashboard">
    <div class="ai-assistant-page">
      <h1>
        <RobotOutlined />
        Финансовый помощник
      </h1>
      <p style="color: #666; margin-bottom: 24px">
        Задавайте вопросы по управлению финансами, бюджетированию и накоплениям
      </p>

      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="24" :md="8" :lg="6">
          <a-card title="Сессии" :bordered="false" class="sessions-card">
            <a-button type="primary" block @click="startNewSession" style="margin-bottom: 12px">
              <PlusOutlined />
              Новая сессия
            </a-button>
            <a-list
              :data-source="aiStore.sessions"
              :loading="aiStore.loading"
              size="small"
              class="sessions-list"
            >
              <template #renderItem="{ item }">
                <a-list-item
                  :class="{ 'session-active': item.id === aiStore.currentSession?.id }"
                  class="session-item"
                  @click="selectSession(item)"
                >
                  <a-list-item-meta>
                    <template #title>
                      <div class="session-title">{{ item.title || 'Новая беседа' }}</div>
                    </template>
                    <template #description>
                      <div class="session-date">{{ formatDate(item.updatedAt) }}</div>
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <a-popconfirm
                      title="Удалить сессию?"
                      ok-text="Да"
                      cancel-text="Нет"
                      @confirm.stop="handleDeleteSession(item.id)"
                    >
                      <a-button type="text" danger size="small" @click.stop>
                        <DeleteOutlined />
                      </a-button>
                    </a-popconfirm>
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-col>

        <a-col :xs="24" :sm="24" :md="16" :lg="18">
          <AiAssistantChat
            :messages="aiStore.currentSession?.messages || []"
            :sending="aiStore.sending"
            @send="handleSendMessage"
          />
        </a-col>
      </a-row>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAiAssistantStore } from '~/entities/ai-assistant';
import { AiAssistantChat } from '../../widgets';
import { RobotOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { message } from '../../shared/lib';
import dayjs from 'dayjs';
import type { ChatSession } from '~/entities/ai-assistant';

const aiStore = useAiAssistantStore();

const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
};

const startNewSession = () => {
  aiStore.setCurrentSession(null);
};

const selectSession = async (session: ChatSession) => {
  try {
    await aiStore.fetchSession(session.id);
  } catch (error: any) {
    message.error(error || 'Ошибка загрузки сессии');
  }
};

const handleSendMessage = async (msg: string) => {
  try {
    await aiStore.sendMessage({
      message: msg,
      sessionId: aiStore.currentSession?.id,
    });
  } catch (error: any) {
    message.error(error || 'Ошибка отправки сообщения');
  }
};

const handleDeleteSession = async (id: number) => {
  try {
    await aiStore.deleteSession(id);
    message.success('Сессия удалена');
  } catch (error: any) {
    message.error(error || 'Ошибка удаления сессии');
  }
};

onMounted(async () => {
  await aiStore.fetchSessions();
});
</script>

<style scoped>
.ai-assistant-page h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
}

.sessions-card {
  height: 100%;
  max-height: calc(100vh - 250px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sessions-list {
  overflow-y: auto;
  flex: 1;
}

.session-item {
  cursor: pointer;
  transition: all 0.3s;
}

.session-item:hover {
  background: #f5f5f5;
}

.session-active {
  background: #e6f7ff;
  border-left: 3px solid #1890ff;
}

.session-title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.session-date {
  font-size: 12px;
}

@media (max-width: 768px) {
  .ai-assistant-page h1 {
    font-size: 22px;
  }

  .sessions-card {
    max-height: 300px;
    margin-bottom: 16px;
  }
}

@media (max-width: 576px) {
  .ai-assistant-page h1 {
    font-size: 20px;
  }

  .sessions-card {
    max-height: 250px;
  }
}
</style>
