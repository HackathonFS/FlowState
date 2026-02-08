import { useState } from 'react'
import './HomeLanding.css'

const TUTORIAL_STORAGE_KEY = 'flow-state-tutorial-done'

type HomeLandingProps = {
  onOpenSidebar: () => void
}

const INSTRUCTIONS = [
  {
    title: 'Welcome to Flow State',
    body: 'A study app to stay focused, earn points, and customize your character. Use the timer, tasks, and study calls to build habits.',
  },
  {
    title: 'Navigate',
    body: 'Open the menu (☰) to jump between Timer, Tasks, Study call, Store, Leaderboard, and Character. Use the back arrow to return.',
  },
  {
    title: 'How it works',
    body: 'Complete tasks and study sessions to earn points. Spend points in the Store or Character tab on accessories and characters. Compete on the Leaderboard by community or college.',
  },
  {
    title: 'Rules',
    body: 'Stay muted in silent study rooms. Be respectful in community calls. Your progress is saved locally on this device.',
  },
]

function getTutorialDone(): boolean {
  try {
    return localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function setTutorialDone() {
  try {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')
  } catch {}
}

export function HomeLanding({ onOpenSidebar }: HomeLandingProps) {
  const [step, setStep] = useState(0)
  const [tutorialDone, setTutorialDoneState] = useState(() => getTutorialDone())

  const showInstructions = !tutorialDone && step < INSTRUCTIONS.length
  const isLastStep = step === INSTRUCTIONS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      setTutorialDone()
      setTutorialDoneState(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleSkip = () => {
    setTutorialDone()
    setTutorialDoneState(true)
  }

  const showHomeContent = tutorialDone || step >= INSTRUCTIONS.length

  return (
    <div className="landing">
      <div className="landing__bg" aria-hidden="true" />
      <div className="landing__vignette" aria-hidden="true" />
      <div className={`landing__content ${showHomeContent && !showInstructions ? 'landing__content--home' : ''}`}>
        {showInstructions && (
          <div className="landing__instructions">
            <h2 className="landing__inst-title">{INSTRUCTIONS[step].title}</h2>
            <p className="landing__inst-body">{INSTRUCTIONS[step].body}</p>
            <div className="landing__inst-actions">
              <button type="button" className="landing__btn secondary" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" className="landing__btn primary" onClick={handleNext}>
                {isLastStep ? 'Enter' : 'Next'}
              </button>
            </div>
            <div className="landing__dots">
              {INSTRUCTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`landing__dot ${i === step ? 'active' : ''}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        )}
        {showHomeContent && !showInstructions && (
          <button type="button" className="landing__cta landing__explore" onClick={onOpenSidebar}>
            Explore
          </button>
        )}
        <span className="landing__sparkle landing__sparkle--1">✦</span>
        <span className="landing__sparkle landing__sparkle--2">✦</span>
        <span className="landing__sparkle landing__sparkle--3">✦</span>
      </div>
    </div>
  )
}
