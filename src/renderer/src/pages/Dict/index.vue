<!--
 * @Author: goudanyang
 * @Date: 2023-12-17 19:20:14
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-12-21 22:56:54
 * @Description: _
-->
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

window.api.getText((_event, val) => {
  value.value = val
})
</script>
<template>
  <div>
    <div class="border border-black" style="-webkit-app-region: drag">1</div>
    <div>{{ value }}</div>
  </div>
</template>
