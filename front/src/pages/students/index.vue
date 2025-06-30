<template>
  <v-container class="pa-4 fill-height flex flex-column w-100">
    <section class="mb-4 w-100">
      <v-card class="pa-4" elevation="1" rounded="lg">
        <v-row justify="space-between" no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              class="rounded-lg"
              density="comfortable"
              hide-details
              placeholder="Digite sua busca"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="auto">
            <v-btn
              class="text-white font-weight-medium"
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
    <section class="mb-4  d-flex w-100 ">
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
        :data-list="alunos"
        :row-keys="rowKeys"
        @delete="onDelete"
        @edit="onEdit"
      />
    </section>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
import { useRouter } from 'vue-router'

  const router = useRouter()
  const alunos = [
    {
      id: 'RA001234',
      name: 'João Silva Santos',
      email: 'joao.silva@universidade.edu',
      cpf: '123.456.789-00',
    },
    {
      id: 'RA001235',
      name: 'Maria Oliveira Costa',
      email: 'maria.oliveira@universidade.edu',
      cpf: '987.654.321-00',
    },
    {
      id: 'RA001236',
      name: 'Pedro Henrique Lima',
      email: 'pedro.lima@universidade.edu',
      cpf: '456.789.123-00',
    },
  ]

  const rowKeys = [
    { id: 'id', name: 'RA' },
    { id: 'name', name: 'Nome' },
    { id: 'email', name: 'E-mail' },
    { id: 'cpf', name: 'CPF' },
  ]

  const cards = [
    {
      label: 'Total de Alunos',
      value: alunos.length,
      icon: 'mdi-account-group',
      iconColor: 'primary',
      colorClass: 'text-primary',
    },
    {
      label: 'Alunos Ativos',
      value: 2,
      icon: 'mdi-account-check',
      iconColor: 'success',
      colorClass: 'text-success',
    },
    {
      label: 'Alunos Inativos',
      value: 2,
      icon: 'mdi-account-off',
      iconColor: 'error',
      colorClass: 'text-error',
    },
  ]
  function onEdit (item: Record<string, any>) {
    console.log('Editar aluno:', item)

    const studentId = item.id
    router.push(`/students/${studentId}/edit`)
  }
  function onDelete (item: Record<string, any>) {
    console.log('Excluir aluno:', item)
  // TODO: Implementar lógica de exclusão
  }

  function onRegister () {
    console.log('Cadastrar novo aluno')
    router.push('/students/register')
  }

  const search = ref('')
</script>
