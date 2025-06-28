<template>
  <v-container class="pa-4 fill-height flex flex-column">
    <section class="mb-4">
      <h1 class="text-h5 font-weight-bold">Lista de Alunos</h1>
      <p class="text-subtitle-1 text-grey-darken-1">
        Gerencie os alunos cadastrados na plataforma.
      </p>
    </section>
    <section class="mb-4">
      <v-row class="d-flex justify-space-between align-center">
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
    <section class="mb-4">
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
  // TODO: Implementar lógica de edição
  }
  function onDelete (item: Record<string, any>) {
    console.log('Excluir aluno:', item)
  // TODO: Implementar lógica de exclusão
  }
</script>
