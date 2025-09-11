"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { LeadIntelligence } from '@/components/lead-intelligence'
import { LeadEnrichment } from '@/components/lead-enrichment'
import { SocialMatching } from '@/components/social-matching'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Lead Intelligence</h2>
            <p className="text-muted-foreground">
              AI-powered lead discovery, enrichment, and cross-platform matching
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="intelligence" className="space-y-4">
          <TabsList>
            <TabsTrigger value="intelligence" className="gap-2">
              🧠 Intelligence
            </TabsTrigger>
            <TabsTrigger value="enrichment" className="gap-2">
              ✨ Enrichment
            </TabsTrigger>
            <TabsTrigger value="matching" className="gap-2">
              🔗 Social Matching
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="intelligence" className="space-y-4">
            <LeadIntelligence />
          </TabsContent>
          
          <TabsContent value="enrichment" className="space-y-4">
            <LeadEnrichment />
          </TabsContent>
          
          <TabsContent value="matching" className="space-y-4">
            <SocialMatching />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}