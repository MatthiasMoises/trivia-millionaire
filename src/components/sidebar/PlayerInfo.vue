<template>
  <div class="text-center px-2 pb-2 mb-5 border-t-2 border-b-2 text-3xl">
    {{ store.username }}
  </div>
</template>

<script setup lang="ts">
import { store } from "../../store";
</script>
