<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { defineModel } from 'vue';

defineProps<{
  title: string
  errors: Record<string, string>
  readonlyFields?: boolean
}>()

const _emit = defineEmits<{
  (e: 'submit' | 'cancel'): void
}>()

const modelValue = defineModel<{
  name: string
  email: string
  ra: string
  cpf: string
}>({
  required: true,
  default: () => ({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  }),
})

</script>

<template>
  <div class="form-wrapper">
    <div class="mb-6">
      <h1 class="text-h5 font-weight-bold mb-2">{{ title }}</h1>
      <v-divider />
    </div>

    <v-form class="mb-6">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="modelValue.name"
            :error-messages="errors.name"
            label="Nome *"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="modelValue.email"
            :error-messages="errors.email"
            label="E-mail *"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="modelValue.ra"
            :disabled="readonlyFields"
            :error-messages="errors.ra"
            label="RA *"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="modelValue.cpf"
            v-maska="'###.###.###-##'"
            :disabled="readonlyFields"
            :error-messages="errors.cpf"
            label="CPF *"
          />
        </v-col>
      </v-row>
    </v-form>

    <div class="d-flex justify-end">
      <v-btn class="me-2" variant="outlined" @click="$emit('cancel')">Cancelar</v-btn>
      <v-btn color="primary" @click="$emit('submit')">Salvar</v-btn>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 100%;
  padding: 48px 32px;
}
</style>
