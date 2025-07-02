<template>
  <v-navigation-drawer
    v-model="internalValue"
    app
    :permanent="!smAndDown"
    style="z-index: 1000"
    :temporary="smAndDown"
  >
    <v-row v-if="smAndDown" class="ma-0 pa-2" justify="end">
      <v-btn icon @click.stop="internalValue = false">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-row>

    <v-container class="pa-5">
      <v-list-item class="px-4">
        <v-icon class="me-2">mdi-school</v-icon>
        <div>
          <div class="font-weight-bold">Grupo A</div>
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
        © 2025 Grupo A
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
const { smAndDown } = useDisplay()

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const internalValue = ref(smAndDown.value ? false : props.modelValue)

watch(() => props.modelValue, val => {
  internalValue.value = val
})

watch(internalValue, val => {
  emit('update:modelValue', val)
})

</script>
