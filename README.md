# Helpdesk Frontend

Frontend do projeto de helpdesk construído com Vue 3 e TypeScript, consumindo a API Spring Boot.

## Stack

- Vue 3
- TypeScript
- Vite
- Axios
- Tailwind CSS

## Funcionalidades

- Listagem de tickets
- Filtro por status
- Filtro por prioridade
- Paginação
- Edição de ticket em modal
- Integração com API REST

## Como rodar

```bash
npm install
npm run dev
```

Aplicação disponível em:

- `http://localhost:5173`

## Integração

O frontend espera a API rodando em:

- `http://localhost:8080`

## Fluxos implementados

- Carregar tickets ao abrir a página
- Filtrar tickets por status e prioridade
- Navegar entre páginas
- Editar ticket e atualizar a listagem
