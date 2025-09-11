"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { SystemConfiguration } from '@/components/system-configuration'
import { ProxyManagement } from '@/components/proxy-management'
import { SecuritySettings } from '@/components/security-settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ConfigPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Configuration</h2>
            <p className="text-muted-foreground">
              System settings, proxy management, and security configuration
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="system" className="space-y-4">
          <TabsList>
            <TabsTrigger value="system" className="gap-2">
              ⚙️ System
            </TabsTrigger>
            <TabsTrigger value="proxy" className="gap-2">
              🌐 Proxies
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              🔐 Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="system" className="space-y-4">
            <SystemConfiguration />
          </TabsContent>
          
          <TabsContent value="proxy" className="space-y-4">
            <ProxyManagement />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}