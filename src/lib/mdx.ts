// lib/mdx.ts
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export async function getMDXContent(source: string) {
  try {
    const compiled = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          // Tell the compiler to highlight code blocks automatically
          rehypePlugins: [rehypeHighlight], 
          remarkPlugins: [remarkGfm],
        },
      },
    })
    return compiled
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw error
  }
}