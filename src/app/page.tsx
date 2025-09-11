"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardStats } from '@/components/dashboard-stats'
import { RecentActivity } from '@/components/recent-activity'
import { BotStatusGrid } from '@/components/bot-status-grid'
import { QuickActions } from '@/components/quick-actions'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <QuickActions />
        </div>
        
        <div className="space-y-4">
          <DashboardStats />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <BotStatusGrid />
            </div>
            <div className="col-span-3">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}