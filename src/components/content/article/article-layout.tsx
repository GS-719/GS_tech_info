'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

interface Heading {
  level: number
  text: string
  id: string
}

interface ArticleLayoutProps {
  title: string
  author: string
  date: string
  readingTime: string
  category: string
  children: React.ReactNode
}

export function ArticleLayout({
  title,
  author,
  date,
  readingTime,
  category,
  children,
}: ArticleLayoutProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    // Extract headings from the article content
    const extractedHeadings: Heading[] = []
    const main = document.querySelector('[data-article-content]')
    if (main) {
      const headingElements = main.querySelectorAll('h2, h3')
      headingElements.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`
        heading.id = id
        const level = parseInt(heading.tagName[1])
        extractedHeadings.push({
          level,
          text: heading.textContent || '',
          id,
        })
      })
    }
    setHeadings(extractedHeadings)
  }, [])

  // Intersection Observer for active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <div className="mb-12 pb-8 border-b border-border/40">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                    {category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                  {title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div>By <span className="font-semibold text-foreground">{author}</span></div>
                  <div>{date}</div>
                  <div>{readingTime}</div>
                </div>
              </div>

              {/* Article Content */}
              <div data-article-content className="prose prose-invert max-w-none">
                {children}
              </div>
            </article>

            {/* Sidebar: Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-border/50 bg-card p-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {headings.length > 0 ? (
                    headings.map(({ level, text, id }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`block text-sm transition-colors hover:text-accent ${
                          activeHeading === id
                            ? 'text-accent font-semibold'
                            : 'text-muted-foreground'
                        } ${level === 3 ? 'pl-4' : ''}`}
                      >
                        {text}
                      </a>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No headings found
                    </p>
                  )}
                </nav>

                {/* Reading Progress */}
                <div className="mt-6 pt-6 border-t border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Reading Progress
                    </span>
                    <span className="text-xs font-medium text-accent">
                      <span id="progress-percent">0</span>%
                    </span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      id="progress-bar"
                      className="h-full bg-accent transition-all"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Scroll to Top Button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent text-background hover:bg-accent/80 transition-colors shadow-lg"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              )}
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
