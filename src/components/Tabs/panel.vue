<script setup lang="ts" name="XtxTabsPane">
import { inject } from 'vue';

defineProps<{
  label?: string
  name?: string
}>()
const activeName = inject('activeName')
console.log(activeName);

</script>

<template>
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot></slot>
  </div>
</template>
