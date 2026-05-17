<script setup lang="ts">
import type {
  CreateTicketRequest,
  TicketPriority,
  TicketStatus,
  UpdateTicketRequest,
} from '../types/ticket'
import PrioritySelect from './PrioritySelect.vue'
import StatusSelect from './StatusSelect.vue'

defineProps<{
  form: CreateTicketRequest | UpdateTicketRequest
  showStatus?: boolean
}>()
</script>

<template>
  <div class="grid gap-4">
    <div>
      <label for="title" class="mb-1 block text-sm font-medium text-gray-700">
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
        rows="3"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
    </div>

    <StatusSelect
      v-if="showStatus"
      v-model="form.status as TicketStatus | ''"
    />

    <PrioritySelect v-model="form.priority as TicketPriority | ''" />

    <div>
      <label
        for="requesterName"
        class="mb-1 block text-sm font-medium text-gray-700"
      >
        Solicitante
      </label>
      <input
        id="requesterName"
        v-model="form.requesterName"
        type="text"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
    </div>

    <div>
      <label
        for="requesterEmail"
        class="mb-1 block text-sm font-medium text-gray-700"
      >
        Email do solicitante
      </label>
      <input
        id="requesterEmail"
        v-model="form.requesterEmail"
        type="email"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
    </div>

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
</template>
