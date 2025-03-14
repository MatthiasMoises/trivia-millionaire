<template>
  <GameLayout>
    <div
      class="w-3/4 grow bg-[url(/src/assets/img/background3.jpg)] bg-cover bg-center relative"
    >
      <div class="absolute left-1">
        <ActionButton
          v-for="(_, index) in availableAids"
          :key="index"
          @click="handleAid"
          :disabled="aidActive"
          >Help Me</ActionButton
        >
      </div>

      <div class="absolute right-1">
        <ActionButton @click="isPlaying ? pauseMusic() : startMusic()">{{
          isPlaying ? "Pause Music" : "Play Music"
        }}</ActionButton>
        <ActionButton @click="endGame"> End Game </ActionButton>
      </div>

      <QuestionContainer
        v-if="currentQuestion"
        :question="currentQuestion"
        :answers="aidActive ? filteredAnswers() : randomizedAnswers"
        :aidActive="aidActive"
        @answerCorrect="handleAnswer"
      />
    </div>
    <div
      class="w-1/4 grow bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 p-5 text-white"
    >
      <SidebarContainer
        :triviaSteps="triviaSteps"
        :currentQuestionNumber="currentQuestionNumber"
      />
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from "../layouts/GameLayout.vue";
import QuestionContainer from "../components/main/QuestionContainer.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";
import ActionButton from "../components/main/ActionButton.vue";

import { store } from "../store";
import { useQuestions, type Difficulty } from "../composables/useQuestions";
import { computed, ref } from "vue";
import { shuffle } from "../utils/helpers";
import { useRouter } from "vue-router";
import bgMusic from "../assets/sounds/music1.mp3";
import { useMusic } from "../composables/useMusic";

// Handle backgroud music
const { isPlaying, startMusic, pauseMusic } = useMusic(bgMusic);

const currentQuestionNumber = ref(1);

const determinedDifficulty = computed<Difficulty>(() => {
  if (currentQuestionNumber.value <= 5) {
    return "easy";
  } else if (currentQuestionNumber.value <= 10) {
    return "medium";
  } else if (currentQuestionNumber.value <= 15) {
    return "hard";
  } else {
    // Fallback difficulty
    return "easy";
  }
});

const triviaSteps = [
  { questionNumber: 15, money: 1000000, safetyNet: false },
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
];

const { questions } = useQuestions(determinedDifficulty, store.sessionToken);

const currentQuestion = computed(() => {
  return questions.value[currentQuestionNumber.value - 1];
});

const randomizedAnswers = computed(() => {
  return shuffle([
    currentQuestion.value.correct_answer,
    ...currentQuestion.value.incorrect_answers,
  ]);
});

const filteredAnswers = () => {
  const incorrectAnswers = currentQuestion.value.incorrect_answers;
  const randomWrongAnswer =
    incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];

  return randomizedAnswers.value.filter(
    (answer) =>
      answer === currentQuestion.value.correct_answer ||
      answer === randomWrongAnswer
  );
};

const updateQuestionNr = () => {
  currentQuestionNumber.value = currentQuestionNumber.value + 1;
};

const handleAnswer = (answerCorrect: boolean) => {
  const win = triviaSteps.find(
    (step) => step.questionNumber === currentQuestionNumber.value
  );
  store.updatedCurrentScore(win!.money);

  if (answerCorrect && currentQuestionNumber.value < 15) {
    if (
      currentQuestionNumber.value === 5 ||
      currentQuestionNumber.value === 10
    ) {
      store.updateSafetyScore(win!.money);
    }

    updateQuestionNr();
    aidActive.value = false;
  } else {
    store.currentScore = store.safetyScore;
    endGame();
  }
};

const router = useRouter();

const endGame = () => {
  router.push({ path: "/results" });
};

// Handle aid usage
const availableAids = ref(3);
const aidActive = ref(false);

const handleAid = () => {
  availableAids.value = availableAids.value - 1;
  aidActive.value = true;
};
</script>
