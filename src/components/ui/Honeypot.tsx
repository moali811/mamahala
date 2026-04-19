'use client';

import { useEffect, useRef } from 'react';

/**
 * Invisible honeypot fields for bot detection.
 * Renders two hidden inputs:
 *  - _hp: a text field bots will auto-fill (humans never see it)
 *  - _t:  timestamp set on mount so the server can detect instant submissions
 *
 * Usage: place <Honeypot /> inside any <form>, then include
 * _hp and _t in the JSON body sent to the API.
 */
export default function Honeypot() {
  const tRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tRef.current) tRef.current.value = String(Date.now());
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
      <label htmlFor="_hp_field">Leave this empty</label>
      <input
        id="_hp_field"
        name="_hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        ref={tRef}
        name="_t"
        type="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
