<template>
  <div
    class="flex justify-around p-0.5"
    :class="[
      active
        ? 'bg-orange-400 border rounded-2xl text-black'
        : 'text-orange-400',
      safetyNet ? 'text-white' : '',
    ]"
  >
    <div>{{ questionNumber }} &#x2022;</div>
    <div>
      {{
        money.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  questionNumber: number;
  money: number;
  safetyNet: boolean;
  active: boolean;
}>();
</script>
