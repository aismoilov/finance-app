<template>
  <div class="chat-container">
    <a-card :bordered="false" class="chat-card">
      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message', msg.role === 'user' ? 'message-user' : 'message-assistant']"
        >
          <div class="message-avatar">
            <UserOutlined v-if="msg.role === 'user'" />
            <RobotOutlined v-else />
          </div>
          <div class="message-content">
            <div class="message-text" v-html="formatMessage(msg.content)"></div>
            <div class="message-time">{{ formatTime(msg.createdAt) }}</div>
          </div>
        </div>
        <div v-if="sending" class="message message-assistant">
          <div class="message-avatar">
            <RobotOutlined />
          </div>
          <div class="message-content">
            <a-spin size="small" /> <span style="margin-left: 8px">Думаю...</span>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <a-textarea
          v-model:value="inputMessage"
          placeholder="Спросите совет по управлению финансами..."
          :rows="3"
          :disabled="sending"
          @keydown.ctrl.enter="handleSend"
        />
        <a-button
          type="primary"
          :loading="sending"
          :disabled="!inputMessage.trim()"
          @click="handleSend"
          block
        >
          <SendOutlined />
          Отправить
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { UserOutlined, RobotOutlined, SendOutlined } from '@ant-design/icons-vue';
import type { ChatMessage } from '../entities/ai-assistant';
import dayjs from 'dayjs';

const props = defineProps<{
  messages: ChatMessage[];
  sending?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string];
}>();

const inputMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

const formatTime = (date: string) => {
  return dayjs(date).format('HH:mm');
};

const formatMessage = (text: string) => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // **bold**
    .replace(/\n(\d+)\.\s/g, '<br/>$1. ') // numbered lists
    .replace(/\n•\s/g, '<br/>• ') // bullet lists
    .replace(/\n-\s/g, '<br/>• ') // dash lists to bullets
    .replace(/\n\n/g, '<br/><br/>') // paragraphs
    .replace(/\n/g, '<br/>'); // line breaks
};

const handleSend = () => {
  if (!inputMessage.value.trim() || props.sending) return;
  emit('send', inputMessage.value.trim());
  inputMessage.value = '';
};

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  },
);
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  min-height: 400px;
}

.chat-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;
  max-height: calc(100vh - 350px);
}

.message {
  display: flex;
  gap: 12px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message-user .message-avatar {
  background: #1890ff;
  color: white;
}

.message-assistant .message-avatar {
  background: #52c41a;
  color: white;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-user .message-content {
  align-items: flex-end;
}

.message-text {
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.6;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  white-space: pre-wrap;
}

.message-text strong {
  font-weight: 600;
  color: #1890ff;
}

.message-user .message-text strong {
  color: #fff;
  font-weight: 700;
}

.message-user .message-text {
  background: #1890ff;
  color: white;
}

.message-time {
  font-size: 12px;
  color: #999;
  padding: 0 8px;
}

.chat-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 768px) {
  .chat-container {
    height: calc(100vh - 350px);
    min-height: 300px;
  }

  .chat-messages {
    padding: 12px;
    gap: 12px;
    max-height: calc(100vh - 500px);
  }

  .message-avatar {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .message-content {
    max-width: 80%;
  }

  .message-text {
    padding: 10px 14px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .chat-container {
    height: auto;
    min-height: 250px;
  }

  .chat-messages {
    padding: 8px;
    gap: 10px;
    max-height: 400px;
  }

  .message-avatar {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .message-content {
    max-width: 85%;
  }

  .message-text {
    padding: 8px 12px;
    font-size: 13px;
  }

  .message-time {
    font-size: 11px;
  }
}
</style>
