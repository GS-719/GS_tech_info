import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold text-accent mb-4">404</h1>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or the URL might be incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4" /> Search Articles
              </Button>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-16">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Try These Instead
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Browse Articles', href: '/articles' },
                { name: 'View Resources', href: '/resources' },
                { name: 'Read Guides', href: '/guides' },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="p-4 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all cursor-pointer">
                    <p className="font-medium text-accent">{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
