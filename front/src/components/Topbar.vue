<template>
  <v-app-bar app dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>Grupo A Software</v-toolbar-title>

    <v-spacer />

    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="blue-grey lighten-5">
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout } from '@/composables/auth'

defineEmits(['toggle-drawer'])

const router = useRouter()

function handleLogout () {
  logout()
  router.push('/login')
}

</script>
