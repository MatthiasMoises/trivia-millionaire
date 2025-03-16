import { reactive } from "vue";

export const store = reactive({
  username: '',
  sessionToken: '',
  currentScore: 0,
  safetyScore: 0,
  updateUsername(enteredName: string) {
    this.username = enteredName
  },
  updateSessionToken(token: string) {
    this.sessionToken = token
  },
  updateCurrentScore(score: number) {
    this.currentScore = score
  },
  updateSafetyScore(score: number) {
    this.safetyScore = score
  }
})