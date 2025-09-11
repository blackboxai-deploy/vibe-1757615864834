"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { BotManagementGrid } from '@/components/bot-management-grid'
import { BotDeployment } from '@/components/bot-deployment'
import { BotAnalytics } from '@/components/bot-analytics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function BotsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Bot Manager</h2>
            <p className="text-muted-foreground">
              Deploy, monitor, and optimize your scraping bots
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              🤖 Active Bots
            </TabsTrigger>
            <TabsTrigger value="deploy" className="gap-2">
              🚀 Deploy New
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              📊 Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <BotManagementGrid />
          </TabsContent>
          
          <TabsContent value="deploy" className="space-y-4">
            <BotDeployment />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <BotAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}