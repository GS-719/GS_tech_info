import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { ArticleCard } from '@/src/components/content/article/article-card'

const tutorials = [
  {
    slug: 'build-real-time-chat-app',
    title: 'Build a Real-Time Chat Application',
    excerpt: 'Learn to build a real-time chat app with WebSockets. Covers authentication, message persistence, and user management.',
    category: 'Backend',
    readingTime: '20 min read',
    date: 'March 15, 2024',
  },
  {
    slug: 'create-responsive-dashboard',
    title: 'Create a Responsive Dashboard',
    excerpt: 'Build a fully responsive admin dashboard with charts, tables, and real-time data updates.',
    category: 'Frontend',
    readingTime: '16 min read',
    date: 'March 14, 2024',
  },
  {
    slug: 'deploy-nextjs-to-production',
    title: 'Deploy Next.js to Production',
    excerpt: 'Complete guide to deploying Next.js applications. Covers optimization, environment setup, and monitoring.',
    category: 'DevOps',
    readingTime: '14 min read',
    date: 'March 13, 2024',
  },
]

export default function TutorialsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Tutorials
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Hands-on learning experiences to build real-world projects.
            </p>
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <ArticleCard
                  key={tutorial.slug}
                  {...tutorial}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
