<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.replace('/students')
})
definePage({
  meta: {
    requiresAuth: true,
    layout: 'AuthenticatedLayout',
  },
})
</script>

<template>
  <div />
</template>
