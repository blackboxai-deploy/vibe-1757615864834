"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

const bots = [
  {
    id: 'bot-001',
    name: 'LinkedIn Lead Hunter Pro',
    template: 'LinkedIn Profile Scraper',
    status: 'running',
    progress: 73,
    extracted: 1847,
    target: 2500,
    speed: '15.2 records/min',
    proxy: 'US-Residential-Pool-1',
    startTime: '2 hours ago',
    estimatedCompletion: '47 minutes',
    successRate: 94.2,
    errorCount: 12,
    lastError: 'Rate limit detected - pausing 30s',
    cpu: 23,
    memory: 156,
    network: '2.1 MB/s'
  },
  {
    id: 'bot-002',
    name: 'Company Directory Crawler',
    template: 'Business Directory',
    status: 'running',
    progress: 89,
    extracted: 4234,
    target: 5000,
    speed: '22.7 records/min',
    proxy: 'EU-Datacenter-Pool-2',
    startTime: '4 hours ago',
    estimatedCompletion: '18 minutes',
    successRate: 97.8,
    errorCount: 3,
    lastError: null,
    cpu: 31,
    memory: 203,
    network: '3.4 MB/s'
  },
  {
    id: 'bot-003',
    name: 'Social Media Matcher',
    template: 'Cross-Platform Matcher',
    status: 'paused',
    progress: 45,
    extracted: 892,
    target: 2000,
    speed: '0 records/min',
    proxy: 'Global-Mobile-Pool-3',
    startTime: '6 hours ago',
    estimatedCompletion: 'Paused',
    successRate: 89.1,
    errorCount: 47,
    lastError: 'CAPTCHA detected - manual intervention required',
    cpu: 0,
    memory: 45,
    network: '0 MB/s'
  },
  {
    id: 'bot-004',
    name: 'Job Board Aggregator',
    template: 'Job Listings Scraper',
    status: 'completed',
    progress: 100,
    extracted: 12567,
    target: 12567,
    speed: '0 records/min',
    proxy: 'Premium-Rotating-Global',
    startTime: '8 hours ago',
    estimatedCompletion: 'Completed',
    successRate: 99.1,
    errorCount: 8,
    lastError: null,
    cpu: 0,
    memory: 0,
    network: '0 MB/s'
  }
]

const getStatusBadge = (status: string) => {
  const configs = {
    running: { variant: 'default' as const, icon: '🏃', text: 'Running', color: 'bg-green-600' },
    paused: { variant: 'secondary' as const, icon: '⏸️', text: 'Paused', color: 'bg-yellow-600' },
    completed: { variant: 'outline' as const, icon: '✅', text: 'Completed', color: 'border-green-600 text-green-600' },
    error: { variant: 'destructive' as const, icon: '❌', text: 'Error', color: 'bg-red-600' },
    stopped: { variant: 'secondary' as const, icon: '⏹️', text: 'Stopped', color: 'bg-gray-600' }
  }
  const config = configs[status as keyof typeof configs] || configs.stopped
  return <Badge variant={config.variant} className={config.color}>{config.icon} {config.text}</Badge>
}

export function BotManagementGrid() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Total Bots</p>
              </div>
              <div className="text-2xl">🤖</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="text-2xl">🏃</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">19.5K</p>
                <p className="text-sm text-muted-foreground">Records Today</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">96.2%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bot Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {bots.map((bot) => (
          <Card key={bot.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {bot.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <CardDescription>{bot.template}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(bot.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">⋮</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {bot.status === 'running' && (
                        <DropdownMenuItem>⏸️ Pause Bot</DropdownMenuItem>
                      )}
                      {bot.status === 'paused' && (
                        <DropdownMenuItem>▶️ Resume Bot</DropdownMenuItem>
                      )}
                      <DropdownMenuItem>📊 View Details</DropdownMenuItem>
                      <DropdownMenuItem>📤 Export Data</DropdownMenuItem>
                      <DropdownMenuItem>⚙️ Configure</DropdownMenuItem>
                      <DropdownMenuItem>📋 Clone Bot</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">🗑️ Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{bot.extracted.toLocaleString()}/{bot.target.toLocaleString()} records</span>
                </div>
                <Progress value={bot.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{bot.progress}% complete</span>
                  <span>ETA: {bot.estimatedCompletion}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Extraction Speed</p>
                  <p className="font-medium">{bot.speed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className={`font-medium ${bot.successRate > 95 ? 'text-green-600' : bot.successRate > 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {bot.successRate}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Proxy Pool</p>
                  <p className="font-medium text-xs">{bot.proxy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Running Time</p>
                  <p className="font-medium">{bot.startTime}</p>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">CPU</p>
                  <div className="flex items-center gap-2">
                    <Progress value={bot.cpu} className="h-1 flex-1" />
                    <span>{bot.cpu}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Memory</p>
                  <p className="font-medium">{bot.memory}MB</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Network</p>
                  <p className="font-medium">{bot.network}</p>
                </div>
              </div>

              {/* Error Information */}
              {bot.lastError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600">⚠️</span>
                    <span className="font-medium text-red-800 dark:text-red-200">Last Error:</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">{bot.lastError}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">Resolve</Button>
                    <Button size="sm" variant="ghost" className="text-xs">View Logs</Button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2 border-t">
                {bot.status === 'running' && (
                  <Button size="sm" variant="outline">⏸️ Pause</Button>
                )}
                {bot.status === 'paused' && (
                  <Button size="sm" variant="outline">▶️ Resume</Button>
                )}
                <Button size="sm" variant="outline">📊 Monitor</Button>
                <Button size="sm" variant="outline">📤 Export</Button>
                {bot.errorCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {bot.errorCount} errors
                  </Badge>
                )}
              </div>
            </CardContent>

            {/* Status Indicator */}
            <div className={`absolute top-3 right-3 h-3 w-3 rounded-full ${
              bot.status === 'running' ? 'bg-green-500 animate-pulse' : 
              bot.status === 'paused' ? 'bg-yellow-500' : 
              bot.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
            }`} />
          </Card>
        ))}
      </div>

      {/* Deploy New Bot */}
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-6xl opacity-50">🚀</div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Deploy New Bot</h3>
            <p className="text-muted-foreground mb-4">
              Launch additional scrapers to accelerate your data collection
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              🤖 Create New Bot
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}