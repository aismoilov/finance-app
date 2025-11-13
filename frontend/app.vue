<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './entities/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.initAuth();
});
</script>

