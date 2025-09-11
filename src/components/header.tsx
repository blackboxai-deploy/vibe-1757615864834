"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'

export function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
      {/* Search */}
      <div className="flex-1">
        <div className="relative max-w-md">
          <Input
            type="search"
            placeholder="Search scrapers, leads, or configurations..."
            className="w-full bg-muted/50 pl-10"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <span className="text-muted-foreground">🔍</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* System Status */}
        <Button variant="ghost" size="sm" className="gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="hidden sm:inline">All Systems Online</span>
        </Button>

        {/* Active Bots Badge */}
        <Badge variant="secondary" className="gap-1">
          🤖 3 Active
        </Badge>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              🔔
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                🎯 Scraper Alert
                <Badge variant="destructive" className="text-xs">Critical</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Bot "LinkedIn Leads" encountered CAPTCHA - manual intervention required
              </p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                ✅ Export Complete
                <Badge variant="secondary" className="text-xs">Success</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                1,247 leads exported to CSV successfully
              </p>
              <p className="text-xs text-muted-foreground">5 minutes ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                🔗 Integration Update
                <Badge variant="outline" className="text-xs">Info</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                LinkedIn API integration synced 89 new profiles
              </p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {theme === 'dark' ? '🌙' : '☀️'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              ☀️ Light Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              🌙 Dark Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              💻 System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-medium">
                A
              </div>
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>👤 Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>💳 Billing & Usage</DropdownMenuItem>
            <DropdownMenuItem>🔑 API Keys</DropdownMenuItem>
            <DropdownMenuItem>⚙️ Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>📚 Documentation</DropdownMenuItem>
            <DropdownMenuItem>💬 Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">🚪 Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}