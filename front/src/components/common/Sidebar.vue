<script lang="ts" setup>
  import { ref } from 'vue';

  const drawer = ref(true)
</script>

<template>
  <v-navigation-drawer v-model="drawer" app permanent>
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" />
      <v-list-item prepend-icon="mdi-account" title="Usuários" />
      <v-list-item prepend-icon="mdi-cog" title="Configurações" />
    </v-list>
  </v-navigation-drawer>
</template>
