<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list-item class="px-4">
        <v-icon class="me-2">mdi-school</v-icon>
        <div>
          <div class="font-weight-bold">EduSystem</div>
          <div class="text-caption text-grey-darken-1">Gestão Acadêmica</div>
        </div>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-subheader>Menu Principal</v-list-subheader>

      <v-list density="compact" nav>
        <v-list-item
          :active="true"
          href="/alunos"
          prepend-icon="mdi-account-group"
          title="Alunos"
        />
        <v-list-item
          href="/cursos"
          prepend-icon="mdi-book-open-variant"
          title="Cursos"
        />
        <v-list-item
          href="/relatorios"
          prepend-icon="mdi-file-document-outline"
          title="Relatórios"
        />
        <v-list-item
          href="/configuracoes"
          prepend-icon="mdi-cog-outline"
          title="Configurações"
        />
      </v-list>

      <template #append>
        <div class="text-center text-caption mt-6 mb-2">
          © 2024 EduSystem
        </div>
      </template>
    </v-navigation-drawer>

    <!-- <v-main> -->
    <v-container class="fill-height">
      <router-view />
    </v-container>
    <!-- </v-main> -->
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
