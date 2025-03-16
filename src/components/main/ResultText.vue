<template>
  <div class="text-4xl mb-3">
    <slot name="headline" />
  </div>
  <div class="text-center my-5">
    <slot name="image" />
  </div>
  <p class="text-2xl mb-3">
    <slot name="subtext1" />
  </p>
  <div class="text-7xl mb-3"><slot name="score" /></div>
  <p class="text-2xl mb-3">
    <slot name="subtext2" />
  </p>
</template>
