<template>
  <div
    class="border rounded-2xl bg-blue-400 p-2 text-white mb-6 text-center"
    v-html="questionText"
  />
</template>

<script setup lang="ts">
defineProps<{
  questionText: string;
}>();
</script>
