<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size: 'sm' | 'md' | 'lg'
  type: 'danger' | 'warning' | 'success'
  text: string
}>()

const badgeClass = computed(() => {
  if (props.type === 'danger') {
    return 'bg-red-400/10 text-red-400 ring-red-400/20'
  }

  if (props.type === 'warning') {
    return 'bg-yellow-400/10 text-yellow-500 ring-yellow-400/20'
  }

  return 'bg-green-400/10 text-green-400 ring-green-500/20'
})

const sizeClass = computed(() => {
  if (props.size === 'sm') {
    return 'min-w-14 px-2 py-1 text-xs'
  }

  if (props.size === 'lg') {
    return 'min-w-20 px-3 py-1.5 text-sm'
  }

  return 'min-w-16 px-2.5 py-1 text-xs'
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
    :class="[badgeClass, sizeClass]"
  >
    {{ text }}
  </span>
</template>
