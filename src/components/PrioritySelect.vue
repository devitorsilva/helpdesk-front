<script setup lang="ts">
import type { TicketPriority } from '../types/ticket'
import { ticketPriorityLabels } from '../utils/ticketLabels'

defineProps<{
  modelValue: TicketPriority | ''
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TicketPriority | ''): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value as TicketPriority | '')
}
</script>

<template>
  <div>
    <label for="priority" class="mb-1 block text-sm font-medium text-gray-700">
      Estado
    </label>
    <select
      id="priority"
      :value="modelValue"
      class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      @change="handleChange"
    >
      <option value="">Todos as prioridades</option>
      <option value="LOW">{{ ticketPriorityLabels.LOW }}</option>
      <option value="MEDIUM">
        {{ ticketPriorityLabels.MEDIUM }}
      </option>
      <option value="HIGH">{{ ticketPriorityLabels.HIGH }}</option>
    </select>
  </div>
</template>
