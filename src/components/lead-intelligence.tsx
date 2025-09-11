"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const sampleLeads = [
  {
    id: 'lead-001',
    name: 'Sarah Johnson',
    title: 'VP of Engineering',
    company: 'TechCorp Solutions',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    score: 94,
    source: 'LinkedIn Scraper',
    profileImage: 'https://placehold.co/100x100?text=Professional+business+portrait+headshot+executive+photo',
    enrichment: {
      companySize: '500-1000 employees',
      industry: 'Technology Software',
      revenue: '$50M-$100M',
      techStack: ['AWS', 'React', 'Python', 'Docker'],
      decisionMaker: true,
      budgetAuthority: 'High',
      buyingIntent: 'Active Research'
    },
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: '@sarahjohnson_dev',
      github: 'github.com/sarahjohnson'
    },
    activity: {
      lastSeen: '2 hours ago',
      engagement: 'High',
      contentInteraction: 'Software Architecture Posts'
    }
  },
  {
    id: 'lead-002',
    name: 'Michael Chen',
    title: 'CTO',
    company: 'DataFlow Inc',
    email: 'michael@dataflow.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    score: 89,
    source: 'Company Directory',
    profileImage: 'https://placehold.co/100x100?text=Tech+executive+professional+photo+CTO+portrait',
    enrichment: {
      companySize: '50-100 employees',
      industry: 'Data Analytics',
      revenue: '$10M-$25M',
      techStack: ['Python', 'Kubernetes', 'MongoDB', 'Spark'],
      decisionMaker: true,
      budgetAuthority: 'Very High',
      buyingIntent: 'Evaluation Stage'
    },
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/michael-chen-cto',
      twitter: '@mchen_tech'
    },
    activity: {
      lastSeen: '1 day ago',
      engagement: 'Medium',
      contentInteraction: 'Data Science Articles'
    }
  },
  {
    id: 'lead-003',
    name: 'Emily Rodriguez',
    title: 'Founder & CEO',
    company: 'StartupXYZ',
    email: 'emily@startupxyz.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    score: 82,
    source: 'Social Media Match',
    profileImage: 'https://placehold.co/100x100?text=Startup+founder+CEO+entrepreneur+professional+headshot',
    enrichment: {
      companySize: '10-25 employees',
      industry: 'FinTech',
      revenue: '$1M-$5M',
      techStack: ['React Native', 'Firebase', 'Stripe', 'Docker'],
      decisionMaker: true,
      budgetAuthority: 'Medium',
      buyingIntent: 'Problem Aware'
    },
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/emily-rodriguez-founder',
      twitter: '@emily_builds'
    },
    activity: {
      lastSeen: '3 hours ago',
      engagement: 'Very High',
      contentInteraction: 'Startup Growth Content'
    }
  }
]

export function LeadIntelligence() {
  const [selectedLead, setSelectedLead] = useState(sampleLeads[0])
  const [searchTerm, setSearchTerm] = useState('')

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-600'
    if (score >= 80) return 'bg-blue-600'
    if (score >= 70) return 'bg-yellow-600'
    return 'bg-gray-600'
  }

  const getBuyingIntentColor = (intent: string) => {
    switch (intent) {
      case 'Active Research': return 'bg-red-600'
      case 'Evaluation Stage': return 'bg-orange-600'
      case 'Problem Aware': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Lead Search & Filters */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 Lead Discovery
          </CardTitle>
          <CardDescription>
            Search and filter leads with AI-powered intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input 
              placeholder="Search leads by name, company, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button>🔍 Search</Button>
            <Button variant="outline">🎯 AI Filter</Button>
            <Button variant="outline">📊 Analytics</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">All Leads</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">High Score (90+)</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Decision Makers</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Active Research</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Recently Active</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Tech Industry</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lead List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            👥 Lead List ({sampleLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {sampleLeads.map((lead) => (
              <div
                key={lead.id}
                className={`p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedLead.id === lead.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm truncate">{lead.name}</h4>
                      <Badge className={`${getScoreColor(lead.score)} text-white text-xs`}>
                        {lead.score}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{lead.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{lead.source}</Badge>
                      <Badge className={`${getBuyingIntentColor(lead.enrichment.buyingIntent)} text-white text-xs`}>
                        {lead.enrichment.buyingIntent}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              👤 Lead Profile
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">📧 Contact</Button>
              <Button size="sm" variant="outline">📝 Add Note</Button>
              <Button size="sm">➕ Add to Campaign</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedLead.profileImage}
                  alt="Professional profile photo"
                  className="w-20 h-20 rounded-lg border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{selectedLead.name}</h3>
                    <Badge className={`${getScoreColor(selectedLead.score)} text-white`}>
                      AI Score: {selectedLead.score}/100
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground mb-1">{selectedLead.title}</p>
                  <p className="text-blue-600 font-medium">{selectedLead.company}</p>
                  <p className="text-sm text-muted-foreground">{selectedLead.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Source</p>
                  <Badge variant="outline">{selectedLead.source}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Seen</p>
                  <p className="font-medium">{selectedLead.activity.lastSeen}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enrichment" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company Size</p>
                    <p className="font-medium">{selectedLead.enrichment.companySize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-medium">{selectedLead.enrichment.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">{selectedLead.enrichment.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Authority</p>
                    <Badge className={selectedLead.enrichment.budgetAuthority === 'High' || selectedLead.enrichment.budgetAuthority === 'Very High' ? 'bg-green-600' : 'bg-yellow-600'}>
                      {selectedLead.enrichment.budgetAuthority}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.enrichment.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Buying Intent</p>
                  <div className="flex items-center gap-3">
                    <Badge className={getBuyingIntentColor(selectedLead.enrichment.buyingIntent)}>
                      {selectedLead.enrichment.buyingIntent}
                    </Badge>
                    <Progress 
                      value={
                        selectedLead.enrichment.buyingIntent === 'Active Research' ? 90 :
                        selectedLead.enrichment.buyingIntent === 'Evaluation Stage' ? 70 :
                        selectedLead.enrichment.buyingIntent === 'Problem Aware' ? 50 : 30
                      } 
                      className="flex-1 h-2" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="space-y-4">
                {Object.entries(selectedLead.socialProfiles).map(([platform, url]) => (
                  <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {platform[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{platform}</p>
                        <p className="text-sm text-muted-foreground">{url}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Visit</Button>
                  </div>
                ))}
                
                <Button className="w-full" variant="outline">
                  🔗 Find More Social Profiles
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{selectedLead.activity.engagement}</p>
                    <p className="text-sm text-muted-foreground">Engagement Level</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Content Interactions</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Posted on LinkedIn</p>
                        <p className="text-xs text-muted-foreground">"{selectedLead.activity.contentInteraction}" - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Company News Update</p>
                        <p className="text-xs text-muted-foreground">Promoted to VP of Engineering - 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Tech Conference Attendance</p>
                        <p className="text-xs text-muted-foreground">Spoke at DevOps Summit 2024 - 2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}