"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DataExport } from '@/components/data-export'
import { ExportHistory } from '@/components/export-history'
import { ExportScheduler } from '@/components/export-scheduler'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ExportPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Data Export</h2>
            <p className="text-muted-foreground">
              Export your scraped data in multiple formats with advanced filtering
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="export" className="space-y-4">
          <TabsList>
            <TabsTrigger value="export" className="gap-2">
              📤 Export Data
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              📋 History
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="gap-2">
              ⏰ Scheduler
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4">
            <DataExport />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <ExportHistory />
          </TabsContent>
          
          <TabsContent value="scheduler" className="space-y-4">
            <ExportScheduler />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}