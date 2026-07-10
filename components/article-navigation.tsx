import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ArticleNavigationProps {
  previousArticle?: {
    title: string
    href: string
  }
  nextArticle?: {
    title: string
    href: string
  }
}

export function ArticleNavigation({
  previousArticle,
  nextArticle,
}: ArticleNavigationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-12 border-t border-border/40">
      {previousArticle ? (
        <Link href={previousArticle.href}>
          <div className="group p-4 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-accent mb-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Previous Article</span>
            </div>
            <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
              {previousArticle.title}
            </h3>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextArticle ? (
        <Link href={nextArticle.href} className="md:justify-self-end w-full">
          <div className="group p-4 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all cursor-pointer">
            <div className="flex items-center justify-end gap-2 text-accent mb-2">
              <span className="text-sm font-medium">Next Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-right group-hover:text-accent transition-colors line-clamp-2">
              {nextArticle.title}
            </h3>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
