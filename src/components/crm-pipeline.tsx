"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'


const pipelineStages = [
  {
    id: 'prospecting',
    name: 'Prospecting',
    color: 'bg-gray-100 dark:bg-gray-800',
    leads: [
      {
        id: '1',
        name: 'Sarah Johnson',
        company: 'TechCorp Solutions',
        title: 'VP of Engineering',
        value: '$50,000',
        score: 85,
        source: 'LinkedIn Scraper',
        lastContact: '2 days ago',
        avatar: 'SJ'
      },
      {
        id: '2',
        name: 'Michael Chen',
        company: 'DataFlow Inc',
        title: 'CTO',
        value: '$75,000',
        score: 92,
        source: 'Company Directory',
        lastContact: '1 day ago',
        avatar: 'MC'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        company: 'StartupXYZ',
        title: 'Founder',
        value: '$25,000',
        score: 78,
        source: 'Social Media Match',
        lastContact: '3 days ago',
        avatar: 'ER'
      }
    ]
  },
  {
    id: 'qualified',
    name: 'Qualified',
    color: 'bg-blue-50 dark:bg-blue-950',
    leads: [
      {
        id: '4',
        name: 'David Kim',
        company: 'Enterprise Corp',
        title: 'Head of IT',
        value: '$120,000',
        score: 95,
        source: 'LinkedIn Enriched',
        lastContact: '1 hour ago',
        avatar: 'DK'
      },
      {
        id: '5',
        name: 'Lisa Wang',
        company: 'Growth Ventures',
        title: 'Managing Director',
        value: '$200,000',
        score: 88,
        source: 'Job Board Scraper',
        lastContact: '4 hours ago',
        avatar: 'LW'
      }
    ]
  },
  {
    id: 'proposal',
    name: 'Proposal',
    color: 'bg-yellow-50 dark:bg-yellow-950',
    leads: [
      {
        id: '6',
        name: 'Robert Taylor',
        company: 'MegaCorp Industries',
        title: 'Procurement Manager',
        value: '$300,000',
        score: 91,
        source: 'Company Research Bot',
        lastContact: '2 hours ago',
        avatar: 'RT'
      }
    ]
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    color: 'bg-orange-50 dark:bg-orange-950',
    leads: [
      {
        id: '7',
        name: 'Amanda Foster',
        company: 'Global Solutions Ltd',
        title: 'Chief Strategy Officer',
        value: '$450,000',
        score: 97,
        source: 'LinkedIn + Facebook Match',
        lastContact: '30 minutes ago',
        avatar: 'AF'
      }
    ]
  },
  {
    id: 'closed',
    name: 'Closed Won',
    color: 'bg-green-50 dark:bg-green-950',
    leads: [
      {
        id: '8',
        name: 'James Wilson',
        company: 'Innovation Hub',
        title: 'CEO',
        value: '$180,000',
        score: 99,
        source: 'Multi-Platform Enrichment',
        lastContact: 'Closed today',
        avatar: 'JW'
      }
    ]
  }
]

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900'
  if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
  if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
  return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
}

export function CRMPipeline() {
  const [draggedLead, setDraggedLead] = useState<string | null>(null)

  const totalValue = pipelineStages.reduce((sum, stage) => 
    sum + stage.leads.reduce((stageSum, lead) => 
      stageSum + parseInt(lead.value.replace(/[$,]/g, '')), 0), 0)

  const totalLeads = pipelineStages.reduce((sum, stage) => sum + stage.leads.length, 0)

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">23%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-muted-foreground">Avg Lead Score</p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className={stage.color}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stage.name}</CardTitle>
                  <Badge variant="secondary">{stage.leads.length}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  ${stage.leads.reduce((sum, lead) => 
                    sum + parseInt(lead.value.replace(/[$,]/g, '')), 0).toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {stage.leads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    className="cursor-move hover:shadow-lg transition-shadow bg-background border-2 hover:border-primary/50"
                    draggable
                    onDragStart={() => setDraggedLead(lead.id)}
                    onDragEnd={() => setDraggedLead(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {lead.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-sm">{lead.name}</h4>
                            <p className="text-xs text-muted-foreground">{lead.title}</p>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Company</span>
                          <span className="font-medium">{lead.company}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Value</span>
                          <span className="font-medium text-green-600">{lead.value}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Source</span>
                          <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Contact</span>
                          <span className="text-xs">{lead.lastContact}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3 pt-3 border-t">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Drop Zone */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Drop leads here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Pipeline Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 Pipeline Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              📊 Generate Report
            </Button>
            <Button variant="outline" className="gap-2">
              📤 Export Pipeline
            </Button>
            <Button variant="outline" className="gap-2">
              🎯 Bulk Actions
            </Button>
            <Button variant="outline" className="gap-2">
              📈 Conversion Analysis
            </Button>
            <Button variant="outline" className="gap-2">
              🔄 Sync CRM
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-blue-600 ml-auto">
              ➕ Add Lead
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-sm">High-Value Lead Alert</h4>
              <p className="text-sm text-muted-foreground">
                Amanda Foster (Global Solutions) has been in negotiation for 5 days. 
                Consider sending a follow-up proposal or scheduling a call.
              </p>
            </div>
            <Button size="sm" variant="outline" className="ml-auto">Act</Button>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-2xl">🎯</div>
            <div>
              <h4 className="font-semibold text-sm">Lead Scoring Update</h4>
              <p className="text-sm text-muted-foreground">
                3 new leads have score increases based on recent LinkedIn activity. 
                Consider moving them to qualified stage.
              </p>
            </div>
            <Button size="sm" variant="outline" className="ml-auto">Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}