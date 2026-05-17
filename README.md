# Helpdesk Frontend

![Vue 3](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

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
- Ordenação por cabeçalho da tabela
- Criação de ticket em modal
- Edição de ticket em modal
- Exclusão com confirmação
- Toast de sucesso e erro
- Estados de loading e saving
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
- Ordenar por colunas da tabela
- Criar ticket e recarregar a listagem
- Editar ticket e atualizar a listagem
- Excluir ticket com confirmação
