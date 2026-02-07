import React, { useState, useEffect, useCallback } from 'react'
import { usePoints } from '../context/PointsContext'
import './PomodoroTimer.css'

const WORK_SEC = 25 * 60
const SHORT_BREAK_SEC = 5 * 60
const LONG_BREAK_SEC = 15 * 60
const POINTS_PER_POMODORO = 10

type Phase = 'work' | 'shortBreak' | 'longBreak'

export function PomodoroTimer() {
  const { addPoints } = usePoints()
  const [phase, setPhase] = useState<Phase>('work')
  const [secondsLeft, setSecondsLeft] = useState(WORK_SEC)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const totalSec = phase === 'work' ? WORK_SEC : phase === 'shortBreak' ? SHORT_BREAK_SEC : LONG_BREAK_SEC
  const progress = 1 - secondsLeft / totalSec

  const advancePhase = useCallback(() => {
    if (phase === 'work') {
      setCompletedSessions((n) => n + 1)
      addPoints(POINTS_PER_POMODORO)
      setPhase('shortBreak')
      setSecondsLeft(SHORT_BREAK_SEC)
    } else if (phase === 'shortBreak') {
      setPhase('work')
      setSecondsLeft(WORK_SEC)
    } else {
      setPhase('work')
      setSecondsLeft(WORK_SEC)
    }
  }, [phase, addPoints])

  useEffect(() => {
    if (!isRunning) return
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setIsRunning(false)
          advancePhase()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isRunning, advancePhase])

  const switchPhase = (p: Phase) => {
    setIsRunning(false)
    setPhase(p)
    setSecondsLeft(p === 'work' ? WORK_SEC : p === 'shortBreak' ? SHORT_BREAK_SEC : LONG_BREAK_SEC)
  }

  const m = Math.floor(secondsLeft / 60)
  const s = secondsLeft % 60
  const label = phase === 'work' ? 'Focus' : phase === 'shortBreak' ? 'Short break' : 'Long break'

  return (
    <div className="pomodoro">
      <div className="pomodoro__card">
        <div className="pomodoro__tabs">
          {(['work', 'shortBreak', 'longBreak'] as const).map((p) => (
            <button
              key={p}
              className={`pomodoro__tab ${phase === p ? 'active' : ''}`}
              onClick={() => switchPhase(p)}
            >
              {p === 'work' ? 'Focus' : p === 'shortBreak' ? 'Short' : 'Long'}
            </button>
          ))}
        </div>
        <p className="pomodoro__label">{label}</p>
        <div className="pomodoro__ring" style={{ '--progress': progress } as React.CSSProperties}>
          <span className="pomodoro__time">
            {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
          </span>
        </div>
        <div className="pomodoro__actions">
          <button className="pomodoro__btn primary" onClick={() => setIsRunning((r) => !r)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="pomodoro__btn secondary" onClick={() => { setIsRunning(false); setSecondsLeft(phase === 'work' ? WORK_SEC : phase === 'shortBreak' ? SHORT_BREAK_SEC : LONG_BREAK_SEC); }}>
            Reset
          </button>
        </div>
        <p className="pomodoro__hint">+{POINTS_PER_POMODORO} points per completed focus session</p>
        {completedSessions > 0 && (
          <p className="pomodoro__sessions">Sessions today: {completedSessions}</p>
        )}
      </div>
    </div>
  )
}
