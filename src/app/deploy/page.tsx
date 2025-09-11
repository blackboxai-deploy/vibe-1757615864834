"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DeploymentWizard } from '@/components/deployment-wizard'

export default function DeployPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Deploy to Production</h2>
            <p className="text-muted-foreground">
              Deploy your ScrapeMaster Pro to a custom domain with enterprise features
            </p>
          </div>
        </div>
        
        <DeploymentWizard />
      </div>
    </DashboardLayout>
  )
}