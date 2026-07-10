import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Map, Library } from 'lucide-react'

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-accent/30 bg-accent/5">
                <span className="text-sm font-medium text-accent">Welcome to GS Tech Info</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto text-balance">
                Master Advanced Tech Concepts
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                Deep dive into the technologies that power modern applications. From architecture to performance, learn from in-depth articles and guides crafted for developers who want to go deeper.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/articles">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Explore Articles <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/guides">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    View Guides
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content Sections */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Featured Content Categories
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore our curated content across different areas of development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: BookOpen,
                  title: 'Articles',
                  description: 'Deep dives into advanced technical topics',
                  href: '/articles',
                },
                {
                  icon: Map,
                  title: 'Guides',
                  description: 'Step-by-step tutorials and how-tos',
                  href: '/guides',
                },
                {
                  icon: Zap,
                  title: 'Tutorials',
                  description: 'Hands-on learning experiences',
                  href: '/tutorials',
                },
                {
                  icon: Library,
                  title: 'Resources',
                  description: 'Curated tools and references',
                  href: '/resources',
                },
              ].map((category) => {
                const Icon = category.icon
                return (
                  <Link key={category.href} href={category.href}>
                    <div className="group h-full p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all cursor-pointer">
                      <Icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Articles Preview */}
        <section className="relative py-20 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Latest Articles
              </h2>
              <p className="text-muted-foreground text-lg">
                Recently published technical deep dives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Building Scalable Database Architectures',
                  category: 'Database',
                  readTime: '12 min',
                  date: 'March 15, 2024',
                  excerpt: 'Explore patterns and best practices for designing databases that scale with your application.',
                },
                {
                  title: 'Performance Optimization Techniques',
                  category: 'Performance',
                  readTime: '10 min',
                  date: 'March 14, 2024',
                  excerpt: 'Learn critical techniques for identifying and eliminating performance bottlenecks.',
                },
                {
                  title: 'Securing Your Applications',
                  category: 'Security',
                  readTime: '15 min',
                  date: 'March 13, 2024',
                  excerpt: 'A comprehensive guide to modern security practices and common vulnerabilities.',
                },
              ].map((article, idx) => (
                <article
                  key={idx}
                  className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/articles">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Stay Updated with New Content
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to get notified when we publish new articles and guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 w-full sm:w-auto"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
