<template>
  <v-data-table
    class="rounded-lg elevation-1"
    :data-allow-mismatch="true"
    density="comfortable"
    :headers="headers"
    hide-default-footer
    item-value="id"
    :items="dataList || []"
    :items-per-page="itemsPerPage"
    items-per-page-text="Itens por página"
    width="100%"
    @update:items-per-page="onItemsPerPageChange"
    @update:page="onPageChange"
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

    <template #bottom>
      <div class="d-flex align-center justify-center pt-2 px-2 gap-2 w-100">
        <v-select
          density="compact"
          hide-details
          :items="[5, 10, 20, 50, 100]"
          :model-value="itemsPerPage"
          style="max-width: 150px"
          @update:model-value="onItemsPerPageChange"
        />

        <v-pagination
          :length="pageCount"
          :model-value="currentPage"
          @update:model-value="onPageChange"
        />
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
type RowKey = { id: string, name: string };
type GenericItem = Record<string, any>;
const _props = defineProps<{
  dataList: GenericItem[]
  rowKeys: RowKey[]
  totalItems: number
  itemsPerPage: number
  currentPage: number
}>();

const emit = defineEmits<{
  'edit': [item: GenericItem]
  'delete': [item: GenericItem]
  'update:page': [page: number]
  'update:itemsPerPage': [limit: number]
}>();

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
]);

const pageCount = computed(() =>
  Math.ceil(_props.totalItems / _props.itemsPerPage),
);

function onEdit (item: GenericItem) {
  emit('edit', item);
}

function onDelete (item: GenericItem) {
  emit('delete', item);
}

function onPageChange (page: number) {
  emit('update:page', page);
}

function onItemsPerPageChange (limit: number) {
  emit('update:itemsPerPage', limit);
}
</script>
