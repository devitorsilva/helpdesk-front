<script setup lang="ts">
import type { Ticket } from '../types/ticket'
import { ticketPriorityLabels, ticketStatusLabels } from '../utils/ticketLabels'
import AppBadge from './AppBadge.vue'

defineProps<{
  tickets: Ticket[]
  currentPage: number
  totalPages: number
  sortField: 'title' | 'status' | 'priority' | 'assignedTo'
  sortDirection: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  (e: 'previous-page'): void
  (e: 'next-page'): void
  (e: 'edit-ticket', ticket: Ticket): void
  (e: 'delete-ticket', ticket: Ticket): void
  (
    e: 'sort-column',
    field: 'title' | 'statusOrder' | 'priorityOrder' | 'assignedTo'
  ): void
}>()
</script>

<template>
  <div class="rounded border border-gray-200 bg-white p-4">
    <table class="table-auto w-full text-left text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th
            @click="emit('sort-column', 'title')"
            class="px-3 py-2 cursor-pointer"
          >
            Título
            <span v-if="sortField === 'title'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th
            @click="emit('sort-column', 'statusOrder')"
            class="px-3 py-2 cursor-pointer"
          >
            Estado
            <span v-if="sortField === 'statusOrder'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th
            @click="emit('sort-column', 'priorityOrder')"
            class="px-3 py-2 text-center cursor-pointer"
          >
            Prioridade
            <span v-if="sortField === 'priorityOrder'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>

          <th
            @click="emit('sort-column', 'assignedTo')"
            class="px-3 py-2 cursor-pointer"
          >
            Responsável
            <span v-if="sortField === 'assignedTo'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th class="px-3 py-2 text-center">Ações</th>
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

          <td class="px-3 py-2 text-center">
            <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
              <AppBadge
                size="md"
                :type="
                  ticket.priority === 'HIGH'
                    ? 'danger'
                    : ticket.priority === 'MEDIUM'
                      ? 'warning'
                      : 'success'
                "
                :text="ticketPriorityLabels[ticket.priority]"
              />
            </span>
          </td>

          <td class="px-3 py-2 text-gray-700">
            {{ ticket.assignedTo ?? 'Não atribuído' }}
          </td>

          <td class="px-3 py-2 flex justify-center">
            <div class="flex gap-2">
              <button
                class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100"
                @click="emit('edit-ticket', ticket)"
              >
                Editar
              </button>
              <button
                class="cursor-pointer rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                @click="emit('delete-ticket', ticket)"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 flex items-center justify-end gap-3">
      <button
        class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === 0"
        @click="emit('previous-page')"
      >
        Anterior
      </button>

      <p class="text-sm text-gray-600">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </p>

      <button
        class="cursor-pointer rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage + 1 >= totalPages"
        @click="emit('next-page')"
      >
        Próxima
      </button>
    </div>
  </div>
</template>
