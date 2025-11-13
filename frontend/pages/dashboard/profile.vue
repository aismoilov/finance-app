<template>
  <NuxtLayout name="dashboard">
    <div class="profile-page">
      <a-card title="Профиль пользователя">
        <a-descriptions bordered :column="1">
          <a-descriptions-item label="Имя">
            {{ user?.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Email">
            {{ user?.email }}
          </a-descriptions-item>
        </a-descriptions>

        <a-divider />

        <a-button type="primary" @click="showEditModal">
          <EditOutlined />
          Редактировать профиль
        </a-button>
      </a-card>

      <a-modal
        v-model:open="modalVisible"
        title="Редактировать профиль"
        @ok="handleSave"
        :confirm-loading="loading"
      >
        <a-form layout="vertical">
          <a-form-item label="Имя" required>
            <a-input v-model:value="profileForm.name" size="large" />
          </a-form-item>
          <a-form-item label="Email" required>
            <a-input v-model:value="profileForm.email" size="large" type="email" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '../../entities/user';
import { message } from '../../shared/lib';

const userStore = useUserStore();

const modalVisible = ref(false);
const loading = ref(false);

const user = computed(() => userStore.user);

const profileForm = ref({
  name: '',
  email: '',
});

const showEditModal = () => {
  profileForm.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
  };
  modalVisible.value = true;
};

const handleSave = async () => {
  loading.value = true;
  try {
    message.success('Профиль обновлен');
    modalVisible.value = false;
  } catch (error: any) {
    message.error('Ошибка обновления профиля');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
