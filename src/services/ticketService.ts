import type { TicketPage, TicketPriority, TicketStatus } from '../types/ticket'
import { api } from './api.ts'

export async function getTickets(
  status?: TicketStatus | '',
  priority?: TicketPriority | ''
): Promise<TicketPage> {
  const response = await api.get<TicketPage>('/tickets', {
    params: {
      status: status || undefined,
      priority: priority || undefined,
    },
  })
  return response.data
}
