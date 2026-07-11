/**
 * Content Configuration
 * Defines the structure and metadata for all content sections
 */

export interface Article {
  slug: string
  title: string
  description: string
  category: string
  author: string
  date: string
  readingTime: string
  tags: string[]
  featured?: boolean
}

export interface ContentSection {
  id: string
  title: string
  description: string
  slug: string
  icon: string
}

export const contentSections: ContentSection[] = [
  {
    id: 'articles',
    title: 'Articles',
    description: 'Deep dives into advanced technical topics',
    slug: 'articles',
    icon: 'BookOpen',
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Step-by-step tutorials and how-tos',
    slug: 'guides',
    icon: 'Map',
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Hands-on learning experiences',
    slug: 'tutorials',
    icon: 'Zap',
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Curated tools and references',
    slug: 'resources',
    icon: 'Library',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Official docs and API references',
    slug: 'documentation',
    icon: 'Code',
  },
]

export const categories = [
  'Architecture',
  'Performance',
  'Security',
  'AI & ML',
  'DevOps',
  'Frontend',
  'Backend',
  'Database',
  'Cloud',
  'Tools',
]

export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
