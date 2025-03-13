import { ref, toValue, watchEffect, type Ref } from "vue"

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Question = {
  type: string,
  difficulty: Difficulty,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>
}

export const useQuestions = (difficulty: Ref<Difficulty>, token: string) => {
  const questions = ref<Question[]>([])
  const error = ref<string | null>(null)

  const getQuestions = async () => {
    // questions.value = [] as Question[]
    error.value = null

    const baseUrl = `https://opentdb.com/api.php?amount=5&difficulty=${toValue(difficulty)}&type=multiple&token=${token}`

    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      if (data['response_code'] === 0) {
        // questions.value = data['results'] as Question[]
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