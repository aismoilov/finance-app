<template>
  <div class="auth-container">
    <a-card class="auth-card" title="Регистрация">
      <RegisterForm @success="handleSuccess" />

      <a-divider />

      <div class="auth-footer">
        <span>Уже есть аккаунт?</span>
        <NuxtLink to="/login">Войти</NuxtLink>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { RegisterForm } from '../features/auth';

definePageMeta({
  layout: false,
});

const handleSuccess = () => {
  navigateTo('/dashboard/finances');
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-footer {
  text-align: center;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.auth-footer a {
  color: #1890ff;
  font-weight: 500;
}
</style>
