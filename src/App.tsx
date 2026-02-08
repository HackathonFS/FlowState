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
  // Use a history stack to track navigation (e.g., ['home', 'pomodoro', 'store'])
  const [history, setHistory] = useState<TabId[]>(['home'])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile } = usePoints()

  // The active tab is always the last item in the history stack
  const activeTab = history[history.length - 1]

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'pomodoro', label: 'Timer', icon: '⏱' },
    { id: 'checklist', label: 'Tasks', icon: '✓' },
    { id: 'studycall', label: 'Study call', icon: '📹' },
    { id: 'store', label: 'Store', icon: '🛒' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'character', label: 'Character', icon: '✨' },
  ]

  // Navigate to a new tab by adding it to the history stack
  const navigate = (tabId: TabId) => {
    if (activeTab === tabId) {
      setSidebarOpen(false)
      return
    }
    setHistory((prev) => [...prev, tabId])
    setSidebarOpen(false)
  }

  // Go back to the previous tab by removing the current one
  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev
      return prev.slice(0, -1)
    })
  }

  // Reset navigation to Home
  const goHome = () => {
    setHistory(['home'])
    setSidebarOpen(false)
  }

  return (
    <>
      <div className="app-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <header className="header">
        {/* Group Menu and Back button together */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="header__menu"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Show Back button only if we are not at the start */}
          {history.length > 1 && (
            <button
              className="header__menu"
              aria-label="Go back"
              onClick={goBack}
              style={{ fontSize: '1.2rem', padding: '0 0.5rem' }}
            >
              ⬅
            </button>
          )}
        </div>

        <div 
          className="header__brand" 
          onClick={goHome} 
          style={{ cursor: 'pointer' }}
          title="Return to Home"
        >
          <img
            src="/flowstateicon.png"
            alt="Flow State"
            className="header__logo-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.add('header__logo-fallback--show')
            }}
          />
          <span className="header__logo-fallback">Flow State</span>
        </div>

        <div className="header__points">
          <span className="header__points-value">{profile.points}</span>
          <span className="header__points-label">points</span>
        </div>
      </header>

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="nav nav--sidebar">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`nav__item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => navigate(t.id)}
            >
              <span className="nav__icon">{t.icon}</span>
              <span className="nav__label">{t.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        {activeTab === 'home' && <HomeLanding onEnter={() => navigate('pomodoro')} />}
        {activeTab === 'pomodoro' && <PomodoroTimer />}
        {activeTab === 'checklist' && <Checklist />}
        {activeTab === 'studycall' && <StudyCall />}
        {activeTab === 'store' && <Store />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'character' && <Character />}
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