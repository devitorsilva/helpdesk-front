<script setup lang="ts">
import type { TicketStatus } from '../types/ticket'
import { ticketStatusLabels } from '../utils/ticketLabels'

defineProps<{
  modelValue: TicketStatus | ''
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TicketStatus | ''): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value as TicketStatus | '')
}
</script>

<template>
  <div>
    <label for="status" class="mb-1 block text-sm font-medium text-gray-700">
      Estado
    </label>
    <select
      id="status"
      :value="modelValue"
      class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      @change="handleChange"
    >
      <option value="">Todos os estados</option>
      <option value="OPEN">{{ ticketStatusLabels.OPEN }}</option>
      <option value="IN_PROGRESS">
        {{ ticketStatusLabels.IN_PROGRESS }}
      </option>
      <option value="RESOLVED">{{ ticketStatusLabels.RESOLVED }}</option>
      <option value="CLOSED">{{ ticketStatusLabels.CLOSED }}</option>
    </select>
  </div>
</template>
