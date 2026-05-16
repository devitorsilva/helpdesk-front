import type { TicketPriority, TicketStatus } from '../types/ticket'

export const ticketStatusLabels: Record<TicketStatus, string> = {
  OPEN: 'Aberto',
  IN_PROGRESS: 'Em progresso',
  RESOLVED: 'Resolvido',
  CLOSED: 'Fechado',
}

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  HIGH: 'Alta',
  MEDIUM: 'Média',
  LOW: 'Baixa',
}
