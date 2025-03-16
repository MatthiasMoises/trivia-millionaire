<template>
  <GameLayout>
    <div
      class="w-3/4 grow bg-[url(/src/assets/img/background3.jpg)] bg-cover bg-center relative"
    >
      <div class="absolute left-1">
        <ActionButton
          v-for="(_aid, index) in availableAids"
          :key="index"
          @click="handleAid"
          title="Get Help"
          :disabled="aidActive"
        >
          <AcademicCap />
        </ActionButton>
      </div>

      <div class="absolute right-1">
        <ActionButton
          @click="isPlaying ? pauseMusic() : startMusic()"
          :title="isPlaying ? 'Mute' : 'Unmute'"
        >
          <MusicalNoteIcon
            :class="isPlaying ? 'text-white' : 'text-slate-700'"
          />
        </ActionButton>
        <ActionButton title="End Game" @click="endGame">
          <XMarkIcon />
        </ActionButton>
      </div>

      <div v-if="!showInfo">
        <QuestionContainer
          v-if="currentQuestion"
          :question="currentQuestion"
          :answers="aidActive ? filteredAnswers() : randomizedAnswers"
          :aid-active="aidActive"
          @answer-correct="handleAnswer"
        />
      </div>
      <div v-else>
        <WinInfo :current-win="store.currentScore" />
      </div>
    </div>
    <div
      class="w-1/4 grow bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 p-5 text-white"
    >
      <SidebarContainer
        :trivia-steps="triviaSteps"
        :current-question-number="currentQuestionNumber"
        :current-difficulty="determinedDifficulty"
      />
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from "../layouts/GameLayout.vue";
import QuestionContainer from "../components/main/QuestionContainer.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";
import ActionButton from "../components/main/ActionButton.vue";
import AcademicCap from "../components/icons/AcademicCap.vue";
import MusicalNoteIcon from "../components/icons/MusicalNoteIcon.vue";
import XMarkIcon from "../components/icons/XMarkIcon.vue";
import WinInfo from "../components/main/WinInfo.vue";

import { store } from "../store";
import { useQuestions, type Difficulty } from "../composables/useQuestions";
import { computed, ref } from "vue";
import { delay, shuffle } from "../utils/helpers";
import { useRouter } from "vue-router";
import { useMusic } from "../composables/useMusic";

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

// Handle backgroud music
const { isPlaying, startMusic, pauseMusic } = useMusic(determinedDifficulty);

const triviaSteps = [
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

// Update number to get next question
const updateQuestionNr = () => {
  currentQuestionNumber.value = currentQuestionNumber.value + 1;
};

// Handle the user answer
const handleAnswer = async (answerCorrect: boolean) => {
  if (answerCorrect) {
    updateUserScore();
    showInfo.value = true;
    await delay(1500);

    if (currentQuestionNumber.value < 15) {
      aidActive.value = false;
      updateQuestionNr();
    } else if (currentQuestionNumber.value === 15) {
      endGame();
    }
  } else {
    store.currentScore = store.safetyScore;
    showInfo.value = true;
    await delay(1500);
    endGame();
  }
  showInfo.value = false;
};

// Update the user score
const updateUserScore = () => {
  const win = triviaSteps.find(
    (step) => step.questionNumber === currentQuestionNumber.value
  );
  store.updateCurrentScore(win!.money);

  if (currentQuestionNumber.value % 5 === 0) {
    store.updateSafetyScore(win!.money);
  }
};

// Handle game and and routing
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

// Handle win info bar
const showInfo = ref(false);
</script>
