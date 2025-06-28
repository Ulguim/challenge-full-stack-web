<template>
  <v-data-table
    class="rounded-lg elevation-1"
    density="comfortable"
    :headers="headers"
    item-value="id"
    :items="dataList"
    width="100%"
  >
    <template #item.actions="{ item }">
      <v-btn
        class="me-2"
        color="primary"
        density="compact"
        size="small"
        variant="outlined"
        @click="() => onEdit(item)"
      >
        <v-icon icon="mdi-pencil" start /> Editar
      </v-btn>

      <v-btn
        color="error"
        density="compact"
        size="small"
        variant="outlined"
        @click="() => onDelete(item)"
      >
        <v-icon icon="mdi-delete" start /> Excluir
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { computed, defineEmits, defineProps } from 'vue';

  type RowKey = { id: string, name: string }
  type GenericItem = Record<string, any>

  const _props = defineProps<{
    dataList: GenericItem[]
    rowKeys: RowKey[]
  }>()

  const emit = defineEmits<{
    edit: [item: GenericItem]
    delete: [item: GenericItem]
  }>()

  const headers = computed(() => [
    ..._props.rowKeys.map(key => ({
      title: key.name,
      key: key.id,
      align: 'start' as const,
      sortable: true,
    })),
    {
      title: 'Ações',
      key: 'actions',
      align: 'center' as const,
      sortable: false,
    },
  ])

  function onEdit (item: GenericItem) {
    emit('edit', item)
  }

  function onDelete (item: GenericItem) {
    emit('delete', item)
  }
</script>
