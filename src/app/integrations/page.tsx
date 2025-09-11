"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { CRMIntegrations } from '@/components/crm-integrations'
import { APIManagement } from '@/components/api-management'
import { WebhookSettings } from '@/components/webhook-settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
            <p className="text-muted-foreground">
              Connect with CRMs, APIs, and third-party services
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="crm" className="space-y-4">
          <TabsList>
            <TabsTrigger value="crm" className="gap-2">
              🔗 CRM
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              ⚙️ API
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="gap-2">
              🔄 Webhooks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="crm" className="space-y-4">
            <CRMIntegrations />
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <APIManagement />
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-4">
            <WebhookSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}