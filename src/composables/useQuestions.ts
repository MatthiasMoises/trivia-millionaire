import { ref, toValue, watchEffect, type Ref } from "vue"
import { apiBaseUrl } from "../utils/config"
import type { Difficulty } from "../types/difficulty"
import type { Question } from "../types/question"

export const useQuestions = (difficulty: Ref<Difficulty>, token: string) => {
  const questions = ref<Question[]>([])
  const error = ref<string | null>(null)

  const getQuestions = async () => {
    error.value = null

    const baseUrl = `${apiBaseUrl}/api.php?amount=5&difficulty=${toValue(difficulty)}&type=multiple&token=${token}`

    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      if (data['response_code'] === 0) {
        questions.value = [...questions.value, ...data['results'] as Question[]]
      }
    } catch (err) {
      error.value = String(err)
    }
  }

  watchEffect(async () => {
    await getQuestions()
  })

  return {
    questions,
    error
  }
}