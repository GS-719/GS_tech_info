/**
 * Article utilities and data management
 * This file handles article fetching and metadata
 */

export interface ArticleMetadata {
  slug: string
  title: string
  description: string
  category: string
  author: string
  date: string
  readingTime: string
  tags: string[]
  content: string
}

// Mock article data - In a real app, this would come from MDX files or a database
const articles: Record<string, ArticleMetadata> = {
  'building-scalable-database-architectures': {
    slug: 'building-scalable-database-architectures',
    title: 'Building Scalable Database Architectures',
    description:
      'Explore patterns and best practices for designing databases that scale with your application.',
    category: 'Database',
    author: 'GS Tech',
    date: '2024-03-15',
    readingTime: '12 min read',
    tags: ['database', 'architecture', 'scaling', 'performance'],
    content: 'Stored as page component content',
  },
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleMetadata | null> {
  return articles[slug] || null
}

export async function getAllArticles(): Promise<ArticleMetadata[]> {
  return Object.values(articles)
}

export function parseReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
