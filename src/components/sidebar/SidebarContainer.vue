<template>
  <PlayerInfo />
  <div
    v-for="triviaStep in props.triviaSteps"
    :key="triviaStep.questionNumber"
    class="mt-1"
  >
    <TriviaStep
      :question-number="triviaStep.questionNumber"
      :money="triviaStep.money"
      :safety-net="triviaStep.safetyNet"
      :active="triviaStep.questionNumber === props.currentQuestionNumber"
    />
  </div>
  <DifficultyInfo :current-difficulty="currentDifficulty" />
</template>

<script setup lang="ts">
import PlayerInfo from "./PlayerInfo.vue";
import TriviaStep from "./TriviaStep.vue";
import DifficultyInfo from "./DifficultyInfo.vue";
import type { Difficulty } from "../../composables/useQuestions";

const props = defineProps<{
  currentQuestionNumber: number;
  triviaSteps: Array<{
    questionNumber: number;
    money: number;
    safetyNet: boolean;
  }>;
  currentDifficulty: Difficulty;
}>();
</script>
