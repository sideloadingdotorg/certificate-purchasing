'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  useEffect(() => {
    if (!email) {
      router.push('/login')
      return
    }

    localStorage.setItem('user-email', email)
    router.push('/dashboard')
  }, [email, router])

  return (
    <div className="text-center mt-20 text-lg">
      Logging you in...
    </div>
  )
}