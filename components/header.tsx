'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, LogIn, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Articles', href: '/articles' },
  { label: 'Guides', href: '/guides' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Resources', href: '/resources' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Dynamic User Auth State Mock (Replace this hook with your true auth provider state, e.g., useUser() from Clerk)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Quick handlers to test layout dynamics
  const handleSignInMock = () => setUser({ name: 'Dev Guest', email: 'guest@gstech.info' })
  const handleSignOutMock = () => setUser(null)

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">GS</span>
            </div>
            <span className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
              Tech Info
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname.startsWith(item.href)
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar & Action Matrix Wrapper */}
          <div className="flex items-center justify-end flex-1 gap-3 max-w-md md:max-w-none">
            
            {/* Integrated Desktop Search Input */}
            <div className="relative hidden sm:block w-full max-w-[240px] lg:max-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search platforms..."
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Mobile Fallback Search Button */}
            <button
              className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 bg-card hover:bg-muted/50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Dynamic User Profile / Auth State Module */}
            <div className="hidden sm:block">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-border/40 bg-[#0d0d11]/40">
                    <div className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground truncate max-w-[80px]">
                      {user.name}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOutMock}
                    className="h-9 px-3 gap-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  onClick={handleSignInMock}
                  className="h-9 gap-1.5 shadow-sm bg-primary text-primary-foreground hover:opacity-90 border-none transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 bg-card hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1 border-t border-border/40 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname.startsWith(item.href)
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile-Only Action Element for Auth Management */}
            <div className="pt-4 border-t border-border/40 px-3 sm:hidden">
              {user ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Logged in as {user.email}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { handleSignOutMock(); setMobileMenuOpen(false); }}
                    className="w-full text-xs text-destructive hover:bg-destructive/10"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  onClick={() => { handleSignInMock(); setMobileMenuOpen(false); }}
                  className="w-full text-xs bg-primary text-primary-foreground"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}