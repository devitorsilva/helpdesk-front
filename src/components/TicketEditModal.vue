<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ticket, UpdateTicketRequest } from '../types/ticket'
import PrioritySelect from './PrioritySelect.vue'
import StatusSelect from './StatusSelect.vue'

const props = defineProps<{
  ticket: Ticket
  isSaving: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', request: UpdateTicketRequest): void
}>()

const form = ref<UpdateTicketRequest>({
  title: '',
  description: '',
  status: undefined,
  priority: undefined,
  assignedTo: '',
})

watch(
  () => props.ticket,
  (ticket) => {
    form.value = {
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      assignedTo: ticket.assignedTo ?? '',
    }
  },
  { immediate: true }
)

function handleSave() {
  emit('save', form.value)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
    <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Editar ticket</h2>
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          @click="emit('close')"
        >
          x
        </button>
      </div>

      <div class="grid gap-4">
        <div>
          <label
            for="title"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            for="description"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            v-model="form.description"
            type="textarea"
            rows="2"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <StatusSelect v-model="form.status"></StatusSelect>

        <PrioritySelect v-model="form.priority"></PrioritySelect>
        <div>
          <label
            for="assignedTo"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Responsável
          </label>
          <input
            id="assignedTo"
            v-model="form.assignedTo"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          class="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          @click="emit('close')"
          :disabled="props.isSaving"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="props.isSaving"
          @click="handleSave"
        >
          {{ props.isSaving ? 'Salvando' : 'Salvar' }}
        </button>
      </div>
    </div>
  </div>
</template>
