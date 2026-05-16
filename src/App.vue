<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TicketTable from './components/TicketTable.vue'
import { getTickets } from './services/ticketService'
import type { TicketPage } from './types/ticket'

const ticketsPage = ref<TicketPage | null>(null)

onMounted(async () => {
  ticketsPage.value = await getTickets()
})
</script>

<template>
  <main>
    <h1>Helpdesk</h1>
    <h3>Gestão de Tickets</h3>

    <TicketTable v-if="ticketsPage" :tickets="ticketsPage.content" />
  </main>
</template>
