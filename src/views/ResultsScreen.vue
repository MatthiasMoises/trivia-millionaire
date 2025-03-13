<template>
  <MenuLayout>
    <h2>
      Congratulations, {{ store.username }}! You have won ${{
        store.currentScore
      }}!!!
    </h2>
    <button type="button" class="underline cursor-pointer" @click="restartGame">
      Try again
    </button>
  </MenuLayout>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import MenuLayout from "../layouts/MenuLayout.vue";
import { store } from "../store";

const router = useRouter();

const restartGame = () => {
  router.push({ path: "/" });
};
</script>
