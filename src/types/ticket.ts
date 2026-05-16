export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  requesterName: string;
  requesterEmail: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type TicketPage = {
  content: Ticket[];
  totalPages: number;
  totalElementes: number;
  size: number;
  number: number;
};
