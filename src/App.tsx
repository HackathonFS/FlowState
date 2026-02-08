import { useState } from 'react'
import { PointsProvider, usePoints } from './context/PointsContext'
import { TimerProvider } from './context/TimerContext' // Import new provider
import { HomeLanding } from './components/HomeLanding'
import { PomodoroTimer } from './components/PomodoroTimer'
import { MiniTimer } from './components/MiniTimer' // Import MiniTimer
import { Checklist } from './components/Checklist'
import { StudyCall } from './components/StudyCall'
import { Store } from './components/Store'
import { Leaderboard } from './components/Leaderboard'
import { Character } from './components/Character'
import type { TabId } from './types'
import { MiniPlayer } from './components/MiniPlayer'


function AppContent() {
  const [history, setHistory] = useState<TabId[]>(['home'])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile } = usePoints()

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

  const navigate = (tabId: TabId) => {
    if (activeTab === tabId) {
      setSidebarOpen(false)
      return
    }
    setHistory((prev) => [...prev, tabId])
    setSidebarOpen(false)
  }

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev
      return prev.slice(0, -1)
    })
  }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="header__menu"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

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
        {activeTab === 'home' && (
          <HomeLanding onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        {activeTab === 'pomodoro' && <PomodoroTimer />}
        {activeTab === 'checklist' && <Checklist />}
        {activeTab === 'studycall' && <StudyCall />}
        {activeTab === 'store' && <Store />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'character' && <Character />}
      </main>
      
      <MiniPlayer />


      {/* Show Mini Timer on all pages EXCEPT the main Pomodoro page */}
      {activeTab !== 'pomodoro' && (
        <MiniTimer onExpand={() => navigate('pomodoro')} />
      )}
    </>
  )
}

export default function App() {
  return (
    <PointsProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </PointsProvider>
  )
}
