import React, { useState, useEffect } from 'react'
import { DailyProvider, useCallObject, useParticipantIds, useVideoTrack } from '@daily-co/daily-react'
import DailyIframe from '@daily-co/daily-js'
import './StudyCall.css'

const DEMO_ROOM_URL = 'https://flowstate.daily.co/Study'

function VideoTile({ participantId }: { participantId: string }) {
  const videoTrack = useVideoTrack(participantId)
  
  return (
    &lt;div className="video-tile"&gt;
      {videoTrack.track ? (
        &lt;video 
          autoPlay muted playsInline 
          ref={(el) =&gt; { if (el &amp;&amp; videoTrack.track) el.srcObject = new MediaStream([videoTrack.track]) }}
        /&gt;
      ) : (
        &lt;div className="video-tile__placeholder"&gt;Loading...&lt;/div&gt;
      )}
      &lt;div className="video-tile__name"&gt;{participantId === 'local' ? 'You' : 'Peer'}&lt;/div&gt;
    &lt;/div&gt;
  )
}

function CallContent() {
  const callObject = useCallObject()
  const participantIds = useParticipantIds()

  useEffect(() =&gt; {
    if (!callObject) return
    callObject.join({ url: DEMO_ROOM_URL }).catch(console.error)
    return () =&gt; { callObject.leave() }
  }, [callObject])

  return (
    &lt;div className="study-video-grid"&gt;
      {participantIds.map((id) =&gt; (
        &lt;VideoTile key={id} participantId={id} /&gt;
      ))}
      {participantIds.length === 0 &amp;&amp; &lt;p className="waiting-text"&gt;Connecting...&lt;/p&gt;}
    &lt;/div&gt;
  )
}

export function StudyCall() {
  const [inCall, setInCall] = useState(false)
  const [callObject, setCallObject] = useState&lt;ReturnType&lt;typeof DailyIframe.createCallObject&gt; | null&gt;(null)

  const startCall = () =&gt; {
    const newCallObject = DailyIframe.createCallObject()
    setCallObject(newCallObject)
    setInCall(true)
  }

  const leaveCall = () =&gt; {
    callObject?.destroy()
    setCallObject(null)
    setInCall(false)
  }

  if (inCall &amp;&amp; callObject) {
    return (
      &lt;DailyProvider callObject={callObject}&gt;
        &lt;div className="study-call study-call--active"&gt;
          &lt;CallContent /&gt;
          &lt;button className="study-call__leave" onClick={leaveCall}&gt;Leave call&lt;/button&gt;
        &lt;/div&gt;
      &lt;/DailyProvider&gt;
    )
  }

  return (
    &lt;div className="study-call"&gt;
      &lt;div className="study-call__card"&gt;
        &lt;h2 className="study-call__title"&gt;Study call&lt;/h2&gt;
        &lt;button className="study-call__join" onClick={startCall}&gt;Join call&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}
