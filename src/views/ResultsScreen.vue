<template>
  <MenuLayout>
    <div v-if="store.currentScore > 0">
      <ResultText :img-src="winImage" img-alt="You win!">
        <template #headline>Congratulations, {{ store.username }}!</template>
        <template #subtext1> You have won </template>
        <template #score>{{ formatToDollar(store.currentScore) }}</template>
        <template #subtext2>Great Job!</template>
      </ResultText>
    </div>

    <div v-else>
      <ResultText :img-src="loseImage" img-alt="You lose!">
        <template #headline>Oh no, {{ store.username }}...</template>
        <template #subtext1> You have won nothing, exactly </template>
        <template #score>{{ formatToDollar(store.currentScore) }}</template>
        <template #subtext2>That's a shame... Better luck next time!</template>
      </ResultText>
    </div>
    <button
      type="button"
      class="min-w-xl mt-5 p-3 border rounded-2xl bg-green-700 hover:bg-green-500 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
      @click="restartGame"
    >
      Try again
    </button>
  </MenuLayout>
</template>

<script setup lang="ts">
import MenuLayout from "../layouts/MenuLayout.vue";
import { useRouter } from "vue-router";
import { store } from "../store";
import ResultText from "../components/main/ResultText.vue";
import winImage from "../assets/img/win.jpg";
import loseImage from "../assets/img/lose.jpg";
import { formatToDollar } from "../utils/helpers";

const router = useRouter();

const restartGame = () => {
  router.push({ path: "/" });
};
</script>
