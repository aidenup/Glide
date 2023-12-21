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
    <ul>
      <li>fads</li>
      {{
        val
      }}
    </ul>
  </div>
</template>
