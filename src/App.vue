<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import ConfirmationDialog from './components/ConfirmationDialog.vue'
import PrioritySelect from './components/PrioritySelect.vue'
import StatusSelect from './components/StatusSelect.vue'
import TicketEditModal from './components/TicketEditModal.vue'
import TicketTable from './components/TicketTable.vue'
import ToastMessage from './components/ToastMessage.vue'
import {
  deleteTicket,
  getTickets,
  updateTicket,
} from './services/ticketService'
import type {
  Ticket,
  TicketPage,
  TicketPriority,
  TicketStatus,
  UpdateTicketRequest,
} from './types/ticket'

const ticketsPage = ref<TicketPage | null>(null)
const currentPage = ref(0)
const selectedStatus = ref<TicketStatus | ''>('')
const selectedPriority = ref<TicketPriority | ''>('')
const selectedTicket = ref<Ticket | null>(null)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const isLoading = ref(false)
const isEditing = ref(false)
const isDeleting = ref(false)
const isUpdating = ref(false)

async function loadTickets() {
  try {
    isLoading.value = true
    ticketsPage.value = await getTickets(
      selectedStatus.value,
      selectedPriority.value,
      currentPage.value,
      10
    )
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

onMounted(async () => {
  await loadTickets()
})

watch([selectedStatus, selectedPriority], async () => {
  currentPage.value = 0
  await loadTickets()
})

function handlePreviousPage() {
  currentPage.value--
  loadTickets()
}

function handleNextPage() {
  currentPage.value++
  loadTickets()
}

function handleEditTicket(ticket: Ticket) {
  isEditing.value = true
  selectedTicket.value = ticket
}

function handleCloseModal() {
  isUpdating.value = false
  isDeleting.value = false
  isEditing.value = false
  selectedTicket.value = null
}

async function handleUpdateTicket(request: UpdateTicketRequest) {
  if (!selectedTicket.value) return

  try {
    isUpdating.value = true
    await updateTicket(selectedTicket.value.id, request)
    showToast('Tickets atualizado')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data

      const message =
        apiError?.errors?.[0] || apiError?.message || 'Erro ao atualizar ticket'

      showToast(message, 'error')
      return
    }
    showToast('Erro ao atualizar ticket', 'error')
  }

  handleCloseModal()
  await loadTickets()
}

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toastMessage.value = message
  toastType.value = type

  setTimeout(() => {
    closeToast()
  }, 3000)
}

function closeToast() {
  toastMessage.value = ''
}

function handleOpenDeleteTicket(ticket: Ticket) {
  selectedTicket.value = ticket
  isDeleting.value = true
}
async function handleDeleteTicket(id: number) {
  if (!id) return
  try {
    isUpdating.value = true
    await deleteTicket(id)
    showToast('Ticket excluído')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data
      const message =
        apiError?.errors?.[0] || apiError?.message || 'Erro ao excluir ticket'

      showToast(message, 'error')
      return
    }
    showToast('Erro ao excluir ticket', 'error')
  } finally {
    handleCloseModal()
  }
  await loadTickets()
}
</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <div class="mx-auto max-w-6xl px-4 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Helpdesk</h1>
        <p class="text-sm text-gray-600">Gestão de Tickets</p>
      </div>

      <div class="mb-6 rounded border border-gray-200 bg-white p-4">
        <div class="grid gap-4 md:grid-cols-2">
          <StatusSelect v-model="selectedStatus"></StatusSelect>
          <PrioritySelect v-model="selectedPriority"></PrioritySelect>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="rounded border border-gray-200 bg-white p-6 text-center text-sm text-gray-500"
      >
        Carregando tickets...
      </div>

      <TicketTable
        v-else-if="ticketsPage && ticketsPage.content.length > 0"
        @next-page="handleNextPage"
        @previous-page="handlePreviousPage"
        @edit-ticket="handleEditTicket"
        @delete-ticket="handleOpenDeleteTicket"
        :tickets="ticketsPage.content"
        :current-page="currentPage"
        :total-pages="ticketsPage.totalPages"
      />

      <div
        v-else
        class="rounded border border-gray-200 bg-white p-6 text-center text-sm text-gray-500"
      >
        Não existem registros para serem exibidos.
      </div>
    </div>
    <TicketEditModal
      v-if="isEditing"
      :ticket="selectedTicket"
      :is-updating="isUpdating"
      @close="handleCloseModal"
      @save="handleUpdateTicket"
    />

    <ConfirmationDialog
      v-if="isDeleting"
      :ticket="selectedTicket"
      :is-updating="isUpdating"
      @close="handleCloseModal"
      @delete="handleDeleteTicket"
    />
    <ToastMessage
      v-if="toastMessage"
      :message="toastMessage"
      :type="toastType"
      @close="closeToast"
    />
  </main>
</template>
