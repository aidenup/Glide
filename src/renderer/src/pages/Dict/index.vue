<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
window.api.getWinURL((_event, value) => {
  console.log('val')
  val.value = value
})
</script>
<template>
  <div>
    <div class="border border-black" style="-webkit-app-region: drag">1</div>
    <div>{{ val }}</div>
  </div>
</template>
