'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Mail } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Thanks for subscribing!' })
      setEmail('')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg border border-border/50 bg-card">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-accent" />
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Get notified when we publish new articles and guides.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {message && (
        <div
          className={`mt-3 p-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-accent/10 text-accent'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
