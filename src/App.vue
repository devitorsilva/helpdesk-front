<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import ConfirmationDialog from './components/ConfirmationDialog.vue'
import PrioritySelect from './components/PrioritySelect.vue'
import StatusSelect from './components/StatusSelect.vue'
import TicketCreateModal from './components/TicketCreateModal.vue'
import TicketEditModal from './components/TicketEditModal.vue'
import TicketTable from './components/TicketTable.vue'
import ToastMessage from './components/ToastMessage.vue'
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from './services/ticketService'
import type {
  CreateTicketRequest,
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
const isSubmitting = ref(false)
const isCreating = ref(false)
const selectedSortField = ref<
  'title' | 'status' | 'priority' | 'assignedTo' | 'createdAt'
>('createdAt')
const selectedSortDirection = ref<'asc' | 'desc'>('desc')

function handleSortColumn(
  field: 'title' | 'statusOrder' | 'priorityOrder' | 'assignedTo'
) {
  if (selectedSortField.value !== field) {
    selectedSortField.value = field
    selectedSortDirection.value = 'asc'
  } else if (selectedSortDirection.value === 'asc') {
    selectedSortDirection.value = 'desc'
  } else {
    selectedSortField.value = 'createdAt'
    selectedSortDirection.value = 'desc'
  }

  currentPage.value = 0
  loadTickets()
}

async function loadTickets() {
  try {
    isLoading.value = true
    ticketsPage.value = await getTickets(
      selectedStatus.value,
      selectedPriority.value,
      currentPage.value,
      10,
      `${selectedSortField.value},${selectedSortDirection.value}`
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
  isSubmitting.value = false
  isDeleting.value = false
  isEditing.value = false
  isCreating.value = false
  selectedTicket.value = null
}

async function handleUpdateTicket(request: UpdateTicketRequest) {
  if (!selectedTicket.value) return

  try {
    isSubmitting.value = true
    await updateTicket(selectedTicket.value.id, request)
    showToast('Ticket atualizado')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data

      const message =
        apiError?.errors?.[0] || apiError?.message || 'Erro ao atualizar ticket'

      showToast(message, 'error')
      isSubmitting.value = false

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
}

function closeToast() {
  toastMessage.value = ''
}

function handleOpenDeleteTicket(ticket: Ticket) {
  selectedTicket.value = ticket
  isDeleting.value = true
}

function handleOpenCreateModal() {
  isCreating.value = true
}

async function handleCreateTicket(request: CreateTicketRequest) {
  if (!request) return

  try {
    isSubmitting.value = true
    await createTicket(request)
    showToast('Ticket criado')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data
      const message =
        apiError?.errors?.[0] || apiError?.message || 'Erro ao criar ticket'

      showToast(message, 'error')
      isSubmitting.value = false
      return
    }
    showToast('Erro ao criar ticket', 'error')
  }

  handleCloseModal()
  await loadTickets()
}

async function handleDeleteTicket(id: number) {
  if (!id) return
  try {
    isSubmitting.value = true
    await deleteTicket(id)
    showToast('Ticket excluído')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data
      const message =
        apiError?.errors?.[0] || apiError?.message || 'Erro ao excluir ticket'

      showToast(message, 'error')
      isSubmitting.value = false

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
        <div class="grid gap-4 md:grid-cols-3 md:items-end">
          <StatusSelect v-model="selectedStatus" />
          <PrioritySelect v-model="selectedPriority" />
          <button
            type="button"
            class="h-10 cursor-pointer rounded flex-end bg-blue-600 px-4 text-sm text-white hover:bg-blue-700 md:justify-self-end"
            @click="handleOpenCreateModal"
          >
            Criar Ticket
          </button>
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
        @sort-column="handleSortColumn"
        :sort-direction="selectedSortDirection"
        :sort-field="selectedSortField"
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
      :is-submitting="isSubmitting"
      @close="handleCloseModal"
      @save="handleUpdateTicket"
    />
    <TicketCreateModal
      v-if="isCreating"
      :is-submitting="isSubmitting"
      @close="handleCloseModal"
      @save="handleCreateTicket"
    />

    <ConfirmationDialog
      v-if="isDeleting"
      :ticket="selectedTicket"
      :is-submitting="isSubmitting"
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
