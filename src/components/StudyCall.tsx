import React, { useState, useRef, useCallback, useEffect } from 'react'
import DailyIframe from '@daily-co/daily-js'
import './StudyCall.css'

const ROOM_URL = 'https://flowstate.daily.co/Study'

export function StudyCall() {
  const [inCall, setInCall] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<ReturnType<typeof DailyIframe.createFrame> | null>(null)

  const joinCall = useCallback(() => {
    if (!wrapperRef.current) return
    const frame = DailyIframe.createFrame(wrapperRef.current, {
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '8px',
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    })
    frame.join({ url: ROOM_URL })
    frame.on('left-meeting', () => {
      frame.destroy()
      frameRef.current = null
      setInCall(false)
    })
    frameRef.current = frame
    setInCall(true)
  }, [])

  useEffect(() => {
    return () => {
      frameRef.current?.destroy()
    }
  }, [])

  return (
    <div className="study-call">
      {!inCall ? (
        <div className="study-call__card">
          <h2 className="study-call__title">Study Call</h2>
          <p className="study-call__desc">Join a video call with your study group</p>
          <button className="study-call__join" onClick={joinCall}>
            Enter Study Call
          </button>
        </div>
      ) : (
        <div className="study-call__video-wrap" ref={wrapperRef} />
      )}
    </div>
  )
}
