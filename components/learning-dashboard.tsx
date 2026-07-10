'use client'

import { BookOpen, Clock, Zap, TrendingUp } from 'lucide-react'

interface DashboardStats {
  articlesRead: number
  hoursLearned: number
  currentStreak: number
  topicsLearned: number
}

export function LearningDashboard() {
  const stats: DashboardStats = {
    articlesRead: 12,
    hoursLearned: 24,
    currentStreak: 5,
    topicsLearned: 8,
  }

  const statItems = [
    {
      icon: BookOpen,
      label: 'Articles Read',
      value: stats.articlesRead,
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: stats.hoursLearned,
    },
    {
      icon: Zap,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
    },
    {
      icon: TrendingUp,
      label: 'Topics Mastered',
      value: stats.topicsLearned,
    },
  ]

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight mb-8">Your Learning Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-3xl font-bold text-accent">{item.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold tracking-tight mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Read "Building Scalable Database Architectures"',
              date: 'Today',
              readTime: '12 min',
            },
            {
              title: 'Completed "Performance Optimization" guide',
              date: 'Yesterday',
              readTime: '18 min',
            },
            {
              title: 'Bookmarked "Security Best Practices" article',
              date: '2 days ago',
              readTime: '15 min',
            },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-border/40 bg-muted/20 hover:border-accent/30 transition-all"
            >
              <p className="font-medium mb-1">{activity.title}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{activity.date}</span>
                <span className="text-accent">{activity.readTime} read</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
