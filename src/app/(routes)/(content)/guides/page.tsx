import prisma from "@/src/lib/prisma";
import { ArticleCard } from '@/src/components/content/article/article-card';
import { Compass, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function GuidesPage() {
  // Fetch published guides from Neon PostgreSQL
  const publishedGuides = await prisma.contentNode.findMany({
    where: {
      type: "GUIDE",
      status: "PUBLISHED"
    },
    orderBy: {
      publishedAt: "desc"
    }
  });

  return (
    <>
      <main className="flex-1 bg-[#050506] text-white min-h-screen pb-24">
        {/* Page Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance flex items-center gap-3">
              <Compass className="w-9 h-9 text-accent" /> Engineering Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Step-by-step roadmaps, system blueprints, and deep-dives designed to help you master production-scale engineering.
            </p>
          </div>
        </section>

        {/* Guides Grid Layout */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {publishedGuides.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-border/40 rounded-xl bg-card/10">
                <BookOpen className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-muted-foreground">No published engineering guides found in the system catalog.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedGuides.map((guide: any) => {
                  // Map database parameters cleanly to matching UI signatures
                  const uiProps = {
                    slug: guide.slug,
                    title: guide.slug.replace(/-/g, " "),
                    excerpt: guide.description || "Explore this master technical blueprint blueprint sequence covering operational components, optimization profiles, and advanced configurations.",
                    category: guide.categoryId || "Architecture",
                    readingTime: `${guide.readingTime || 10} min read`,
                    date: guide.publishedAt
                      ? new Date(guide.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                      : "Recently Released",
                  };

                  return (
                    // Direct dynamic routing connection wrapper link handles destination pushes
                    <ArticleCard key={guide.id} {...uiProps} destination={`/guides/${guide.slug}`} />
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