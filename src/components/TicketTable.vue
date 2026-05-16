<script setup lang="ts">
import type { Ticket } from '../types/ticket'
import { ticketPriorityLabels, ticketStatusLabels } from '../utils/ticketLabels'

defineProps<{
  tickets: Ticket[]
}>()
</script>

<template>
  <div class="rounded border border-gray-200 bg-white p-4">
    <table class="table-auto w-full text-left text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="px-3 py-2">Título</th>
          <th class="px-3 py-2">Estado</th>
          <th class="px-3 py-2">Prioridade</th>
          <th class="px-3 py-2">Responsável</th>
          <th class="px-3 py-2">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="ticket in tickets"
          :key="ticket.id"
          class="border-b border-gray-100"
        >
          <td class="px-3 py-2">
            <div class="font-medium text-gray-900">{{ ticket.title }}</div>
            <div class="text-xs text-gray-500">{{ ticket.description }}</div>
          </td>

          <td class="px-3 py-2 text-gray-700">
            {{ ticketStatusLabels[ticket.status] }}
          </td>

          <td class="px-3 py-2">
            <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
              {{ ticketPriorityLabels[ticket.priority] }}
            </span>
          </td>

          <td class="px-3 py-2 text-gray-700">
            {{ ticket.assignedTo ?? 'Não atribuído' }}
          </td>

          <td class="px-3 py-2">
            <div class="flex gap-2">
              <button
                class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100"
              >
                Editar
              </button>
              <button
                class="cursor-pointer rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
