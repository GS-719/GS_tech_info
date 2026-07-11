'use client'

import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { SearchBar } from '@/src/components/search-bar'
import { ArticleCard } from '@/src/components/content/article/article-card'
import { Button } from '@/src/components/ui/button'
import { categories } from '@/src/lib/content-config'
import { useState, useMemo } from 'react'

// Mock data
const allArticles = [
  {
    slug: 'building-scalable-database-architectures',
    title: 'Building Scalable Database Architectures',
    excerpt: 'Explore patterns and best practices for designing databases that scale.',
    category: 'Database',
    readingTime: '12 min read',
    date: 'March 15, 2024',
  },
  {
    slug: 'performance-optimization-techniques',
    title: 'Performance Optimization Techniques',
    excerpt: 'Learn critical techniques for identifying and eliminating performance bottlenecks.',
    category: 'Performance',
    readingTime: '10 min read',
    date: 'March 14, 2024',
  },
  {
    slug: 'securing-your-applications',
    title: 'Securing Your Applications',
    excerpt: 'A comprehensive guide to modern security practices and common vulnerabilities.',
    category: 'Security',
    readingTime: '15 min read',
    date: 'March 13, 2024',
  },
  {
    slug: 'microservices-architecture',
    title: 'Microservices Architecture Guide',
    excerpt: 'Deep dive into building distributed systems with microservices.',
    category: 'Architecture',
    readingTime: '18 min read',
    date: 'March 12, 2024',
  },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesQuery =
        query === '' ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        selectedCategory === null || article.category === selectedCategory

      return matchesQuery && matchesCategory
    })
  }, [query, selectedCategory])

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Search Header */}
        <section className="relative border-b border-border/40 py-12 bg-muted/20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Search Articles
            </h1>
            <SearchBar onSearch={setQuery} />
          </div>
        </section>

        {/* Filters and Results */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-1">
                <div className="sticky top-20 rounded-lg border border-border/50 bg-card p-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                    Filter by Category
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === null
                          ? 'bg-accent/10 text-accent font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-accent/10 text-accent font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Results */}
              <div className="lg:col-span-3">
                {filteredArticles.length > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-6">
                      Showing {filteredArticles.length} result{
                        filteredArticles.length !== 1 ? 's' : ''
                      }
                      {query && ` for "${query}"`}
                      {selectedCategory && ` in ${selectedCategory}`}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredArticles.map((article) => (
                        <ArticleCard
                          key={article.slug}
                          {...article}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">
                      No articles found.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Try adjusting your search query or selected category.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery('')
                        setSelectedCategory(null)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
