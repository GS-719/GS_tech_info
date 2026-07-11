import { Header } from '@/src/components/header'
import { Footer } from '@/src/components/footer'
import { Button } from '@/src/components/ui/button'
import { ExternalLink, GitBranch, Book, Code } from 'lucide-react'

const resources = [
  {
    category: 'Tools',
    resources: [
      {
        name: 'PostgreSQL Documentation',
        description: 'Official PostgreSQL documentation for database design and optimization.',
        url: 'https://www.postgresql.org/docs/',
        icon: Book,
      },
      {
        name: 'Redis',
        description: 'In-memory data structure store for caching and session management.',
        url: 'https://redis.io/docs/',
        icon: Code,
      },
      {
        name: 'Docker',
        description: 'Containerization platform for deploying applications.',
        url: 'https://docs.docker.com/',
        icon: Code,
      },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    resources: [
      {
        name: 'Next.js',
        description: 'React framework for production with built-in optimization.',
        url: 'https://nextjs.org/docs',
        icon: Code,
      },
      {
        name: 'TypeScript',
        description: 'Typed superset of JavaScript for safer code.',
        url: 'https://www.typescriptlang.org/docs/',
        icon: Code,
      },
      {
        name: 'GraphQL',
        description: 'Query language for APIs with strong typing.',
        url: 'https://graphql.org/learn/',
        icon: Book,
      },
    ],
  },
  {
    category: 'Learning Platforms',
    resources: [
      {
        name: 'System Design Primer',
        description: 'GitHub repository for learning system design concepts.',
        url: 'https://github.com/donnemartin/system-design-primer',
        icon: GitBranch,
      },
      {
        name: 'Awesome Lists',
        description: 'Curated lists of awesome resources for various technologies.',
        url: 'https://github.com/sindresorhus/awesome',
        icon: GitBranch,
      },
      {
        name: 'Dev.to',
        description: 'Community of developers sharing articles and discussions.',
        url: 'https://dev.to',
        icon: Book,
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Curated tools, frameworks, and references to support your learning journey.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {resources.map((section) => (
              <div key={section.category} className="mb-16">
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  {section.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.resources.map((resource) => {
                    const Icon = resource.icon
                    return (
                      <a
                        key={resource.name}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
                      >
                        <Icon className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center text-accent group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Visit</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Resource CTA */}
        <section className="relative py-12 border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Know a Great Resource?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Help other developers by suggesting a resource to add to our collection.
            </p>
            <Button size="lg">Suggest a Resource</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
