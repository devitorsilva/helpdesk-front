import type { TicketPage } from '../types/ticket'
import { api } from './api.ts'

export async function getTickets(): Promise<TicketPage> {
  const response = await api.get<TicketPage>('/tickets')
  return response.data
}
