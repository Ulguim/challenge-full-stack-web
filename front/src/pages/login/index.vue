<template>
  <v-app>
    <v-main>
      <v-row class="fill-height ma-0" style="min-height: 100vh">
        <v-col
          class="d-none d-md-flex align-center justify-center"
          cols="6"
          style="background: url('src/assets/background.jpg') center center no-repeat; background-size: cover;"
        >
          <div style="height: 100%; width: 100%" />
        </v-col>

        <v-col
          class="d-flex align-center justify-center"
          cols="12"
          md="6"
        >
          <v-card class="px-8 py-8 w-50" elevation="2" max-width="600">
            <h2 class="text-h5 mb-6 text-center">Login EduSystem</h2>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                :error-messages="errors.email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                @blur="validateField('email')"
              />

              <v-text-field
                v-model="password"
                :error-messages="errors.password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                type="password"
                @blur="validateField('password')"
              />

              <v-btn
                block
                class="mt-4"
                color="primary"
                type="submit"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="snackbar"
        close-delay="500"
        :color="snackbarColor"
        location="top"
        timeout="2000"
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
import { z } from 'zod'
import { login } from '@/composables/auth'
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const errors = reactive<{ email?: string[], password?: string[] }>({})

  const snackbar = ref(false)
  const snackbarMessage = ref('')
  const snackbarColor = ref<'success' | 'error'>('success')

  function showToast (message: string, color: 'success' | 'error' = 'success') {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbar.value = true
  }

  const loginSchema = z.object({
    email: z.string().email({ message: 'Email Inválido' }),
    password: z.string().min(1, { message: 'Senha Inválida' }),
  })

  function validateField (field: 'email' | 'password') {
    const result = loginSchema.safeParse({
      email: email.value,
      password: password.value,
    })

    errors.email = []
    errors.password = []

    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors
      if (field === 'email' && fieldError.email) errors.email = fieldError.email
      if (field === 'password' && fieldError.password) errors.password = fieldError.password
    }
  }

  async function handleLogin () {
    const result = loginSchema.safeParse({
      email: email.value,
      password: password.value,
    })

    errors.email = []
    errors.password = []

    if (result.success) {
      try {
        await login(email.value, password.value)
        showToast('Login Efetuado com Sucesso', 'success')
        router.push('/students')
      } catch (error) {
        console.error('Login failed:', error)
        showToast('Credenciais Invalidas', 'error')
      }
    } else {
      const fieldError = result.error.flatten().fieldErrors
      errors.email = fieldError.email || []
      errors.password = fieldError.password || []
      showToast('Please correct the form', 'error')
    }
  }

  definePage({
    meta: {
      requiresAuth: false,
      title: 'Login',
      layout: 'default',
    },
  })
</script>
