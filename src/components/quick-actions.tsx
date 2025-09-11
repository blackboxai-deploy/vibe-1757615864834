"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function QuickActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        🚀 New Scraper
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            ⚡ Quick Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Create New</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            🎯 Visual Scraper
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            🤖 Deploy Bot
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+D</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            📊 Lead Campaign
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+L</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            📤 Export Data
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+E</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            🔗 Test Integration
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+T</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            ⚙️ System Config
            <span className="ml-auto text-xs text-muted-foreground">Ctrl+,</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="outline" size="sm">
        💡 Tutorial
      </Button>
    </div>
  )
}