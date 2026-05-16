<script setup lang="ts">
import type { Ticket } from '../types/ticket'

defineProps<{
  tickets: Ticket[]
}>()
</script>
<template>
  <table v-if="tickets">
    <thead>
      <th>Título</th>
      <th>Estado</th>
      <th>Prioridade</th>
      <th>Responsável</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.id">
        <td>{{ ticket.title }}</td>
        <td>{{ ticket.status }}</td>
        <td>{{ ticket.priority }}</td>
        <td>{{ ticket.assignedTo ?? 'Não atribuído' }}</td>
        <td>
          <button>Editar</button>
          <button>Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
