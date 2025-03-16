<template>
  <div class="absolute bottom-0 max-w-full w-full h-1/3 p-6">
    <div
      class="border rounded-2xl bg-gradient-to-r from-sky-900 to-cyan-500 p-2 text-white mb-6 text-center text-3xl"
    >
      {{ formatToDollar(currentWin) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatToDollar } from "../../utils/helpers";

defineProps<{
  currentWin: number;
}>();
</script>
