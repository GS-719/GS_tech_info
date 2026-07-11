import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  date: string
  featured?: boolean
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readingTime,
  date,
  featured = false,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`}>
      <article
        className={`group h-full rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all overflow-hidden ${
          featured
            ? 'md:col-span-2 p-8 min-h-96 flex flex-col justify-between'
            : 'p-6'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">{readingTime}</span>
          </div>
          <h3
            className={`font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2 ${
              featured ? 'text-2xl md:text-3xl' : 'text-lg'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-muted-foreground mb-4 ${
              featured
                ? 'text-base line-clamp-3'
                : 'text-sm line-clamp-2'
            }`}
          >
            {excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <span className="text-xs text-muted-foreground">{date}</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
      </article>
    </Link>
  )
}
