import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LearningDashboard } from '@/components/learning-dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Bookmark, RotateCcw } from 'lucide-react'

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="py-12 border-b border-border/40">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Learning Dashboard</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Track your progress, bookmarks, and continue where you left off.
            </p>
          </div>

          <div className="py-12">
            <LearningDashboard />
          </div>

          {/* Bookmarks Section */}
          <section className="py-12 border-t border-border/40">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Saved Articles</h2>
                <p className="text-muted-foreground">Your bookmarked content for later reading</p>
              </div>
              <Link href="/resources">
                <Button variant="outline" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Advanced TypeScript Patterns',
                  category: 'TypeScript',
                  readTime: '20 min',
                  saved: '3 days ago',
                },
                {
                  title: 'Microservices Architecture Guide',
                  category: 'Architecture',
                  readTime: '25 min',
                  saved: '1 week ago',
                },
                {
                  title: 'Database Indexing Strategies',
                  category: 'Database',
                  readTime: '15 min',
                  saved: '2 weeks ago',
                },
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                      {article.category}
                    </span>
                    <Bookmark className="w-5 h-5 text-accent fill-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30 text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                    <span>Saved {article.saved}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Dashboard Preview */}
          <section className="py-12 border-t border-border/40">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Total Visitors',
                  value: '24,582',
                  change: '+12.5%',
                  positive: true,
                },
                {
                  title: 'Articles Published',
                  value: '142',
                  change: '+8 this month',
                  positive: true,
                },
                {
                  title: 'Avg. Reading Time',
                  value: '14.2 min',
                  change: '+2.1 min',
                  positive: true,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border/50 bg-card"
                >
                  <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm text-accent">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Admin Actions */}
            <div className="mt-8 p-6 rounded-lg border border-border/50 bg-muted/20">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link href="#new-article">
                  <Button className="w-full gap-2" variant="outline">
                    <ArrowRight className="w-4 h-4" /> Create Article
                  </Button>
                </Link>
                <Link href="#manage-content">
                  <Button className="w-full gap-2" variant="outline">
                    Manage Content
                  </Button>
                </Link>
                <Link href="#view-analytics">
                  <Button className="w-full gap-2" variant="outline">
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Resources */}
          <section className="py-12 border-t border-border/40">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Next.js Documentation',
                  description: 'Official Next.js documentation and guides for building React applications.',
                  category: 'Framework',
                },
                {
                  name: 'TypeScript Handbook',
                  description: 'Comprehensive guide to TypeScript language features and best practices.',
                  category: 'Language',
                },
                {
                  name: 'Web Dev Roadmap',
                  description: 'Visual roadmap showing the learning path for web development.',
                  category: 'Learning Path',
                },
              ].map((resource, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-accent transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
