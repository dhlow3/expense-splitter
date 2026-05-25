# Expense Splitter

A minimal web app for splitting expenses among a group and calculating who owes whom.

## Features

- Add and remove participants
- Record expenses with a payer and a custom split
- Automatic balance calculation with simplified debt settlement
- No float drift — amounts stored as integer cents

## Tech Stack

- **React 19** — UI with `useReducer` + Context (no external state management)
- **Vite 8** — dev server and build tool
- **Tailwind CSS v4** — utility-first styling

## Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other commands

| Command | Description |
|---|---|
| `npm run build` | Production build → `app/dist/` |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
app/src/
├── main.jsx                  Entry point
├── index.css                 Tailwind import
├── components/
│   ├── App.jsx               Layout shell + context provider
│   ├── ParticipantPanel.jsx  Add/remove participants
│   ├── ExpensePanel.jsx      Add/remove expenses
│   └── BalancePanel.jsx      Computed settlement list
├── context/
│   └── AppContext.jsx        useReducer state + useApp() hook
├── reducer/
│   └── appReducer.js         ADD/REMOVE_PARTICIPANT, ADD/REMOVE_EXPENSE
└── utils/
    └── balanceCalc.js        Pure balance math and greedy debt settlement
```

## Deployment

Configured for [Vercel](https://vercel.com) via `vercel.json` at the repo root. Push to a connected GitHub repository and Vercel picks up the build configuration automatically.

Build command: `cd app && npm install && npm run build`  
Output directory: `app/dist`
