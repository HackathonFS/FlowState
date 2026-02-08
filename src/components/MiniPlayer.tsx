import { useEffect, useRef, useState } from 'react'
import './MiniPlayer.css'

type Track = {
  label: string
  src: string
}

export function MiniPlayer() {
  const tracks: Track[] = [
    { label: 'Nojisuma (upbeat)', src: '/music/nojisuma.mp3' },
    { label: 'Delosound (lofi)', src: '/music/delosound.mp3' },
  ]

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)

  const [trackSrc, setTrackSrc] = useState<string>(() => {
    return localStorage.getItem('flowstate_track') ?? tracks[0].src
  })

  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('flowstate_volume')
    return saved ? Math.min(1, Math.max(0, Number(saved))) : 0.35
  })

  // apply volume + persist
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = volume
    localStorage.setItem('flowstate_volume', String(volume))
  }, [volume])

  // persist track
  useEffect(() => {
    localStorage.setItem('flowstate_track', trackSrc)
  }, [trackSrc])

  // keep the UI indicator in sync if user pauses via browser controls (rare)
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return

    try {
      if (a.paused) {
        await a.play()
        setPlaying(true)
      } else {
        a.pause()
        setPlaying(false)
      }
    } catch {
      // autoplay restrictions: user must click
      setPlaying(false)
    }
  }

  const changeTrack = async (src: string) => {
    const a = audioRef.current
    const wasPlaying = a ? !a.paused : false

    setTrackSrc(src)

    if (!a) return
    a.pause()
    a.currentTime = 0

    // wait for src to update, then continue if it was playing
    setTimeout(async () => {
      const a2 = audioRef.current
      if (!a2) return
      a2.volume = volume
      if (wasPlaying) {
        try {
          await a2.play()
          setPlaying(true)
        } catch {
          setPlaying(false)
        }
      }
    }, 0)
  }

  return (
    <>
      {/* Always mounted so audio persists */}
      <audio ref={audioRef} src={trackSrc} loop preload="auto" />

      {/* MINI bubble (always visible) */}
      <button
        className={`music-bubble ${playing ? 'is-playing' : ''}`}
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Close music player' : 'Open music player'}
        title={expanded ? 'Close music' : 'Music'}
        type="button"
      >
        {expanded ? '✕' : '♪'}
      </button>

      {/* Expanded player */}
      <div className={`mini-player ${expanded ? 'show' : ''}`} aria-hidden={!expanded}>
        <div className="mini-player__top">
          <div className="mini-player__heading">
            <div className="mini-player__title">Focus Beats</div>
            <div className="mini-player__sub">keeps playing until paused ✨</div>
          </div>

          <button className="mini-player__play" onClick={toggle} aria-label="Play or pause" type="button">
            {playing ? '⏸' : '▶'}
          </button>
        </div>

        <div className="mini-player__row">
          <label className="mini-player__label">
            Track
            <select
              className="mini-player__select"
              value={trackSrc}
              onChange={(e) => changeTrack(e.target.value)}
              aria-label="Select track"
            >
              {tracks.map((t) => (
                <option key={t.src} value={t.src}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mini-player__row mini-player__row--vol">
          <span className="mini-player__vol-icon">🔊</span>
          <input
            className="mini-player__slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>
    </>
  )
}

