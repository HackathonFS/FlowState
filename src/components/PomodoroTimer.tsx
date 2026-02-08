import React from 'react'
import { useTimer } from '../context/TimerContext'
import './PomodoroTimer.css'

export function PomodoroTimer() {
  const { 
    phase, 
    secondsLeft, 
    isRunning, 
    toggleTimer, 
    resetTimer, 
    switchPhase, 
    totalSec, 
    completedSessions 
  } = useTimer()

  const progress = 1 - secondsLeft / totalSec
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
          <button className="pomodoro__btn primary" onClick={toggleTimer}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="pomodoro__btn secondary" onClick={resetTimer}>
            Reset
          </button>
        </div>
        
        <p className="pomodoro__hint">+10 points per completed focus session</p>
        
        {completedSessions > 0 && (
          <p className="pomodoro__sessions">Sessions today: {completedSessions}</p>
        )}
      </div>
    </div>
  )
}