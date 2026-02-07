import React from 'react'
import './HomeLanding.css'

type HomeLandingProps = {
  onEnter: () => void
}

export function HomeLanding({ onEnter }: HomeLandingProps) {
  return (
    <div className="landing">
      <div className="landing__bg" aria-hidden="true" />
      <div className="landing__vignette" aria-hidden="true" />
      <div className="landing__content">
        <p className="landing__tagline">Study & Productivity</p>
        <button type="button" className="landing__cta" onClick={onEnter}>
          Enter
        </button>
        <span className="landing__sparkle landing__sparkle--1">✦</span>
        <span className="landing__sparkle landing__sparkle--2">✦</span>
        <span className="landing__sparkle landing__sparkle--3">✦</span>
      </div>
    </div>
  )
}
