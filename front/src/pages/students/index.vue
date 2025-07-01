<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6"> Confirmar Exclusão </v-card-title>
      <v-card-text>
        Você tem certeza que deseja excluir o aluno
        <strong>{{ selectedStudent?.name }}</strong>?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        <v-btn
          color="grey"
          variant="text"
          @click="dialog = false"
        >Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="pa-4 fill-height flex flex-column w-100">
    <section class="mb-4 w-100">
      <v-card class="pa-4" elevation="1" rounded="lg">
        <v-row justify="space-between" no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filtro"
              class="rounded-lg"
              density="comfortable"
              hide-details
              placeholder="Digite sua busca"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
            />
          </v-col>

          <v-col
            :class="{ 'd-flex justify-center pt-4	': smAndDown }"
            cols="12"
            md="auto"
          >
            <v-btn
              class="font-weight-medium"
              :class="{ 'w-100 ': smAndDown, 'text-white': true }"
              color="primary"
              prepend-icon="mdi-plus"
              @click="onRegister"
            >
              Cadastrar Aluno
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </section>
    <section class="mb-4 d-flex w-100">
      <v-row class="d-flex justify-space-around align-center">
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          md="4"
          sm="6"
        >
          <InfoIcon
            :color-class="card.colorClass"
            :icon="card.icon"
            :icon-color="card.iconColor"
            :label="card.label"
            :value="card.value"
          />
        </v-col>
      </v-row>
    </section>
    <section class="mb-4 w-100">
      <DataTable
        :data-list="data ?? []"
        :loading="isFetching"
        :row-keys="rowKeys"
        @delete="onDelete"
        @edit="onEdit"
      />
    </section>
  </v-container>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    location="top"
    timeout="3000"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import type { Student } from '@/types/student.type';
import { debouncedRef } from '@vueuse/core';
import { useRouter } from 'vue-router';

import { useDisplay } from 'vuetify';
import { useApiFetch } from '@/services/http';
const { smAndDown } = useDisplay();

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');

function showToast (message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
}
const dialog = ref(false);
const selectedStudent = ref<Student | null>(null);

const filtro = ref('');
const filtroDebounced = debouncedRef(filtro, 300);
const query = computed(() => ({ search: filtroDebounced.value }));

const {
  data: rawData,
  isFetching,
  execute,
} = useApiFetch<Student[]>('/students', { method: 'GET' }, query);

async function deleteStudent (id: number) {
  try {
    await useApiFetch(`/students/${id}`, { method: 'DELETE' });
    console.log(`Aluno com ID ${id} deletado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar aluno com ID ${id}:`, error);
  }
}

const data = computed(() => rawData.value ?? []);

const router = useRouter();
const rowKeys = [
  { id: 'ra', name: 'RA' },
  { id: 'name', name: 'Nome' },
  { id: 'email', name: 'E-mail' },
  { id: 'cpf', name: 'CPF' },
];

const cards = computed(() => [
  {
    label: 'Total de Alunos Ativos',
    value: data.value.filter(s => !s.deletedAt).length ?? 0,
    icon: 'mdi-account-multiple',
    iconColor: 'primary',
    colorClass: 'text-primary',
  },
  {
    label: 'Inativos',
    value: data.value.filter(s => s.deletedAt !== null).length ?? 0,
    icon: 'mdi-account-off',
    iconColor: 'error',
    colorClass: 'text-error',
  },
  {
    label: 'Cadastrados 24h',
    value:
      data.value.filter(
        s => Date.now() - new Date(s.createdAt).getTime() < 86_400_000,
      ).length ?? 0,
    icon: 'mdi-account-plus',
    iconColor: 'success',
    colorClass: 'text-success',
  },
]);

function onEdit (item: Record<string, any>) {
  console.log('Editar aluno:', item);

  const studentId = item.id;
  router.push(`/students/${studentId}`);
}

function onDelete (item: Record<string, any>) {
  selectedStudent.value = item as Student;
  dialog.value = true;
}

function onRegister () {
  router.push('/students/register');
}

async function confirmDelete () {
  if (!selectedStudent.value) return;

  try {
    await deleteStudent(selectedStudent.value.id);
    showToast('Aluno deletado com sucesso', 'success');
    dialog.value = false;
    await execute();
  } catch (error) {
    console.error('Erro ao confirmar exclusão:', error);
    showToast('Erro ao excluir aluno', 'error');
  }
}
definePage({
  meta: {
    requiresAuth: true,
    layout: 'AuthenticatedLayout',
  },
});
</script>
