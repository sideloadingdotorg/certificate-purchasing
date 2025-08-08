import { Suspense } from 'react'
import LoginSuccessContent from './login-success-content'

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-lg">Loading...</div>}>
      <LoginSuccessContent />
    </Suspense>
  )
}