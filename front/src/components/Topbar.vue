<template>
  <v-app-bar app dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>EduSystem</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  defineEmits(['toggle-drawer'])
</script>
