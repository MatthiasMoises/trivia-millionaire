<template>
  <PlayerInfo />
  <div
    v-for="triviaStep in props.triviaSteps"
    :key="triviaStep.questionNumber"
    class="mt-1"
  >
    <TriviaStepListItem
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
import TriviaStepListItem from "./TriviaStepListItem.vue";
import DifficultyInfo from "./DifficultyInfo.vue";
import type { Difficulty } from "../../types/difficulty";
import type { TriviaStep } from "../../types/trivia-step";

const props = defineProps<{
  currentQuestionNumber: number;
  triviaSteps: Array<TriviaStep>;
  currentDifficulty: Difficulty;
}>();
</script>
