"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: '📊',
    badge: null
  },
  {
    name: 'Visual Scraper',
    href: '/scraper',
    icon: '🎯',
    badge: 'New'
  },
  {
    name: 'Bot Manager',
    href: '/bots',
    icon: '🤖',
    badge: '3 Active'
  },
  {
    name: 'Lead Intelligence',
    href: '/leads',
    icon: '👥',
    badge: '127'
  },
  {
    name: 'CRM Pipeline',
    href: '/crm',
    icon: '📈',
    badge: null
  },
  {
    name: 'Data Export',
    href: '/export',
    icon: '📤',
    badge: null
  },
  {
    name: 'Configuration',
    href: '/config',
    icon: '⚙️',
    badge: null
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: '📋',
    badge: null
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: '🔗',
    badge: 'API'
  },
   {
    name: 'Widget Builder',
    href: '/widget',
    icon: '🧩',
    badge: 'Beta'
  },
  {
    name: 'Deploy',
    href: '/deploy',
    icon: '🚀',
    badge: 'Pro'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col border-r bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo & Collapse Toggle */}
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ScrapeMaster Pro
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '▶️' : '◀️'}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  collapsed && "justify-center"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </div>
                {!collapsed && item.badge && (
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-3">
        <div className={cn(
          "flex items-center space-x-3 rounded-lg bg-accent/50 p-3",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}