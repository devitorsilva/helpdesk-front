<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TicketTable from './components/TicketTable.vue'
import { getTickets } from './services/ticketService'
import type { TicketPage, TicketPriority, TicketStatus } from './types/ticket'

const ticketsPage = ref<TicketPage | null>(null)
const selectedStatus = ref<TicketStatus | ''>('')
const selectedPriority = ref<TicketPriority | ''>('')

async function loadTickets() {
  ticketsPage.value = await getTickets(
    selectedStatus.value,
    selectedPriority.value
  )
}

onMounted(async () => {
  await loadTickets()
})

watch([selectedStatus, selectedPriority], async () => {
  await loadTickets()
})
</script>

<template>
  <main>
    <h1>Helpdesk</h1>
    <h3>Gestão de Tickets</h3>

    <div class="container">
      <div class="filters">
        <div class="status">
          <select id="status" v-model="selectedStatus">
            <option value="">Todos os status</option>
            <option value="OPEN">Aberto</option>
            <option value="IN_PROGRESS">Em progresso</option>
            <option value="RESOLVED">Resolvido</option>
            <option value="CLOSED">Fechado</option>
          </select>
        </div>
        <div class="priority">
          <select id="priority" v-model="selectedPriority">
            <option value="">Todas as prioridades</option>
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
      </div>
      <TicketTable v-if="ticketsPage" :tickets="ticketsPage.content" />
    </div>
  </main>
</template>
