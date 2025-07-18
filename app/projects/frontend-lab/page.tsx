'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FrontendLabPage() {
  const router = useRouter()

  useEffect(() => {
    // public 폴더의 정적 HTML로 리다이렉트
    window.location.href = '/projects/frontend-lab/index.html'
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl">프론트엔드 실험실로 이동 중...</p>
      </div>
    </div>
  )
}