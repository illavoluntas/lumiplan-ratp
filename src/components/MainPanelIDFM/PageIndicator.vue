<script setup lang="ts">
interface Props {
  currentPageIndex: number;
  totalPages: number;
}

defineProps<Props>();
</script>

<template>
  <div v-if="totalPages > 1" class="page-indicator">
    <span
      v-for="i in totalPages"
      :key="i"
      class="page-dot"
      :class="{ active: i - 1 === currentPageIndex }"
    ></span>
  </div>
</template>

<style lang="css" scoped>
.page-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(1cqw * (25/1920)*100);
}

.page-dot {
  width: calc(1cqw * (15/1920)*100);
  height: calc(1cqw * (15/1920)*100);
  border: calc(1cqw * (2/1920)*100) solid white;
  border-radius: 50%;
  box-sizing: border-box;
}

.page-dot.active {
  background-color: white;
}
</style>