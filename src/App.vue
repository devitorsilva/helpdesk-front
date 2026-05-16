<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TicketTable from './components/TicketTable.vue'
import { getTickets } from './services/ticketService'
import type { TicketPage, TicketPriority, TicketStatus } from './types/ticket'
import { ticketPriorityLabels, ticketStatusLabels } from './utils/ticketLabels'

const ticketsPage = ref<TicketPage | null>(null)
const currentPage = ref(0)
const selectedStatus = ref<TicketStatus | ''>('')
const selectedPriority = ref<TicketPriority | ''>('')

async function loadTickets() {
  ticketsPage.value = await getTickets(
    selectedStatus.value,
    selectedPriority.value,
    currentPage.value,
    10
  )
}

onMounted(async () => {
  await loadTickets()
})

watch([selectedStatus, selectedPriority], async () => {
  currentPage.value = 0
  await loadTickets()
})

function handlePreviousPage() {
  currentPage.value--
  loadTickets()
}

function handleNextPage() {
  currentPage.value++
  loadTickets()
}
</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <div class="mx-auto max-w-6xl px-4 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Helpdesk</h1>
        <p class="text-sm text-gray-600">Gestão de Tickets</p>
      </div>

      <div class="mb-6 rounded border border-gray-200 bg-white p-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label
              for="status"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <select
              id="status"
              v-model="selectedStatus"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Todos os estados</option>
              <option value="OPEN">{{ ticketStatusLabels.OPEN }}</option>
              <option value="IN_PROGRESS">
                {{ ticketStatusLabels.IN_PROGRESS }}
              </option>
              <option value="RESOLVED">
                {{ ticketStatusLabels.RESOLVED }}
              </option>
              <option value="CLOSED">{{ ticketStatusLabels.CLOSED }}</option>
            </select>
          </div>

          <div>
            <label
              for="priority"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Prioridade
            </label>
            <select
              id="priority"
              v-model="selectedPriority"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Todas as prioridades</option>
              <option value="LOW">{{ ticketPriorityLabels.LOW }}</option>
              <option value="MEDIUM">{{ ticketPriorityLabels.MEDIUM }}</option>
              <option value="HIGH">{{ ticketPriorityLabels.HIGH }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <p v-if="ticketsPage" class="text-sm text-gray-600">
          {{ ticketsPage.totalElements }} registro(s) encontrado(s)
        </p>
      </div>

      <TicketTable
        v-if="ticketsPage && ticketsPage.content.length > 0"
        @next-page="handleNextPage"
        @previous-page="handlePreviousPage"
        :tickets="ticketsPage.content"
        :current-page="currentPage"
        :total-pages="ticketsPage.totalPages"
      />

      <div
        v-else
        class="rounded border border-gray-200 bg-white p-6 text-center text-sm text-gray-500"
      >
        Não existem registros para serem exibidos.
      </div>
    </div>
  </main>
</template>
