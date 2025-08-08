// app/success/page.tsx
import { Suspense } from "react"
import SuccessContent from "./success-content"

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}