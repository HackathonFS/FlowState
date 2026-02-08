# Flow State — Study & Productivity App

A focused study and productivity app with an aesthetic UI, Pomodoro timer, points-based rewards, and community leaderboards.

## Features

- **Pomodoro Timer** — Focus (25 min), short break (5 min), long break (15 min). Earn points for each completed focus session.
- **Checklist** — Add your own tasks and set point rewards. Mark tasks done to earn points.
- **Study Call** — Join video study sessions (Community, Independent, or Subject-specific) powered by Jitsi.
- **Points & Character** — Spend points on:
  - **Nametags** — Default, Gold nameplate, Crown nameplate (shown on leaderboard).
  - **Accessories** — Headphones, coffee, book, star pin, lightning (shown on your character).
  - **Characters** — Default, Night owl, Swift fox.
- **Leaderboard** — Switch between Community and College. Select a community or college to see rankings. Top ranks can show crown or gold nameplate.

## Run locally

1. **Install dependencies**
   This project uses `@jitsi/react-sdk` for video calls. Run the following command to install it along with other dependencies:
   ```bash
   npm install
(If you are adding Jitsi to an existing project manually, run npm install @jitsi/react-sdk)

Start the development server

 ```bash
npm run dev
Open the app
Visit http://localhost:5173 in your browser.

Build
To build the app for production:


npm run build
npm run preview
Data is stored in the browser (localStorage). No backend required for the current version.
