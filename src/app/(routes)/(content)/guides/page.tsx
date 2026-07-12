import { ArticleCard } from '@/src/components/content/article/article-card'

const guides = [
  {
    slug: 'getting-started-with-docker',
    title: 'Getting Started with Docker',
    excerpt: 'A comprehensive beginner&apos;s guide to Docker. Learn containerization basics and how to containerize your applications.',
    category: 'DevOps',
    readingTime: '10 min read',
    date: 'March 15, 2024',
  },
  {
    slug: 'api-design-best-practices',
    title: 'API Design Best Practices',
    excerpt: 'Design scalable and intuitive APIs. Learn about RESTful principles, versioning, and documentation.',
    category: 'Backend',
    readingTime: '13 min read',
    date: 'March 14, 2024',
  },
  {
    slug: 'monitoring-observability-guide',
    title: 'Monitoring and Observability Guide',
    excerpt: 'Understand the difference between monitoring and observability. Learn to build better insights into your systems.',
    category: 'DevOps',
    readingTime: '11 min read',
    date: 'March 13, 2024',
  },
]

export default function GuidesPage() {
  return (
    <>
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Step-by-step guides to help you master important technologies and concepts.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <ArticleCard
                  key={guide.slug}
                  {...guide}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
