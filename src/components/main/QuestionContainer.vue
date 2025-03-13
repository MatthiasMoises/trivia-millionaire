<template>
  <div
    class="absolute bottom-0 max-w-full w-full h-1/3 bg-white/30 backdrop-invert backdrop-opacity-10 p-6"
  >
    <ActiveQuestion :questionText="question.question" />
    <div class="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3">
      <SingleAnswer
        v-for="(answer, index) in props.answers"
        :answerText="answer"
        :answerIndex="index"
        :isCorrectAnswer="question.correct_answer === answer"
        @answerSubmitted="handleAnswer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "../../composables/useQuestions";
import ActiveQuestion from "./ActiveQuestion.vue";
import SingleAnswer from "./SingleAnswer.vue";

const props = defineProps<{
  question: Question;
  answers: Array<string>;
  aidActive: boolean;
}>();

const emit = defineEmits<{
  (e: "answerCorrect", value: boolean): void;
}>();

const handleAnswer = (answerCorrect: boolean) => {
  emit("answerCorrect", answerCorrect);
};
</script>
