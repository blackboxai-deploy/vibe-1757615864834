"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const stats = [
  {
    title: 'Active Scrapers',
    value: '12',
    change: '+2 from last week',
    changeType: 'positive' as const,
    icon: '🤖',
    description: 'Bots currently running'
  },
  {
    title: 'Data Extracted',
    value: '847K',
    change: '+23.4% this month',
    changeType: 'positive' as const,
    icon: '📊',
    description: 'Records collected'
  },
  {
    title: 'Lead Score',
    value: '94%',
    change: 'Quality improved',
    changeType: 'positive' as const,
    icon: '🎯',
    description: 'AI-verified accuracy'
  },
  {
    title: 'Success Rate',
    value: '98.7%',
    change: '-0.2% from yesterday',
    changeType: 'negative' as const,
    icon: '✅',
    description: 'Successful extractions'
  }
]

const recentMetrics = [
  { name: 'LinkedIn Profiles', current: 1247, total: 1500, percentage: 83 },
  { name: 'Contact Information', current: 2156, total: 2500, percentage: 86 },
  { name: 'Company Data', current: 892, total: 1000, percentage: 89 },
  { name: 'Social Media Links', current: 643, total: 800, percentage: 80 }
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <span className="text-2xl">{stat.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className="mt-2">
              <Badge 
                variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {stat.change}
              </Badge>
            </div>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full animate-pulse opacity-20" />
          </CardContent>
        </Card>
      ))}
      
      {/* Extended metrics card */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Real-time Extraction Progress
          </CardTitle>
          <CardDescription>
            Current data collection status across all active scrapers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recentMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-muted-foreground">
                    {metric.current}/{metric.total}
                  </span>
                </div>
                <Progress value={metric.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {metric.percentage}% complete
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}