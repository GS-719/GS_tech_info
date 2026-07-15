import { getPublishedTutorialsAction } from "@/src/app/actions/publish/tutorial";
import { ArticleCard } from '@/src/components/content/article/article-card';
import { Terminal, Code2 } from 'lucide-react';

export default async function TutorialsPage() {
  const result = await getPublishedTutorialsAction();
  const publishedTutorials = result.tutorials || [];

  return (
    <>
      <main className="flex-1 bg-[#050506] text-white min-h-screen pb-24">

        {/* Section Header */}
        <section className="relative border-b border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance flex items-center gap-3">
              <Terminal className="w-9 h-9 text-accent" /> Tutorials Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Hands-on code-along implementations, syntax dissection, and real-world system building exercises.
            </p>
          </div>
        </section>

        {/* Dynamic Tutorials Content Grid */}
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {publishedTutorials.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-border/40 rounded-xl bg-card/10">
                <Code2 className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-muted-foreground">
                  No step-by-step programming tutorials published yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedTutorials.map((tutorial: any) => {
                  const uiProps = {
                    slug: tutorial.slug,
                    title: tutorial.slug.replace(/-/g, " "),
                    excerpt: tutorial.description || "Master the practical syntax and architectural constraints outlined in this modular technical workspace tutorial.",
                    category: tutorial.categoryId || "Next.js",
                    readingTime: `${tutorial.readingTime || 15} min build`,
                    date: tutorial.publishedAt
                      ? new Date(tutorial.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                      : "Recent Release",
                  };

                  return (
                    <ArticleCard
                      key={tutorial.id} // 🏆 Unique Key constraint requirement passed correctly
                      {...uiProps}
                      destination={`/tutorial/${tutorial.slug}`} // 🏆 Internal prop avoids <a> tag nesting fault
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