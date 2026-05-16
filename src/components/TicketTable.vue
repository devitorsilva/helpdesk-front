<script setup lang="ts">
import type { Ticket } from '../types/ticket'
import { ticketPriorityLabels, ticketStatusLabels } from '../utils/ticketLabels'

defineProps<{
  tickets: Ticket[]
}>()
</script>

<template>
  <table v-if="tickets && tickets.length > 0">
    <thead>
      <tr>
        <th>Título</th>
        <th>Estado</th>
        <th>Prioridade</th>
        <th>Responsável</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.id">
        <td>{{ ticket.title }}</td>
        <td>{{ ticketStatusLabels[ticket.status] }}</td>
        <td>{{ ticketPriorityLabels[ticket.priority] }}</td>
        <td>{{ ticket.assignedTo ?? 'Não atribuído' }}</td>
        <td>
          <button>Editar</button>
          <button>Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>Não existem registros para serem exibidos.</p>
</template>
