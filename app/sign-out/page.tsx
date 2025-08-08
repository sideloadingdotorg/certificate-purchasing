'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'

export default function SignOutPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const doSignOut = async () => {
      await signOut()
      router.push('/')
    }
    doSignOut()
  }, [signOut, router])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-600">Signing you out...</p>
    </div>
  )
}