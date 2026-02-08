import React, { useState } from 'react'
import { PointsProvider, usePoints } from './context/PointsContext'
import { HomeLanding } from './components/HomeLanding'
import { PomodoroTimer } from './components/PomodoroTimer'
import { Checklist } from './components/Checklist'
import { StudyCall } from './components/StudyCall'
import { Store } from './components/Store'
import { Leaderboard } from './components/Leaderboard'
import { Character } from './components/Character'
import type { TabId } from './types'

function AppContent() {
  const [tab, setTab] = useState<TabId>('home')
  const { profile } = usePoints()

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'pomodoro', label: 'Timer', icon: '⏱' },
    { id: 'checklist', label: 'Tasks', icon: '✓' },
    { id: 'studycall', label: 'Study call', icon: '📹' },
    { id: 'store', label: 'Store', icon: '🛒' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'character', label: 'Character', icon: '✨' },
  ]

  return (
    <>
      <div className="app-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <header className="header">
        <div className="header__brand">
          <img
            src="/flowstateicon.png"
            alt="Flow State"
            className="header__logo-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.add('header__logo-fallback--show'); }}
          />
          <span className="header__logo-fallback">Flow State</span>
        </div>
        <div className="header__points">
          <span className="header__points-value">{profile.points}</span>
          <span className="header__points-label">points</span>
        </div>
      </header>
      <nav className="nav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`nav__item ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="nav__icon">{t.icon}</span>
            <span className="nav__label">{t.label}</span>
          </button>
        ))}
      </nav>
      <main className="main">
        {tab === 'home' && <HomeLanding onEnter={() => setTab('pomodoro')} />}
        {tab === 'pomodoro' && <PomodoroTimer />}
        {tab === 'checklist' && <Checklist />}
        {tab === 'studycall' && <StudyCall />}
        {tab === 'store' && <Store />}
        {tab === 'leaderboard' && <Leaderboard />}
        {tab === 'character' && <Character />}
      </main>
    </>
  )
}

export default function App() {
  return (
    <PointsProvider>
      <AppContent />
    </PointsProvider>
  )
}
