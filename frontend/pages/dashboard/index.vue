<script setup>
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/dashboard/finances')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
