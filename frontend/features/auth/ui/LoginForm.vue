<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/entities/user';
import { message } from '../../../shared/lib';

const router = useRouter();
const userStore = useUserStore();

const formState = reactive({
  email: '',
  password: '',
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    await userStore.login({
      email: formState.email,
      password: formState.password,
    });
    message.success('Успешный вход!');
    router.push('/dashboard/finances');
  } catch (error: any) {
    message.error(error || 'Ошибка входа');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <a-card title="Вход" style="max-width: 400px; margin: 50px auto">
    <a-form :model="formState" @finish="handleSubmit" layout="vertical">
      <a-form-item
        label="Email"
        name="email"
        :rules="[
          { required: true, message: 'Введите email!' },
          { type: 'email', message: 'Некорректный email' },
        ]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Пароль"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" block> Войти </a-button>
      </a-form-item>

      <div style="text-align: center">
        Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
      </div>
    </a-form>
  </a-card>
</template>
