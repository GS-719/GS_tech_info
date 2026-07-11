import Link from 'next/link'
import { Mail, GitBranch, Share2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">GS</span>
              </div>
              <span className="font-semibold">GS Tech Info</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium developer learning platform for those who want to go deep.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Content
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                <GitBranch className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@gstech.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} GS Tech Info. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
