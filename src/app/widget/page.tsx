"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { WidgetBuilder } from '@/components/widget-builder'
import { WidgetGallery } from '@/components/widget-gallery'
import { WidgetSDK } from '@/components/widget-sdk'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WidgetPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Widget Builder</h2>
            <p className="text-muted-foreground">
              Create embeddable scraper widgets for external websites
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList>
            <TabsTrigger value="builder" className="gap-2">
              🧩 Builder
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              🎨 Gallery
            </TabsTrigger>
            <TabsTrigger value="sdk" className="gap-2">
              ⚙️ SDK & API
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-4">
            <WidgetBuilder />
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-4">
            <WidgetGallery />
          </TabsContent>
          
          <TabsContent value="sdk" className="space-y-4">
            <WidgetSDK />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}