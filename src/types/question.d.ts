export type Question = {
  type: string,
  difficulty: Difficulty,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>
}