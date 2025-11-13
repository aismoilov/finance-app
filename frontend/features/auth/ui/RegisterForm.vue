<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../entities/user';
import { message } from '../../../shared/lib';

const router = useRouter();
const userStore = useUserStore();

const formState = reactive({
  email: '',
  password: '',
  name: '',
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    await userStore.register({
      email: formState.email,
      password: formState.password,
      name: formState.name,
    });
    message.success('Регистрация успешна!');
    router.push('/dashboard/finances');
  } catch (error: any) {
    message.error(error || 'Ошибка регистрации');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <a-card title="Регистрация" style="max-width: 400px; margin: 50px auto;">
    <a-form :model="formState" @finish="handleSubmit" layout="vertical">
      <a-form-item
        label="Имя"
        name="name"
        :rules="[{ required: true, message: 'Введите имя!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Введите email!' }, { type: 'email', message: 'Некорректный email' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Пароль"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль!' }, { min: 6, message: 'Минимум 6 символов' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" block>
          Зарегистрироваться
        </a-button>
      </a-form-item>

      <div style="text-align: center;">
        Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
      </div>
    </a-form>
  </a-card>
</template>
