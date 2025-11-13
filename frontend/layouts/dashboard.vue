<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="overflow: auto; height: 100vh; position: fixed; left: 0; top: 0; bottom: 0;">
      <div class="logo">
        <span v-if="!collapsed">Finance App</span>
        <span v-else>FA</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="finances" @click="navigateTo('/dashboard/finances')">
          <DollarOutlined />
          <span>Финансы</span>
        </a-menu-item>
        <a-menu-item key="categories" @click="navigateTo('/dashboard/categories')">
          <AppstoreOutlined />
          <span>Категории</span>
        </a-menu-item>
        <a-menu-item key="profile" @click="navigateTo('/dashboard/profile')">
          <UserOutlined />
          <span>Профиль</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px', transition: 'margin-left 0.2s' }">
      <a-layout-header style="background: #fff; padding: 0 24px; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="margin: 0;">{{ pageTitle }}</h2>
        <a-button danger @click="handleLogout">
          <LogoutOutlined />
          Выйти
        </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 24px;">
        <div style="padding: 24px; background: #fff; min-height: 360px;">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DollarOutlined, AppstoreOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '../entities/user';

const userStore = useUserStore();
const collapsed = ref(false);
const route = useRoute();

const selectedKeys = computed(() => {
  const path = route.path;
  if (path.includes('finances')) return ['finances'];
  if (path.includes('categories')) return ['categories'];
  if (path.includes('profile')) return ['profile'];
  return ['finances'];
});

const pageTitle = computed(() => {
  const path = route.path;
  if (path.includes('finances')) return 'Финансы';
  if (path.includes('categories')) return 'Категории';
  if (path.includes('profile')) return 'Профиль';
  return 'Dashboard';
});

const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>
