import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Map, Library } from 'lucide-react'

export default function Page() {
  return (
    <>
      {/* Base container set to deep pitch-black */}
      <main className="flex-1 bg-[#050506] text-foreground relative overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full overflow-hidden">
          
          {/* FIXED GLOW LAYER: 
            Changed from -z-10 to z-0, bumped opacities to 20%, and added mix-blend-screen 
            to guarantee it renders on top of the black background but behind the text.
          */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
            {/* Soft Deep Blue Glow */}
            <div 
              className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] -translate-x-1/4 -translate-y-1/4 mix-blend-screen animate-pulse"
              style={{ animationDuration: '8s' }}
            />
            {/* Center Royal Purple Glow */}
            <div 
              className="absolute w-[600px] h-[400px] rounded-full bg-purple-600/20 blur-[140px] translate-y-1/4 mix-blend-screen"
            />
            {/* Right Bright Cyan Glow */}
            <div 
              className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[100px] translate-x-1/4 -translate-y-1/4 mix-blend-screen animate-pulse"
              style={{ animationDuration: '6s' }}
            />
          </div>

          {/* CONTENT LAYER: Explicitly forced to z-10 so it stays safe on top */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-white/80">Welcome to GS Tech Info</span>
            </div>
            
            {/* Headline with Clean Vercel-Style Text Gradient */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-balance text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 leading-[1.15]">
              Master Advanced <br /> Technology
            </h1>
            
            <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
              Deep dive into the technologies that power modern applications. From architecture to performance, learn from in-depth articles and guides crafted for developers who want to go deeper.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/articles" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity border-none">
                  Explore Articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/guides" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all"
                >
                  View Guides
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FEATURED CONTENT CATEGORIES ================= */}
        <section className="relative z-10 py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Featured Content Categories
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore our curated content across different areas of development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, title: 'Articles', description: 'Deep dives into advanced technical topics', href: '/articles' },
                { icon: Map, title: 'Guides', description: 'Step-by-step tutorials and how-tos', href: '/guides' },
                { icon: Zap, title: 'Tutorials', description: 'Hands-on learning experiences', href: '/tutorials' },
                { icon: Library, title: 'Resources', description: 'Curated tools and references', href: '/resources' },
              ].map((category) => {
                const Icon = category.icon
                return (
                  <Link key={category.href} href={category.href}>
                    <div className="group h-full p-6 rounded-xl border border-white/[0.06] bg-[#0d0d11]/60 hover:border-primary/40 hover:bg-[#121217]/80 backdrop-blur-md transition-all cursor-pointer shadow-sm">
                      <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-lg mb-2 text-white/95">{category.title}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================= LATEST ARTICLES PREVIEW ================= */}
        <section className="relative z-10 py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Latest Articles
              </h2>
              <p className="text-muted-foreground text-lg">
                Recently published technical deep dives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Building Scalable Database Architectures', category: 'Database', readTime: '12 min', date: 'March 15, 2024', excerpt: 'Explore patterns and best practices for designing databases that scale with your application.' },
                { title: 'Performance Optimization Techniques', category: 'Performance', readTime: '10 min', date: 'March 14, 2024', excerpt: 'Learn critical techniques for identifying and eliminating performance bottlenecks.' },
                { title: 'Securing Your Applications', category: 'Security', readTime: '15 min', date: 'March 13, 2024', excerpt: 'A comprehensive guide to modern security practices and common vulnerabilities.' },
              ].map((article, idx) => (
                <article
                  key={idx}
                  className="group p-6 rounded-xl border border-white/[0.06] bg-[#0d0d11]/60 hover:border-primary/40 hover:bg-[#121217]/80 backdrop-blur-md transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-primary/10 text-primary">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/articles">
                <Button variant="outline" size="lg" className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  View All Articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CTA EMAIL SUBSCRIPTION ================= */}
        <section className="relative z-10 py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              Stay Updated with New Content
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to get notified when we publish new articles and guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-white/10 bg-[#0d0d11] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
              />
              <Button className="w-full sm:w-auto shadow bg-primary text-primary-foreground hover:opacity-90 border-none">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}