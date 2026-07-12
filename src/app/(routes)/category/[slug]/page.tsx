import { ArticleCard } from '@/src/components/content/article/article-card'
import { categories } from '@/src/lib/content-config'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, ' ').toUpperCase()
  return {
    title: `${categoryName} Articles - GS Tech Info`,
    description: `Browse all articles and guides in the ${categoryName} category.`,
  }
}

// Mock data - In production, filter from database
const categoryArticles: Record<string, Array<{ slug: string; title: string; excerpt: string; category: string; readingTime: string; date: string }>> = {
  architecture: [
    {
      slug: 'microservices-architecture',
      title: 'Microservices Architecture Guide',
      excerpt: 'Learn how to design and deploy microservices at scale.',
      category: 'Architecture',
      readingTime: '18 min read',
      date: 'March 12, 2024',
    },
  ],
  database: [
    {
      slug: 'building-scalable-database-architectures',
      title: 'Building Scalable Database Architectures',
      excerpt: 'Explore patterns and best practices for designing databases.',
      category: 'Database',
      readingTime: '12 min read',
      date: 'March 15, 2024',
    },
  ],
  performance: [
    {
      slug: 'performance-optimization-techniques',
      title: 'Performance Optimization Techniques',
      excerpt: 'Learn critical techniques for eliminating bottlenecks.',
      category: 'Performance',
      readingTime: '10 min read',
      date: 'March 14, 2024',
    },
  ],
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, ' ')
  const articles = categoryArticles[slug] || []

  return (
    <>
      <main className="flex-1">
        {/* Category Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance capitalize">
              {categoryName}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Articles and resources focused on {categoryName.toLowerCase()}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        {articles.length > 0 ? (
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
        ) : (
          <section className="relative py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                No articles found in this category yet.
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new content in {categoryName.toLowerCase()}.
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
