'use client'

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ 
  placeholder = 'Search articles and guides...', 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    onSearch?.(value)
  }, [onSearch])

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <div className={`relative w-full transition-all ${isFocused ? 'scale-105' : ''}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
