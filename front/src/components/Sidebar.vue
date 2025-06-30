<template>
  <v-navigation-drawer app :model-value="modelValue" permanent @update:model-value="emit('update:modelValue', $event)">
    <v-container class="pa-5">
      <v-list-item class="px-4">
        <v-icon class="me-2">mdi-school</v-icon>
        <div>
          <div class="font-weight-bold">EduSystem</div>
          <div class="text-caption text-grey-darken-1">Gestão Acadêmica</div>
        </div>
      </v-list-item>
    </v-container>
    <v-divider class="my-2" />
    <v-container class="pa-5">
      <v-list-subheader>Menu Principal</v-list-subheader>

      <v-list density="compact" nav>
        <v-list-item
          href="/students"
          prepend-icon="mdi-account-group"
          title="Alunos"
        />
      </v-list>
    </v-container>
    <template #append>
      <div class="text-center text-caption mt-6 mb-2">
        © 2024 EduSystem
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

</script>
