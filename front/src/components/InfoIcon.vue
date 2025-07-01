<template>
  <v-card
    class="pa-4 d-flex justify-space-between align-center h-100 w-100 "
    elevation="1"
    min-width="250"
    rounded="lg"
  >
    <div>
      <div class="text-subtitle-2 text-grey-darken-1">{{ label }}</div>
      <div :class="['text-h6', colorClass]">
        {{ value }}
      </div>
    </div>
    <v-icon :color="iconColor" size="36">{{ icon }}</v-icon>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    label: string
    value: string | number
    icon: string
    iconColor?: string
    colorClass?: string
  }

  const props = defineProps<Props>()

  const iconColor = computed(() => props.iconColor || 'primary')
  const colorClass = computed(() => props.colorClass || 'text-primary')
</script>
