import React from 'react'
import { useTimer } from '../context/TimerContext'
import './MiniTimer.css'

interface MiniTimerProps {
  onExpand: () => void
}

export function MiniTimer({ onExpand }: MiniTimerProps) {
  const { secondsLeft, phase, isRunning, toggleTimer } = useTimer()

  // Format time mm:ss
  const m = Math.floor(secondsLeft / 60)
  const s = secondsLeft % 60
  const timeString = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

  // Only show if timer has started or changed from default
  // (Optional: remove this check if you want it always visible)
  const hasStarted = secondsLeft < (phase === 'work' ? 25*60 : phase === 'shortBreak' ? 5*60 : 15*60)
  
  // If user hasn't started anything and it's paused, maybe hide it? 
  // For now, let's always show it if the user is in a "session" or explicitly running.
  if (!isRunning && !hasStarted) return null 

  return (
    <div className={`mini-timer ${isRunning ? 'running' : 'paused'}`}>
      <div className="mini-timer__info" onClick={onExpand}>
        <span className="mini-timer__phase">
          {phase === 'work' ? '༄ Focus' : '☕ Break'}
        </span>
        <span className="mini-timer__time">{timeString}</span>
      </div>
      
      <button 
        className="mini-timer__btn"
        onClick={(e) => {
          e.stopPropagation()
          toggleTimer()
        }}
      >
        {isRunning ? '⏸' : '▶'}
      </button>
    </div>
  )
}