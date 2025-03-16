<template>
  <div
    class="absolute bottom-0 max-w-full w-full h-1/3 bg-white/30 backdrop-invert backdrop-opacity-10 p-6"
  >
    <ActiveQuestion :question-text="question.question" />
    <div class="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3">
      <SingleAnswer
        v-for="(answer, index) in props.answers"
        :answer-text="answer"
        :answer-index="index"
        :is-correct-answer="question.correct_answer === answer"
        :reveal-answer="revealAnswer"
        @answer-submitted="handleAnswer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "../../composables/useQuestions";
import ActiveQuestion from "./ActiveQuestion.vue";
import SingleAnswer from "./SingleAnswer.vue";
import { delay } from "../../utils/helpers";

const props = defineProps<{
  question: Question;
  answers: Array<string>;
  aidActive: boolean;
}>();

const emit = defineEmits<{
  (e: "answerCorrect", value: boolean): void;
}>();

const revealAnswer = ref(false);

const handleAnswer = async (answerCorrect: boolean) => {
  revealAnswer.value = true;
  await delay(1500);
  emit("answerCorrect", answerCorrect);
  revealAnswer.value = false;
};
</script>
