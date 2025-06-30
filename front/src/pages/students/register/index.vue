<script setup lang="ts">
  import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid e-mail'),
    ra: z.string().min(1, 'RA is required'),
    cpf: z.string().min(1, 'CPF is required'),
  })

  const route = useRoute() as ReturnType<typeof useRoute> & { params: { id?: string } }
  const router = useRouter()

  const studentId = route.params.id ? String(route.params.id) : null

  const form = ref({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const errors = ref<Record<string, string>>({})

  onMounted(async () => {
    if (studentId) {
      const response = await fetch(`/api/students/${studentId}`)
      const data = await response.json()
      form.value = {
        name: data.name,
        email: data.email,
        ra: data.ra,
        cpf: data.cpf,
      }
    }
  })

  function validateForm () {
    const result = schema.safeParse(form.value)
    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors as Record<string, string>
      return false
    }
    errors.value = {}
    return true
  }

  async function saveStudent () {
    if (!validateForm()) return

    const url = studentId ? `/api/students/${studentId}` : '/api/students'
    const method = studentId ? 'PUT' : 'POST'
    console.log('Saving student:', form.value, 'to', url, 'with method', method)
    router.push('/students')
  }

  function cancel () {
    router.push('/students')
  }

  definePage({
    meta: {
      requiresAuth: false,
      layout: 'AuthenticatedLayout',
    },
  })
</script>

<template>
  <v-container max-width="md">
    <v-card>
      <v-card-title>Cadastro de Aluno</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.name"
              :error-messages="errors.name"
              label="Nome *"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              :error-messages="errors.email"
              label="E-mail *"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.ra"
              :disabled="!!studentId"
              :error-messages="errors.ra"
              label="RA (Registro Acadêmico) *"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.cpf"
              :disabled="!!studentId"
              :error-messages="errors.cpf"
              label="CPF *"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="outlined" @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" @click="saveStudent">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
