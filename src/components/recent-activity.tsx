"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const recentActivities = [
  {
    id: 1,
    type: 'extraction',
    title: 'LinkedIn Profile Extracted',
    description: 'John Smith - Software Engineer at TechCorp',
    timestamp: '2 minutes ago',
    icon: '👤',
    status: 'success'
  },
  {
    id: 2,
    type: 'match',
    title: 'Lead Matched Across Platforms',
    description: 'Cross-referenced Sarah Johnson on LinkedIn + Facebook',
    timestamp: '5 minutes ago',
    icon: '🔗',
    status: 'success'
  },
  {
    id: 3,
    type: 'error',
    title: 'CAPTCHA Encountered',
    description: 'Bot paused on indeed.com - manual intervention needed',
    timestamp: '8 minutes ago',
    icon: '🤖',
    status: 'error'
  },
  {
    id: 4,
    type: 'export',
    title: 'Data Export Completed',
    description: '1,247 leads exported to CSV format',
    timestamp: '15 minutes ago',
    icon: '📤',
    status: 'success'
  },
  {
    id: 5,
    type: 'enrichment',
    title: 'Profile Enrichment',
    description: 'Added email and phone for 89 contacts via Hunter.io',
    timestamp: '23 minutes ago',
    icon: '✨',
    status: 'success'
  },
  {
    id: 6,
    type: 'integration',
    title: 'CRM Sync Complete',
    description: '156 new leads pushed to HubSpot pipeline',
    timestamp: '1 hour ago',
    icon: '🔄',
    status: 'success'
  },
  {
    id: 7,
    type: 'deployment',
    title: 'New Bot Deployed',
    description: 'Company Research Bot launched for crunchbase.com',
    timestamp: '2 hours ago',
    icon: '🚀',
    status: 'success'
  },
  {
    id: 8,
    type: 'analysis',
    title: 'Lead Quality Score Updated',
    description: 'AI analysis improved 67 lead scores based on new data',
    timestamp: '3 hours ago',
    icon: '🎯',
    status: 'info'
  }
]



const getActivityBadge = (type: string) => {
  switch (type) {
    case 'extraction':
      return <Badge variant="secondary">Extract</Badge>
    case 'match':
      return <Badge variant="outline" className="border-green-600 text-green-600">Match</Badge>
    case 'error':
      return <Badge variant="destructive">Error</Badge>
    case 'export':
      return <Badge variant="outline" className="border-blue-600 text-blue-600">Export</Badge>
    case 'enrichment':
      return <Badge variant="outline" className="border-purple-600 text-purple-600">Enrich</Badge>
    case 'integration':
      return <Badge variant="outline" className="border-orange-600 text-orange-600">Sync</Badge>
    case 'deployment':
      return <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Deploy</Badge>
    case 'analysis':
      return <Badge variant="outline" className="border-indigo-600 text-indigo-600">AI</Badge>
    default:
      return <Badge variant="outline">Activity</Badge>
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⚡ Live Activity Feed
        </CardTitle>
        <CardDescription>
          Real-time updates from all scrapers and integrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-b-0">
                <div className="flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    activity.status === 'error' ? 'bg-red-100 dark:bg-red-900' : 'bg-muted'
                  }`}>
                    {activity.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm truncate">{activity.title}</h4>
                    {getActivityBadge(activity.type)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                    {activity.status === 'error' && (
                      <button className="text-xs text-blue-600 hover:underline">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}