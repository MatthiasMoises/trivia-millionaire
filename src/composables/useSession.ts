import { ref, watchEffect } from "vue"
import { apiBaseUrl } from "../utils/config"

type Command = 'request' | 'reset'

export const useSession = (command: Command) => {
  const token = ref('')
  const error = ref<string | null>(null)

  const baseUrl = `${apiBaseUrl}/api_token.php?command=${command}`
  const tokenUrl = command === 'reset' ? baseUrl + '&token=' + token.value : baseUrl

  const getToken = async () => {
    token.value = ''
    error.value = null

    try {
      const response = await fetch(tokenUrl)
      const data = await response.json()
      if (data['response_code'] === 0) {
        token.value = data['token']
      }
    } catch (err) {
      error.value = String(err)
    }
  }

  watchEffect(async () => {
    await getToken()
  })

  return {
    token,
    error
  }
}