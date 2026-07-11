import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { getMDXContent } from '@/src/lib/mdx'
import { ArticleLayout } from '@/src/components/content/article/article-layout'

interface PageProps {
    params: Promise<{ slug: string }>
}

// 1. Generate Dynamic Metadata for SEO Optimization
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'src/content/article', `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return {}
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { frontmatter } = await getMDXContent(fileContent)

    return {
        title: `${frontmatter.title || 'Article'} - GS Tech Info`,
        description: frontmatter.description || 'Technical Article Deep Dive',
    }
}

// 2. Dynamic Article Page Server Component
export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'src/content/article', `${slug}.mdx`)

    // Safely guard against users visiting an invalid slug
    if (!fs.existsSync(filePath)) {
        notFound()
    }

    // Read raw file data from content repository
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Compile source using your next-mdx-remote configuration
    const { content, frontmatter } = await getMDXContent(fileContent)

    return (
        <ArticleLayout
            title={frontmatter.title as string}
            author={(frontmatter.author as string) || 'Gurjot'}
            date={(frontmatter.date as string) || '2026'}
            readingTime={(frontmatter.readingTime as string) || '10 min read'}
            category={(frontmatter.category as string) || 'Tech'}
        >
            {content}
        </ArticleLayout>
    )
}

// 3. Optional Performance Optimization: Pre-render content paths at build time
export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'src/content/article')

    if (!fs.existsSync(contentDir)) return []

    const files = fs.readdirSync(contentDir)

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => ({
            slug: file.replace('.mdx', ''),
        }))
}