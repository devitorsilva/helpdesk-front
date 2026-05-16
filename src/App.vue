<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

    <p v-if="ticketsPage">Total de tickets: {{ ticketsPage.totalElements }}</p>

    <ul v-if="ticketsPage">
      <li v-for="ticket in ticketsPage.content" :key="ticket.id">
        {{ ticket.title }}
      </li>
    </ul>
  </main>
</template>
