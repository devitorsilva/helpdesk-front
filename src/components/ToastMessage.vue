<script setup lang="ts">
defineProps<{
  message: string | ''
  type: 'success' | 'error'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    class="fixed right-4 top-4 rounded-md px-4 py-3 text-sm text-white shadow-md"
    :class="type === 'success' ? 'bg-green-600' : 'bg-red-600'"
  >
    <div class="flex items-center gap-3">
      <p>{{ message }}</p>
      <button
        type="button"
        class="cursor-pointer text-white"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
  </div>
</template>
