import React from 'react'
import { Copy, Check, AlertCircle, Info } from 'lucide-react'

/**
 * Custom MDX components for rendering formatted content
 * These components are used within article content
 */

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
}

interface AlertProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'error' | 'success'
}

interface CalloutProps {
  children: React.ReactNode
  type?: 'note' | 'tip' | 'warning' | 'important'
}

export const MDXComponents = {
  // Headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight my-8 text-balance">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold tracking-tight my-6 mt-8 text-balance">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold tracking-tight my-4 mt-6 text-balance">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-semibold tracking-tight my-3 mt-4">
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg leading-8 my-4" style={{ lineHeight: '1.8' }}>
      {children}
    </p>
  ),

  // Code
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <code
      className={`${
        className || 'bg-muted px-2 py-1 rounded text-sm'
      } font-mono text-accent`}
    >
      {children}
    </code>
  ),

  // Pre block
  pre: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <pre className={`${className || 'bg-muted rounded-lg p-4 overflow-x-auto'} my-4`}>
      {children}
    </pre>
  ),

  // Lists
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 my-4 pl-4">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 my-4 pl-4">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-lg leading-8" style={{ lineHeight: '1.8' }}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4 py-2">
      {children}
    </blockquote>
  ),

  // Links
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-accent hover:text-accent/80 transition-colors underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // Tables
  table: ({ children }: { children: React.ReactNode }) => (
    <table className="w-full border-collapse my-4 border border-border/40">
      {children}
    </table>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-muted/50">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-border/40">
      {children}
    </tr>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2">
      {children}
    </td>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),

  // Custom components
  Alert: ({ children, type = 'info' }: AlertProps) => {
    const colors = {
      info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
      warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
      error: 'bg-red-500/10 border-red-500/30 text-red-300',
      success: 'bg-green-500/10 border-green-500/30 text-green-300',
    }
    return (
      <div
        className={`border rounded-lg p-4 my-4 ${colors[type]} flex gap-3`}
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>{children}</div>
      </div>
    )
  },

  Callout: ({ children, type = 'note' }: CalloutProps) => {
    const colors = {
      note: 'bg-accent/10 border-accent/30',
      tip: 'bg-green-500/10 border-green-500/30',
      warning: 'bg-yellow-500/10 border-yellow-500/30',
      important: 'bg-red-500/10 border-red-500/30',
    }
    return (
      <div
        className={`border rounded-lg p-4 my-4 ${colors[type]}`}
      >
        <div className="font-semibold mb-2 text-sm uppercase tracking-wider">
          {type}
        </div>
        <div>{children}</div>
      </div>
    )
  },

  CodeBlock: ({ children, language, filename }: CodeBlockProps) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="my-4 rounded-lg border border-border/50 overflow-hidden bg-muted">
        {filename && (
          <div className="px-4 py-2 bg-muted/50 border-b border-border/40 text-sm font-mono text-muted-foreground">
            {filename}
          </div>
        )}
        <div className="relative">
          <pre className="p-4 overflow-x-auto">
            <code className={`language-${language || 'plaintext'}`}>
              {children}
            </code>
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded bg-muted/80 hover:bg-muted/100 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    )
  },
}
