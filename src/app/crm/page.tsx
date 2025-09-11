"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { CRMPipeline } from '@/components/crm-pipeline'
import { LeadsList } from '@/components/leads-list'
import { CRMAnalytics } from '@/components/crm-analytics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CRMPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">CRM Pipeline</h2>
            <p className="text-muted-foreground">
              Manage leads, track conversion, and optimize your sales pipeline
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="pipeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pipeline" className="gap-2">
              📈 Pipeline
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              👥 Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              📊 Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="space-y-4">
            <CRMPipeline />
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-4">
            <LeadsList />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <CRMAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}