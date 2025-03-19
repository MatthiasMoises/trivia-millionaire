import type { TriviaStep } from "../types/trivia-step"

export const apiBaseUrl: string = 'https://opentdb.com'

export const triviaSteps = [
  { questionNumber: 15, money: 1000000, safetyNet: true },
  { questionNumber: 14, money: 500000, safetyNet: false },
  { questionNumber: 13, money: 256000, safetyNet: false },
  { questionNumber: 12, money: 128000, safetyNet: false },
  { questionNumber: 11, money: 64000, safetyNet: false },
  { questionNumber: 10, money: 32000, safetyNet: true },
  { questionNumber: 9, money: 16000, safetyNet: false },
  { questionNumber: 8, money: 8000, safetyNet: false },
  { questionNumber: 7, money: 4000, safetyNet: false },
  { questionNumber: 6, money: 2000, safetyNet: false },
  { questionNumber: 5, money: 1000, safetyNet: true },
  { questionNumber: 4, money: 500, safetyNet: false },
  { questionNumber: 3, money: 300, safetyNet: false },
  { questionNumber: 2, money: 200, safetyNet: false },
  { questionNumber: 1, money: 100, safetyNet: false },
] as Array<TriviaStep>;