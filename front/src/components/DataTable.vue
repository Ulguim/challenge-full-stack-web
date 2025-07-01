<template>
  <v-data-table

    class="rounded-lg elevation-1"
    density="comfortable"
    :headers="
      headers"
    item-value="id"
    :items="dataList"
    items-per-page-text="Itens por página"
    width="100%"
  >
    <template #item.actions="{ item }">
      <div class="d-flex align-center justify-center ga-2">
        <v-btn
          class="rounded-pill font-weight-medium text-capitalize px-3"
          color="primary"
          size="small"
          variant="text"
          @click="() => onEdit(item)"
        >
          <v-icon size="18" start>mdi-pencil</v-icon>
          Editar
        </v-btn>

        <v-btn
          class="rounded-pill font-weight-medium text-capitalize px-3"
          color="red-darken-2"
          size="small"
          variant="text"
          @click="() => onDelete(item)"
        >
          <v-icon size="18" start>mdi-delete</v-icon>
          Excluir
        </v-btn>
      </div>
    </template>

  </v-data-table>
</template>

<script setup lang="ts">

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
