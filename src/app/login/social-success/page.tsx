'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginSuccess() {
  const router = useRouter()
  const params = useSearchParams()
  const loggedRef = useRef(false)

  const provider = params.get('provider') ?? 'credentials'

  useEffect(() => {
    if (loggedRef.current) return
    loggedRef.current = true

    fetch('/api/activity-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'LOGIN',
        provider,
      }),
    }).finally(() => {
      router.replace('/investors/kyc1')
    })
  }, [provider])

  return null
}
