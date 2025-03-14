<template>
  <div
    class="border rounded-2xl bg-blue-400 hover:bg-blue-700 p-2 text-white cursor-pointer"
    :class="[
      chosenAnswer ? 'bg-orange-400 hover:bg-orange-400' : '',
      answerCorrect ? 'bg-green-600 hover:bg-green-600' : '',
      answerWrong ? 'bg-red-500 hover:bg-red-500' : '',
    ]"
    @click="submitAnswer"
    v-html="mappedIndex() + ': ' + answerText"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { delay } from "../../utils/helpers";

const props = defineProps<{
  answerText: string;
  answerIndex: number;
  isCorrectAnswer: boolean;
}>();

const emit = defineEmits<{
  (e: "answerSubmitted", answerWasCorrect: boolean): void;
}>();

const mappedIndex = (): string => {
  let letter;

  switch (props.answerIndex) {
    case 0:
      letter = "A";
      break;
    case 1:
      letter = "B";
      break;
    case 2:
      letter = "C";
      break;
    case 3:
      letter = "D";
      break;
    default:
      letter = "X";
  }
  return letter;
};

const chosenAnswer = ref(false);
const answerCorrect = ref(false);
const answerWrong = ref(false);

const submitAnswer = async (): Promise<void> => {
  chosenAnswer.value = true;
  await delay(1000);

  if (props.isCorrectAnswer) {
    chosenAnswer.value = false;
    answerCorrect.value = true;
  } else {
    chosenAnswer.value = false;
    answerWrong.value = true;
  }

  await delay(1000);

  answerCorrect.value = false;
  answerWrong.value = false;

  emit("answerSubmitted", props.isCorrectAnswer);
};
</script>
