import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/src/lib/content-config'

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Browse by Category
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Explore content organized by topic to find exactly what you&apos;re looking for.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase()}`}>
                  <div className="group h-full p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all cursor-pointer flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
