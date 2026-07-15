import prisma from "@/src/lib/prisma";
import { ArticleCard } from '@/src/components/content/article/article-card';
import { Button } from '@/src/components/ui/button';
import { Search, Globe, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

interface ArticlesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  // Await the search parameters signature (Next.js standard)
  const resolvedParams = await searchParams;
  const currentSearch = resolvedParams.search || "";
  const currentCategory = resolvedParams.category || "All";

  // 1. Query Neon Database using Prisma filters
  const publishedArticles = await prisma.contentNode.findMany({
    where: {
      type: "ARTICLE",
      status: "PUBLISHED",
      // Filter by category column if a specific track is active
      ...(currentCategory !== "All" ? { categoryId: currentCategory } : {}),
      // Search matching slugs (lowercased database comparison mapping)
      ...(currentSearch ? {
        slug: {
          contains: currentSearch.toLowerCase().replace(/ /g, "-")
        }
      } : {})
    },
    orderBy: {
      publishedAt: "desc" // Push the freshest entries to the top
    }
  });

  // System category configuration indexes
  const platformCategories = ["All", "Database", "Performance", "Security", "Architecture", "DevOps", "Frontend"];

  return (
    <>
      <main className="flex-1 bg-[#050506] text-white min-h-screen pb-24">

        {/* Page Header Banner */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Technical Directory
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              In-depth technical articles covering advanced concepts, backend systems architecture, and security hardening.
            </p>
          </div>
        </section>

        {/* Filters Section (Driven purely via URL state params) */}
        <section className="relative py-8 border-b border-border/40 sticky top-16 z-30 bg-[#050506]/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-end justify-between">

              {/* Native Search Form Execution Node Wrapper */}
              <form action="/articles" method="GET" className="w-full md:flex-1">
                <label htmlFor="search" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Search System Node Indexes
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    id="search"
                    name="search"
                    type="text"
                    defaultValue={currentSearch}
                    placeholder="Type keyword and press Enter..."
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-border/50 bg-[#0d0d11]/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent"
                  />
                  {/* Keep category query state parameter safe during search submissions */}
                  {currentCategory !== "All" && (
                    <input type="hidden" name="category" value={currentCategory} />
                  )}
                </div>
              </form>

              {/* Category Routing Navigation Track Links */}
              <div className="w-full md:w-auto">
                <p className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 md:text-right">
                  Filter by Domain
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {platformCategories.map((cat) => {
                    const isActive = currentCategory === cat;
                    // Build clean destination search pathways dynamically
                    const queryPath = cat === "All"
                      ? (currentSearch ? `?search=${currentSearch}` : "/articles")
                      : `?category=${cat}${currentSearch ? `&search=${currentSearch}` : ""}`;

                    return (
                      <Link key={cat} href={queryPath}>
                        <Button
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className={`text-xs h-9 transition-colors ${isActive ? "bg-accent text-accent-foreground border-accent" : "border-border/50 bg-card hover:bg-white/5"
                            }`}
                        >
                          {cat}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Dynamic Articles Document Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {publishedArticles.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-border/40 rounded-xl bg-card/10">
                <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-muted-foreground">No published technical logs match your specified parameters.</p>
                <Link href="/articles" className="text-xs text-accent mt-2 inline-block hover:underline">Clear active search filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedArticles.map((article: any) => {
                  // Transform model schema values cleanly into formatting strings expected by ArticleCard
                  const formattedProps = {
                    slug: article.slug,
                    title: article.slug.replace(/-/g, " "), // Derive beautiful titles directly from uniform url strings
                    excerpt: article.description || "Access detailed structural logic maps and production implementation paths inside this technical reference asset module.",
                    category: article.categoryId || "General",
                    readingTime: `${article.readingTime || 12} min read`,
                    date: article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                      : "Recent Release",
                    featured: article.isFeatured
                  };

                  return (
                    <ArticleCard
                      key={article.id}
                      {...formattedProps}
                      destination={`/articles/${article.slug}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}