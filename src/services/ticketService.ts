import type {
  Ticket,
  TicketPage,
  TicketPriority,
  TicketStatus,
  UpdateTicketRequest,
} from '../types/ticket'
import { api } from './api.ts'

export async function getTickets(
  status?: TicketStatus | '',
  priority?: TicketPriority | '',
  page: number = 0,
  size: number = 10
): Promise<TicketPage> {
  const response = await api.get<TicketPage>('/tickets', {
    params: {
      status: status || undefined,
      priority: priority || undefined,
      page: page,
      size: size,
    },
  })
  return response.data
}

export async function updateTicket(
  id: number,
  request: UpdateTicketRequest
): Promise<Ticket> {
  const response = await api.patch<Ticket>(`/tickets/${id}`, request)
  return response.data
}
