<template>
  <div></div>
</template>

<script setup lang="ts">
if (process.client) {
  const token = localStorage.getItem('token');
  const redirectPath = token ? '/dashboard/finances' : '/login';
  window.location.href = redirectPath;
}
</script>
