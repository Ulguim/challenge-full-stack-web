<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { useApiFetch } from '@/services/http'

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  ra: z.string().min(1, 'RA obrigatório'),
  cpf: z
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido')
    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length >= 11
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')

    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length <= 14
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '')
      return !!Number(replacedDoc)
    }, 'CPF/CNPJ deve conter apenas números.'),
})

const route = useRoute() as ReturnType<typeof useRoute> & {
  params: { id?: string }
}
const router = useRouter()

const studentId = route.params.id ? String(route.params.id) : null

const form = ref({
  name: '',
  email: '',
  ra: '',
  cpf: '',
})

const errors = ref<Record<string, string>>({})

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref<'success' | 'error'>('success')

function showToast (message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

onMounted(async () => {
  if (studentId) {
    const { data } = await useApiFetch(`/students/${studentId}`, {
      method: 'GET',
    })
    if (data.value) {
      form.value = {
        name: data.value.name,
        email: data.value.email,
        ra: data.value.ra,
        cpf: data.value.cpf,
      }
    }
  }
})

function validateForm () {
  const result = schema.safeParse(form.value)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string>
    showToast('Dados Inválidos', 'error')
    return false
  }
  errors.value = {}
  return true
}

async function saveStudent () {
  if (!validateForm()) return

  const url = studentId ? `/students/${studentId}` : '/students'
  const method = studentId ? 'PUT' : 'POST'
  const { error } = await useApiFetch(url, {
    method,
    body: JSON.stringify({
      name: form.value.name,
      email: form.value.email,
      ra: form.value.ra,
      cpf: form.value.cpf,
    }),
  })

  if (error.value) {
    console.error('Failed to save student:', error.value)
    showToast('Erro ao salvar estudante', 'error')
    return
  }

  showToast('Cadastrado com sucesso', 'success')
  router.push('/students')
}

function cancel () {
  router.push('/students')
}

definePage({
  meta: {
    requiresAuth: true,
    layout: 'AuthenticatedLayout',
  },
})
</script>

<template>
  <v-container class="pa-0 fill-height d-flex flex-column align-center">

    <StudentForm
      v-model="form"
      :errors="errors"
      :readonly-fields="false"
      :title="'Cadastrar Aluno'"
      @cancel="cancel"
      @submit="saveStudent"
    />

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top"
      timeout="3000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.form-wrapper {
  width: 100%;
  padding: 48px 32px;
}
</style>
