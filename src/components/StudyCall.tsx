import React, { useState } from 'react'
import './StudyCall.css'

const DEMO_ROOM_URL = 'https://flowstate.daily.co/Study'



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

  if (inCall) {
    return (
      &lt;div className="study-call study-call--active"&gt;
        &lt;iframe
          src={DEMO_ROOM_URL}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="study-call__iframe"
        /&gt;
        &lt;button className="study-call__leave" onClick={leaveCall}&gt;Leave call&lt;/button&gt;
      &lt;/div&gt;
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
