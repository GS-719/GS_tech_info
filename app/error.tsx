'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-8 flex justify-center">
            <AlertCircle className="w-20 h-20 text-destructive animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Something Went Wrong
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            We encountered an unexpected error while processing your request. Our team has been notified and is working on a fix.
          </p>

          {error.digest && (
            <p className="text-sm font-mono text-muted-foreground mb-8 p-4 rounded-lg bg-muted/30">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              size="lg"
              className="gap-2 w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" /> Back to Home
              </Button>
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 p-6 rounded-lg border border-border/50 bg-muted/20">
            <p className="text-sm text-muted-foreground mb-4">
              If the problem persists, please try:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
              <li>Clearing your browser cache and cookies</li>
              <li>Trying a different browser or device</li>
              <li>Contacting our support team for assistance</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
