"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PerformanceAnalytics } from '@/components/performance-analytics'
import { LeadAnalytics } from '@/components/lead-analytics'
import { UsageAnalytics } from '@/components/usage-analytics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <p className="text-muted-foreground">
              Comprehensive analytics and performance insights
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance" className="gap-2">
              📈 Performance
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              👥 Leads
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2">
              📊 Usage
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <PerformanceAnalytics />
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-4">
            <LeadAnalytics />
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <UsageAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}