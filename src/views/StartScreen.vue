<template>
  <MenuLayout>
    <div class="text-7xl uppercase mb-10">Trivia Game</div>
    <div class="mb-8">
      <p class="text-2xl mb-6">Please enter your name here</p>
      <label for="username">Username:</label>
      <input
        type="text"
        class="border bg-white rounded-2xl text-gray-500 p-2 ml-3 w-72"
        id="username"
        name="username"
        v-model="playerName"
        placeholder="Enter username..."
      />
    </div>
    <div class="mb-12">
      <button
        type="button"
        class="p-4 border rounded-2xl bg-green-700 hover:bg-green-500 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        @click="startGame"
        :disabled="error !== null || !playerName"
      >
        Start Game
      </button>
    </div>
    <div class="mb-5">
      <p v-if="token">
        <small>Session ID:</small>
        <br />
        <small> {{ token }}</small>
      </p>
    </div>
  </MenuLayout>
</template>

<script setup lang="ts">
import MenuLayout from "../layouts/MenuLayout.vue";
import { useSession } from "../composables/useSession";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store";

const { token, error } = useSession("request");

const playerName = ref("");

const router = useRouter();

const startGame = async () => {
  store.updateUsername(playerName.value);
  store.updateSessionToken(token.value);

  router.push({ path: "/play" });
};
</script>
