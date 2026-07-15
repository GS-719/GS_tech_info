import { notFound } from 'next/navigation';
import prisma from "@/src/lib/prisma";
import { getMDXContent } from '@/src/lib/mdx';
import { ArticleLayout } from '@/src/components/content/article/article-layout';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// 🏆 High-Performance Raw GitHub Data Fetcher Bridge
async function fetchRawMdxFromGitHub(mdxFilePath: string, slug: string): Promise<string> {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
        throw new Error("Missing vital GITHUB access configurations in environment variables.");
    }

    const targetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${mdxFilePath}`;

    const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github.v3.raw", // Directly stream text content, bypassing base64 objects
        },
        // 🏆 ON-DEMAND REVALIDATION TAG CONFIGURATION
        next: {
            tags: [`content-node-${slug}`], // Labels this unique layout page block for target tag-purges
            revalidate: 86400 // Safety background fallback lifespan: 24 Hours
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub ingestion channel dropped with state status: ${response.status}`);
    }

    return response.text();
}

// 1. Generate Dynamic Metadata for SEO Optimization
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    // Read directly from database indexes to render metadata parameters instantly
    const guideNode = await prisma.contentNode.findFirst({
        where: {
            slug: slug,
            type: "GUIDE",
            status: "PUBLISHED"
        }
    });

    if (!guideNode) {
        return {};
    }

    return {
        title: `${guideNode.slug.replace(/-/g, " ")} - GS Tech Info`,
        description: guideNode.description || 'Technical Guide Deep Dive',
    };
}

// 2. Dynamic Guide Page Server Component
export default async function GuidePage({ params }: PageProps) {
    const { slug } = await params;

    // A. Verify metadata validity against the database
    const guideNode = await prisma.contentNode.findFirst({
        where: {
            slug: slug,
            type: "GUIDE",
            status: "PUBLISHED"
        }
    });

    // Safeguard against users loading draft or non-existent guide tracks
    if (!guideNode) {
        notFound();
    }

    let fileContent = "";
    try {
        // B. Grab plain text source straight from your production GitHub tree archive
        fileContent = await fetchRawMdxFromGitHub(guideNode.mdxPath, slug);
    } catch (error) {
        console.error("Failed to fetch markdown file from production repository storage:", error);
        notFound();
    }

    // C. Compile raw text document streams through next-mdx-remote configurations
    const { content, frontmatter } = await getMDXContent(fileContent);

    return (
        <ArticleLayout
            title={(frontmatter.title as string) || guideNode.slug.replace(/-/g, " ")}
            author={(frontmatter.author as string) || 'Gurjot'}
            date={
                (frontmatter.date as string) ||
                (guideNode.publishedAt
                    ? new Date(guideNode.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                    : '2026')
            }
            readingTime={`${guideNode.readingTime || 10} min read`}
            category={guideNode.categoryId || 'Tech'}
        >
            {content}
        </ArticleLayout>
    );
}

// 3. Performance Optimization: Pre-render content paths from Neon database context maps at build time
export async function generateStaticParams() {
    try {
        const guides = await prisma.contentNode.findMany({
            where: {
                type: "GUIDE",
                status: "PUBLISHED"
            },
            select: {
                slug: true
            }
        });

        return guides.map((guide) => ({
            slug: guide.slug,
        }));
    } catch (error) {
        console.error("Failed to pre-render dynamic parameters during build matrix assembly:", error);
        return [];
    }
}