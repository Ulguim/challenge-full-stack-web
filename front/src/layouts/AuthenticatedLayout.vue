<template>
  <v-app>
    <Sidebar app :model-value="drawer" />

    <Topbar @toggle-drawer="toggleDrawer" />

    <v-main>
      <v-container class="fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'

  const drawer = ref(true)
  const toggleDrawer = () => drawer.value = !drawer.value
</script>
