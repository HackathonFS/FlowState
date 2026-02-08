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

## Inspiration
- We wanted to create a web application that transcends basic to-do lists by leveraging proven behavioral psychology.
- Our goal is to transform how users achieve tasks through accountability mechanisms and reward systems

## What it does
- Video chat feature with categorized study rooms (independent study, group study, subject-specific, similar tasks)
- Users create customizable to-do lists where each task earns point values upon completion
- Points unlock character customization options (accessories, outfits, characters) and exclusive features
- Community-based video study sessions using the Pomodoro Technique (minute work intervals + breaks)
- Leaderboards for communities and colleges with special rewards (crown for top performers)

## Background & research
- Users create customizable to-do lists where each task earns points upon completion

Psychological Mechanism: 
- This enforces operant conditioning where the brain learns to associate tasks completed with rewards 
- It creates a positive feedback loop that encourages users to keep working, similar to how achievement systems in video games influence players to keep playing (same mechanism that drives slot machine engagement).

Research: 
- Badges, leaderboards, and performance graphs positively affect competence need satisfaction and perceived task meaningfulness [ResearchGate]

Self-Determination Theory: 
- Points provide "competence satisfaction" which is intrinsic motivation from seeing tangible evidence of capabilities
- Character customization improves engagement by letting users feel more in control of their experience, promoting ownership and accomplishment [PubMed]

Pomodoro and Community Influence: 
- When users work alongside peers in synchronized Pomodoro sessions, they benefit from social facilitation: the well-documented phenomenon where the presence of others enhances performance on routine tasks.
- The combination of points and social accountability triggers dopamine release, (the "feel good" chemical) when earning rewards, creating positive associations with productivity

## How we built it
- We used Cursor to scaffold the initial structure of the web application and accelerate early development. From there, we focused heavily on refining the app’s aesthetic and user experience, designing visuals and UI elements using Canva and other online design resources.
- The majority of development was completed in Visual Studio Code, where we implemented features, refined interactions, and integrated assets. We also leveraged AI-assisted tools such as Claude and Gemini as supplemental resources to help debug, generate ideas, and speed up specific implementation tasks throughout the build process.

## Challenges we ran into
- One of the main challenges we faced was deciding to build the application in TypeScript, as most of our team was more familiar with HTML and CSS. Adjusting to a strongly typed environment introduced a learning curve and required us to rethink how we structured our code, but it ultimately resulted in a more organized and maintainable codebase.
- We also encountered difficulties when integrating a video chat feature into the app. Early approaches proved to be complex and resource-intensive, which led us to pivot toward a simpler video conferencing API that better supported performance while still meeting our needs. In addition, ensuring real-time synchronization of Pomodoro timers across multiple users during study calls required careful state management to keep timers consistent and reliable. Balancing the demands of video conferencing with active timers also presented performance challenges.
- Finally, we worked to strike the right UI/UX balance, aiming to create an interface that was visually appealing while keeping productivity tools intuitive and easily accessible. Addressing these challenges helped shape both our technical decisions and the overall user experience of the application.

## Accomplishments that we're proud of
- We placed a strong emphasis on UI design and aesthetics, recognizing that an app centered around traditionally monotonous activities like studying or working needs to be visually engaging to attract and retain users. We are proud of how we were able to create an interface that feels both appealing and motivating, using gamification elements to make productivity feel more rewarding. By combining aesthetic design with interactive features, we believe we successfully transformed focus and studying into an experience users actually enjoy returning to.

## What we learned
- In the process of creating this website, we learned vast amounts of UI and how to keep aesthetics consistent along the different pages. 
- We were able to design categorized video chat rooms that accommodate different study preferences (independent, collaborative, subject-specific)
- We were able to use behavioral science and used three major psychological principles (operant conditioning, social facilitation, Pomodoro) into one cohesive platform
- Created a gamification system that enhances motivation with a reward system
- Successfully integrated three major psychological principles (operant conditioning, social facilitation, Pomodoro) into one cohesive platform


## What's next for Flow State
- In the future we want to implement geolocation services so users are able to receive a local community if they wish to. This way they can make friends and keep studying with them when they want to. We will integrate a database for a vast number of profiles and hopefully provide a safe and productive community for everyone!

## Sources:
- ResearchGate:
Matthews, G. (2015). Goal Research Summary. Dominican University of California.
Widely cited study on accountability and goal completion
Shows 76% success rate for written goals with accountability vs. 43% without
- PubMed:
LaBrie, J. W., et al. (2015). PNF 2.0? Initial evidence that gamification can increase the efficacy of brief, web-based personalized normative feedback alcohol interventions. Addictive Behaviors, 36(1-2), 1-8.
PMID: 27978426
Randomized study of 237 college students showing gamified intervention with point-based rewards significantly reduced alcohol use at two-week follow-up compared to standard intervention AFCPE



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
