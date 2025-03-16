<template>
  <div class="mt-5 py-3 text-center border-y-2">
    <p>Current Difficulty:</p>
    <p>
      {{ firstLetterUppercase(currentDifficulty) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Difficulty } from "../../composables/useQuestions";
import { firstLetterUppercase } from "../../utils/helpers";

defineProps<{
  currentDifficulty: Difficulty;
}>();
</script>
