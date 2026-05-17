<script setup lang="ts">
import { ref } from 'vue'
import type { CreateTicketRequest, TicketPriority } from '../types/ticket'
import TicketForm from './TicketForm.vue'

const props = defineProps<{
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', request: CreateTicketRequest): void
}>()

const form = ref<CreateTicketRequest>({
  title: '',
  description: '',
  priority: '' as TicketPriority | '',
  requesterName: '',
  requesterEmail: '',
})

function handleSave() {
  emit('save', form.value)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
    <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Criar ticket</h2>
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          @click="emit('close')"
        >
          x
        </button>
      </div>

      <TicketForm :form="form" />

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="props.isSubmitting"
          @click="emit('close')"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="props.isSubmitting"
          @click="handleSave"
        >
          {{ props.isSubmitting ? 'Criando...' : 'Criar' }}
        </button>
      </div>
    </div>
  </div>
</template>
