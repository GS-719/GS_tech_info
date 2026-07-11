import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { ArticleCard } from '@/src/components/content/article/article-card'
import { Button } from '@/src/components/ui/button'
import { Search } from 'lucide-react'
import { categories } from '@/src/lib/content-config'

// Mock data - In production, this would come from a database or MDX files
const articles = [
  {
    slug: 'building-scalable-database-architectures',
    title: 'Building Scalable Database Architectures',
    excerpt: 'Explore patterns and best practices for designing databases that scale with your application. Learn about sharding, replication, and optimization techniques.',
    category: 'Database',
    readingTime: '12 min read',
    date: 'March 15, 2024',
    featured: true,
  },
  {
    slug: 'performance-optimization-techniques',
    title: 'Performance Optimization Techniques',
    excerpt: 'Learn critical techniques for identifying and eliminating performance bottlenecks. From profiling to caching strategies.',
    category: 'Performance',
    readingTime: '10 min read',
    date: 'March 14, 2024',
  },
  {
    slug: 'securing-your-applications',
    title: 'Securing Your Applications',
    excerpt: 'A comprehensive guide to modern security practices and common vulnerabilities. Protect your users and data.',
    category: 'Security',
    readingTime: '15 min read',
    date: 'March 13, 2024',
  },
  {
    slug: 'microservices-architecture-guide',
    title: 'Microservices Architecture Guide',
    excerpt: 'Deep dive into building distributed systems with microservices. Learn about service discovery, API gateways, and more.',
    category: 'Architecture',
    readingTime: '18 min read',
    date: 'March 12, 2024',
  },
  {
    slug: 'container-orchestration-kubernetes',
    title: 'Container Orchestration with Kubernetes',
    excerpt: 'Master Kubernetes for managing containerized applications at scale. From basic concepts to advanced deployments.',
    category: 'DevOps',
    readingTime: '20 min read',
    date: 'March 11, 2024',
  },
  {
    slug: 'advanced-react-patterns',
    title: 'Advanced React Patterns',
    excerpt: 'Explore advanced React patterns including compound components, render props, and custom hooks for scalable applications.',
    category: 'Frontend',
    readingTime: '14 min read',
    date: 'March 10, 2024',
  },
]

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Articles
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              In-depth technical articles covering advanced concepts and best practices.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="relative py-8 border-b border-border/40 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-2">
                  Search Articles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by title or keyword..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <Button variant="outline" size="sm">
                  All
                </Button>
                {categories.slice(0, 5).map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="relative py-12 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
