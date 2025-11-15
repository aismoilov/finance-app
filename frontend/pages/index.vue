<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    () => {
      const token = process.client ? localStorage.getItem('token') : null;
      return navigateTo(token ? '/dashboard/finances' : '/login');
    },
  ],
});
</script>
