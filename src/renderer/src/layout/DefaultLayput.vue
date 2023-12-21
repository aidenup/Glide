<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const Menu = [
  {
    name: 'Setting',
    path: '/setting'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Dict',
    path: '/dict'
  }
]

function handleMenu(path: string) {
  router.push(path)
}
</script>
<template>
  <div class="flex h-screen">
    <div class="w-32 border border-black">
      <ul class="flex flex-col">
        <li v-for="item in Menu" :key="item.name" @click="handleMenu(item.path)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <RouterView />
  </div>
</template>
<style lang="less" scoped>
ul > li {
  @apply mb-3 cursor-pointer items-center border border-black;
}
</style>
