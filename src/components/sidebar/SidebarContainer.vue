<template>
  <PlayerInfo />
  <div
    v-for="triviaStep in props.triviaSteps"
    :key="triviaStep.questionNumber"
    class="mt-1"
  >
    <TriviaStep
      :questionNumber="triviaStep.questionNumber"
      :money="triviaStep.money"
      :safetyNet="triviaStep.safetyNet"
      :active="triviaStep.questionNumber === props.currentQuestionNumber"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerInfo from "./PlayerInfo.vue";
import TriviaStep from "./TriviaStep.vue";

const props = defineProps<{
  currentQuestionNumber: number;
  triviaSteps: Array<{
    questionNumber: number;
    money: number;
    safetyNet: boolean;
  }>;
}>();
</script>
