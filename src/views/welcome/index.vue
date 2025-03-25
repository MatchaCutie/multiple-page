<template>
  <div class="welcome-wrapper">Welcome</div>
</template>

<script lang="ts" setup name="WelcomeIndex">
import { onMounted, ref } from 'vue'
onMounted(() => {
  console.log(new Date().getTime(), 'welcome')
})
</script>

<style scoped lang="less">
.welcome-wrapper {
  color: red;
  height: 100vh;
  overflow-y: auto;
}
</style>
