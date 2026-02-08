import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePoints } from './PointsContext'

// Configuration
const WORK_SEC = 25 * 60
const SHORT_BREAK_SEC = 5 * 60
const LONG_BREAK_SEC = 15 * 60
const POINTS_PER_POMODORO = 10

type Phase = 'work' | 'shortBreak' | 'longBreak'

interface TimerContextType {
  phase: Phase
  secondsLeft: number
  isRunning: boolean
  completedSessions: number
  toggleTimer: () => void
  resetTimer: () => void
  switchPhase: (p: Phase) => void
  totalSec: number
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { addPoints } = usePoints()
  
  const [phase, setPhase] = useState<Phase>('work')
  const [secondsLeft, setSecondsLeft] = useState(WORK_SEC)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const totalSec = phase === 'work' ? WORK_SEC : phase === 'shortBreak' ? SHORT_BREAK_SEC : LONG_BREAK_SEC

  // Function to handle phase completion
  const completePhase = useCallback(() => {
    setIsRunning(false)
    if (phase === 'work') {
      addPoints(POINTS_PER_POMODORO)
      setCompletedSessions(p => p + 1)
      setPhase('shortBreak')
      setSecondsLeft(SHORT_BREAK_SEC)
    } else {
      // Break is over, back to work
      setPhase('work')
      setSecondsLeft(WORK_SEC)
    }
  }, [phase, addPoints])

  // The actual timer tick
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          completePhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, completePhase])

  // Actions
  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setIsRunning(false)
    setSecondsLeft(totalSec)
  }

  const switchPhase = (p: Phase) => {
    setIsRunning(false)
    setPhase(p)
    setSecondsLeft(p === 'work' ? WORK_SEC : p === 'shortBreak' ? SHORT_BREAK_SEC : LONG_BREAK_SEC)
  }

  return (
    <TimerContext.Provider value={{
      phase,
      secondsLeft,
      isRunning,
      completedSessions,
      toggleTimer,
      resetTimer,
      switchPhase,
      totalSec
    }}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (!context) throw new Error('useTimer must be used within a TimerProvider')
  return context
}