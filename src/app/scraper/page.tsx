"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { VisualScraperBuilder } from '@/components/visual-scraper-builder'
import { ScraperTemplates } from '@/components/scraper-templates'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ScraperPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Visual Scraper Builder</h2>
            <p className="text-muted-foreground">
              Create powerful scrapers with drag-and-drop interface
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList>
            <TabsTrigger value="builder" className="gap-2">
              🎯 Builder
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              📋 Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-4">
            <VisualScraperBuilder />
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <ScraperTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}