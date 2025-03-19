<template>
  <div v-if="$slots.headline" class="text-4xl mb-3">
    <slot name="headline" />
  </div>
  <div v-if="imgSrc && imgAlt" class="text-center my-5">
    <img class="w-3xs h-auto m-auto" :src="imgSrc" :alt="imgAlt" />
  </div>
  <p v-if="$slots.subtext1" class="text-2xl mb-3">
    <slot name="subtext1" />
  </p>
  <div v-if="$slots.score" class="text-7xl mb-3"><slot name="score" /></div>
  <p v-if="$slots.subtext2" class="text-2xl mb-3">
    <slot name="subtext2" />
  </p>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc?: string;
  imgAlt?: string;
}>();
</script>
