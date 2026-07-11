import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ResourceCardProps {
  name: string
  description: string
  url: string
  category: string
  icon?: React.ReactNode
}

export function ResourceCard({
  name,
  description,
  url,
  category,
  icon,
}: ResourceCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <div className="w-8 h-8 text-accent">{icon}</div>}
          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
            {category}
          </span>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-3">
        {description}
      </p>
    </a>
  )
}
