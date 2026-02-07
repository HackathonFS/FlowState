import React, { useState } from 'react'
import { PomodoroTimer } from './PomodoroTimer'
import './StudyCall.css'

export type CallCategory = 'independent' | 'community' | 'subject' | 'similar'

const CALL_CATEGORIES: { id: CallCategory; label: string; desc: string; icon: string }[] = [
  { id: 'independent', label: 'Independent study', desc: 'Quiet focus, everyone on their own', icon: '🔇' },
  { id: 'community', label: 'Study as community', desc: 'Collaborate and chat while studying', icon: '👥' },
  { id: 'subject', label: 'Specific subject', desc: 'Math, CS, languages, etc.', icon: '📚' },
  { id: 'similar', label: 'Similar tasks', desc: 'Same type of work (e.g. essays, coding)', icon: '📋' },
]

export function StudyCall() {
  const [inCall, setInCall] = useState(false)
  const [category, setCategory] = useState<CallCategory | null>(null)

  const startCall = (c: CallCategory) => {
    setCategory(c)
    setInCall(true)
  }

  if (inCall && category) {
    return (
      <div className="study-call study-call--active">
        <div className="study-call__layout">
          <aside className="study-call__sidebar">
            <div className="study-call__category-badge">
              {CALL_CATEGORIES.find((x) => x.id === category)?.icon} {CALL_CATEGORIES.find((x) => x.id === category)?.label}
            </div>
            <div className="study-call__pomodoro">
              <PomodoroTimer />
            </div>
            <button
              type="button"
              className="study-call__leave"
              onClick={() => { setInCall(false); setCategory(null); }}
            >
              Leave call
            </button>
          </aside>
          <section className="study-call__video">
            <div className="study-call__video-placeholder">
              <p>Video area</p>
              <p className="study-call__video-hint">(Your face / peers will appear here)</p>
            </div>
          </section>
        </div>
        <span className="study-call__sparkle">✦</span>
      </div>
    )
  }

  return (
    <div className="study-call">
      <div className="study-call__card">
        <h2 className="study-call__title">Study call</h2>
        <p className="study-call__sub">Video call with shared Pomodoro. Pick a category.</p>
        <ul className="study-call__categories">
          {CALL_CATEGORIES.map((c) => (
            <li key={c.id} className="study-call__category">
              <button
                type="button"
                className="study-call__category-btn"
                onClick={() => startCall(c.id)}
              >
                <span className="study-call__category-icon">{c.icon}</span>
                <span className="study-call__category-label">{c.label}</span>
                <span className="study-call__category-desc">{c.desc}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
