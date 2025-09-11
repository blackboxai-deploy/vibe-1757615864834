"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const activeBots = [
  {
    id: 'bot-001',
    name: 'LinkedIn Lead Hunter',
    status: 'running',
    progress: 67,
    extracted: 1247,
    target: 1500,
    speed: '12.3 records/min',
    site: 'linkedin.com',
    lastUpdate: '2 minutes ago',
    proxy: 'US-East-1',
    errorRate: 0.2
  },
  {
    id: 'bot-002',
    name: 'Company Directory Crawler',
    status: 'running',
    progress: 89,
    extracted: 2156,
    target: 2500,
    speed: '18.7 records/min',
    site: 'yellowpages.com',
    lastUpdate: '1 minute ago',
    proxy: 'EU-West-1',
    errorRate: 0.1
  },
  {
    id: 'bot-003',
    name: 'Social Media Enricher',
    status: 'paused',
    progress: 45,
    extracted: 643,
    target: 800,
    speed: '0 records/min',
    site: 'facebook.com',
    lastUpdate: '15 minutes ago',
    proxy: 'US-West-2',
    errorRate: 1.2
  },
  {
    id: 'bot-004',
    name: 'Email Verification Bot',
    status: 'completed',
    progress: 100,
    extracted: 892,
    target: 1000,
    speed: '0 records/min',
    site: 'hunter.io',
    lastUpdate: '1 hour ago',
    proxy: 'Global',
    errorRate: 0.0
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'running':
      return <Badge className="bg-green-600">🏃 Running</Badge>
    case 'paused':
      return <Badge variant="secondary">⏸️ Paused</Badge>
    case 'completed':
      return <Badge variant="outline" className="border-green-600 text-green-600">✅ Completed</Badge>
    case 'error':
      return <Badge variant="destructive">❌ Error</Badge>
    default:
      return <Badge variant="outline">❓ Unknown</Badge>
  }
}

export function BotStatusGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🤖 Bot Status Monitor
        </CardTitle>
        <CardDescription>
          Real-time status and performance metrics for all deployed scrapers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeBots.map((bot) => (
          <div key={bot.id} className="border rounded-lg p-4 space-y-3">
            {/* Bot Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {bot.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-semibold">{bot.name}</h4>
                  <p className="text-sm text-muted-foreground">Target: {bot.site}</p>
                </div>
              </div>
              {getStatusBadge(bot.status)}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{bot.extracted}/{bot.target} records</span>
              </div>
              <Progress value={bot.progress} className="h-2" />
            </div>

            {/* Bot Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Speed</p>
                <p className="font-medium">{bot.speed}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Error Rate</p>
                <p className={`font-medium ${bot.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                  {bot.errorRate}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Proxy</p>
                <p className="font-medium">{bot.proxy}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-medium">{bot.lastUpdate}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                {bot.status === 'running' && (
                  <Button size="sm" variant="outline">⏸️ Pause</Button>
                )}
                {bot.status === 'paused' && (
                  <Button size="sm" variant="outline">▶️ Resume</Button>
                )}
                <Button size="sm" variant="outline">📊 Details</Button>
                <Button size="sm" variant="outline">📤 Export</Button>
              </div>
              <Button size="sm" variant="ghost" className="text-red-600">
                🗑️ Stop
              </Button>
            </div>
          </div>
        ))}

        {/* Quick Add Bot */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
          <div className="text-3xl">🚀</div>
          <h4 className="font-semibold">Deploy New Bot</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Launch additional scrapers to accelerate data collection
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            Create New Bot
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}