<script setup lang="ts">
import type { Ticket } from '../types/ticket'

const props = defineProps<{
  ticket: Ticket
  isUpdating: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'delete', id: number): void
}>()

function handleDelete() {
  emit('delete', props.ticket.id)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Confirmar exclusão</h2>
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          @click="emit('close')"
        >
          x
        </button>
      </div>

      <div class="space-y-3">
        <p class="text-sm text-gray-700">
          Tem certeza que deseja excluir este ticket?
        </p>

        <div class="rounded border border-gray-200 bg-gray-50 p-3">
          <p class="text-sm font-medium text-gray-900">
            {{ ticket.title }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="props.isUpdating"
          @click="emit('close')"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="cursor-pointer rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="props.isUpdating"
          @click="handleDelete"
        >
          {{ props.isUpdating ? 'Excluindo...' : 'Excluir' }}
        </button>
      </div>
    </div>
  </div>
</template>
