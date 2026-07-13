'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { User, Plus, X, BookOpen, Compass, Code, FolderOpen } from 'lucide-react'

export function DashboardActions() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const contentTypes = [
        {
            id: 'article',
            label: 'Article',
            description: 'Deep-dive technical pieces, opinions, or conceptual explanations.',
            icon: BookOpen,
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        },
        {
            id: 'guide',
            label: 'Guide',
            description: 'Step-by-step comprehensive pathways on specific technical ecosystems.',
            icon: Compass,
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        },
        {
            id: 'resource',
            label: 'Resource',
            description: 'Reference toolkits, asset sheets, or framework checklist configurations.',
            icon: FolderOpen,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        },
        {
            id: 'tutorial',
            label: 'Tutorial',
            description: 'Code-along blocks with direct implementation sequences.',
            icon: Code,
            color: 'text-accent bg-accent/10 border-accent/20',
        },
    ]

    const handleSelectType = (typeId: string) => {
        setIsOpen(false)
        // Redirects directly to your content builder route page with the type parameter attached
        router.push(`/dashboard/publish/${typeId}`)
    }

    return (
        <>
            {/* Top Level Action Controls Container Wrapper */}
            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                <Link href="/dashboard/profile">
                    <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card hover:bg-muted/30">
                        <User className="w-4 h-4" /> Account Profile
                    </Button>
                </Link>

                <Button size="sm" onClick={() => setIsOpen(true)} className="gap-2 bg-primary text-primary-foreground hover:opacity-90">
                    <Plus className="w-4 h-4" /> Publish Content
                </Button>
            </div>

            {/* Dynamic Pop-Up Modal Layout Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050506]/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="relative w-full max-w-2xl p-6 rounded-xl border border-border/60 bg-card shadow-2xl animate-in zoom-in-95 duration-200"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Modal Exit Header Element Control */}
                        <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-foreground">Select Content Engine</h3>
                                <p className="text-sm text-muted-foreground">Choose a blueprint format to initialize your new document node layout.</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content Selection Card Matrix Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contentTypes.map((item) => {
                                const Icon = item.icon
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSelectType(item.id)}
                                        className="group flex flex-col items-start p-5 text-left rounded-lg border border-border/40 bg-muted/10 hover:border-accent/40 hover:bg-muted/30 transition-all focus:outline-none focus:ring-1 focus:ring-accent/40"
                                    >
                                        <div className={`p-2 rounded-md border mb-3 ${item.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                                            {item.label}
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}