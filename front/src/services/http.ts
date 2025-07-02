import type { Ref } from 'vue'

import { useFetch } from '@vueuse/core'

const baseURL = import.meta.env.VITE_API_BASE_URL

export function useApiFetch<T> (
  url: string,
  options: RequestInit = {},
  query?: Record<string, string | number | boolean | undefined> | Ref<Record<string, string | number | boolean | undefined>>,
) {
  const token = localStorage.getItem('authToken')
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',

  }

  const getQuery = () => {
    if (query && typeof query === 'object' && 'value' in query) {
      return (query as any).value
    }
    return query
  }

  const fullUrl = computed(() => {
    let full = `${baseURL}${url}`

    const q = getQuery()
    if (q && Object.keys(q).length > 0) {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(q)) {
        if (value !== undefined) {
          params.append(key, String(value))
        }
      }
      full += `?${params.toString()}`
    }
    return full
  })

  return useFetch<T>(
    fullUrl,
    {
      ...options,
      headers,
    },
    {
      refetch: true,
    },
  ).json()
}
