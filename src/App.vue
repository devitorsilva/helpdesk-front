<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import PrioritySelect from './components/PrioritySelect.vue'
import StatusSelect from './components/StatusSelect.vue'
import TicketEditModal from './components/TicketEditModal.vue'
import TicketTable from './components/TicketTable.vue'
import { getTickets } from './services/ticketService'
import type {
  Ticket,
  TicketPage,
  TicketPriority,
  TicketStatus,
} from './types/ticket'

const ticketsPage = ref<TicketPage | null>(null)
const currentPage = ref(0)
const selectedStatus = ref<TicketStatus | ''>('')
const selectedPriority = ref<TicketPriority | ''>('')
const selectedTicket = ref<Ticket | null>(null)

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

function handleEditTicket(ticket: Ticket) {
  selectedTicket.value = ticket
}

function handleCloseModal() {
  selectedTicket.value = null
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
          <StatusSelect v-model="selectedStatus"></StatusSelect>
          <PrioritySelect v-model="selectedPriority"></PrioritySelect>
        </div>
      </div>

      <TicketTable
        v-if="ticketsPage && ticketsPage.content.length > 0"
        @next-page="handleNextPage"
        @previous-page="handlePreviousPage"
        @edit-ticket="handleEditTicket"
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
    <TicketEditModal
      v-if="selectedTicket"
      :ticket="selectedTicket"
      @close="handleCloseModal"
    />
  </main>
</template>
