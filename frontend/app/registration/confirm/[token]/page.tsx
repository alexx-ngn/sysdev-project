'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/app/context/language-context'
import { use } from 'react'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/app/context/settings-context'

export default function ConfirmRegistration({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { t } = useLanguage()
  const { settings } = useSettings()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        const response = await fetch(`/api/registrations/confirm/${resolvedParams.token}`, {
          method: 'GET',
        })

        if (response.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Error confirming registration:', error)
        setStatus('error')
      }
    }

    confirmRegistration()
  }, [resolvedParams.token])

  const handleReturnHome = () => {
    router.push('/')
  }

  const handleTryAgain = () => {
    setStatus('loading')
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('confirm.loading')}
            </h2>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('confirm.success')}
            </h2>
            <Button
              onClick={handleReturnHome}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('confirm.returnHome')}
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('confirm.error')}
            </h2>
            <div className="space-y-4">
              <Button
                onClick={handleTryAgain}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('confirm.tryAgain')}
              </Button>
              <Button
                onClick={handleReturnHome}
                variant="outline"
                className="w-full"
              >
                {t('confirm.returnHome')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 