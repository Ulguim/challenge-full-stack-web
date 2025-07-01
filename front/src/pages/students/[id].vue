<script setup lang="ts">
import type { Student } from '@/types/student.type';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import StudentForm from '@/components/StudentForm.vue';
import { useApiFetch } from '@/services/http';

const route = useRoute();
const router = useRouter();

const studentId
  = 'id' in route.params && route.params.id ? String(route.params.id) : null;

const form = ref<Omit<Student, 'id'>>({
  name: '',
  email: '',
  ra: '',
  cpf: '',
});

const errors = ref<Record<string, string>>({});
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  ra: z.string().min(1, 'RA obrigatório'),
  cpf: z
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine(doc => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF/CNPJ deve conter apenas números.'),
});

function showToast (message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
}

function validateForm () {
  const result = schema.safeParse(form.value);
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string>;
    showToast('Dados inválidos', 'error');
    return false;
  }
  errors.value = {};
  return true;
}

async function saveStudent () {
  if (!validateForm()) return;

  const { error } = await useApiFetch(`/students/${studentId}`, {
    method: 'PUT',
    body: JSON.stringify(form.value),
  });

  if (error.value) {
    showToast('Erro ao atualizar estudante', 'error');
    return;
  }

  showToast('Student updated successfully.', 'success');
  router.push('/students');
}

function cancel () {
  router.push('/students');
}

onMounted(async () => {
  if (studentId) {
    const { data, error } = await useApiFetch(`/students/${studentId}`, {
      method: 'GET',
    });
    if (error.value || !data.value) {
      showToast('Erro ao carregar estudante', 'error');
      return;
    }

    form.value = {
      name: data.value.name,
      email: data.value.email,
      ra: data.value.ra,
      cpf: data.value.cpf,
    };
  }
});

definePage({
  meta: {
    requiresAuth: true,
    layout: 'AuthenticatedLayout',
  },
});
</script>

<template>
  <v-container class="pa-0 fill-height d-flex flex-column align-center">
    <StudentForm
      v-model="form"
      :errors="errors"
      :readonly-fields="true"
      :title="'Editar Aluno'"
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
