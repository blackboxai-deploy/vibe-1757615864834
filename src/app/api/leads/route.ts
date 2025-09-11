import { NextRequest, NextResponse } from 'next/server'

// Lead intelligence and CRM API
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const stage = searchParams.get('stage')
  const search = searchParams.get('search')

  const leads = [
    {
      id: 'lead-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions Inc.',
      title: 'VP of Engineering',
      location: 'San Francisco, CA',
      value: 50000,
      score: 92,
      stage: 'qualified',
      source: 'LinkedIn Scraper',
      lastContact: '2024-01-15T14:30:00Z',
      tags: ['enterprise', 'decision-maker', 'tech'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/in/sarah-johnson',
        twitter: '@sarahjohnson_dev',
        github: 'github.com/sarahjohnson'
      },
      enrichedData: {
        industry: 'Technology',
        companySize: '500-1000 employees',
        techStack: ['AWS', 'React', 'Node.js', 'PostgreSQL'],
        buyingIntent: 'High',
        competitorUsage: ['Salesforce', 'HubSpot'],
        recentActivity: 'Posted about enterprise software on LinkedIn'
      },
      aiInsights: {
        personaMatch: 'Enterprise Tech Leader',
        communicationPreference: 'Professional Email',
        bestContactTime: '9-11 AM PST',
        decisionInfluence: 'High',
        budgetAuthority: 'Yes'
      }
    },
    {
      id: 'lead-002',
      name: 'Michael Chen',
      email: 'michael.chen@dataflow.com',
      phone: '+1 (555) 987-6543',
      company: 'DataFlow Inc',
      title: 'CTO',
      location: 'New York, NY',
      value: 75000,
      score: 88,
      stage: 'proposal',
      source: 'Company Directory',
      lastContact: '2024-01-14T16:45:00Z',
      tags: ['startup', 'technical', 'data'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/in/michael-chen-cto',
        twitter: '@mchen_tech'
      },
      enrichedData: {
        industry: 'Data Analytics',
        companySize: '50-100 employees',
        techStack: ['Python', 'Apache Spark', 'Kubernetes', 'MongoDB'],
        buyingIntent: 'Medium',
        competitorUsage: ['Tableau', 'Looker'],
        recentActivity: 'Attended data conference last week'
      },
      aiInsights: {
        personaMatch: 'Tech Startup CTO',
        communicationPreference: 'Technical Demo',
        bestContactTime: '2-4 PM EST',
        decisionInfluence: 'Very High',
        budgetAuthority: 'Yes'
      }
    },
    {
      id: 'lead-003',
      name: 'Emily Rodriguez',
      email: 'emily@startupxyz.com',
      phone: '+1 (555) 456-7890',
      company: 'StartupXYZ',
      title: 'Founder & CEO',
      location: 'Austin, TX',
      value: 25000,
      score: 78,
      stage: 'prospecting',
      source: 'Social Media Match',
      lastContact: '2024-01-13T10:20:00Z',
      tags: ['founder', 'early-stage', 'fintech'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/in/emily-rodriguez-founder',
        twitter: '@emily_builds',
        medium: '@emily.rodriguez'
      },
      enrichedData: {
        industry: 'FinTech',
        companySize: '10-25 employees',
        techStack: ['React Native', 'Firebase', 'Stripe', 'Docker'],
        buyingIntent: 'Low',
        fundingStage: 'Series A',
        recentActivity: 'Raised $5M in Series A funding'
      },
      aiInsights: {
        personaMatch: 'Early Stage Founder',
        communicationPreference: 'Casual Coffee Chat',
        bestContactTime: '10-12 PM CST',
        decisionInfluence: 'Ultimate',
        budgetAuthority: 'Yes (Limited)'
      }
    }
  ]

  // Filter by stage if provided
  let filteredLeads = leads
  if (stage && stage !== 'all') {
    filteredLeads = leads.filter(lead => lead.stage === stage)
  }

  // Search filter
  if (search) {
    const searchLower = search.toLowerCase()
    filteredLeads = filteredLeads.filter(lead => 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.company.toLowerCase().includes(searchLower) ||
      lead.title.toLowerCase().includes(searchLower) ||
      lead.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  return NextResponse.json({ 
    leads: filteredLeads,
    total: filteredLeads.length,
    stats: {
      totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
      averageScore: Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length),
      stageDistribution: {
        prospecting: leads.filter(l => l.stage === 'prospecting').length,
        qualified: leads.filter(l => l.stage === 'qualified').length,
        proposal: leads.filter(l => l.stage === 'proposal').length,
        negotiation: leads.filter(l => l.stage === 'negotiation').length,
        closed: leads.filter(l => l.stage === 'closed').length
      }
    }
  })
}

// Create or update lead
export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      score: leadData.score || Math.floor(Math.random() * 30) + 70, // Random score 70-99
      stage: leadData.stage || 'prospecting',
      aiInsights: {
        personaMatch: 'Professional Contact',
        communicationPreference: 'Email',
        bestContactTime: 'Business Hours',
        decisionInfluence: 'Medium',
        budgetAuthority: 'Unknown'
      }
    }

    return NextResponse.json({ 
      success: true, 
      lead: newLead,
      message: 'Lead created successfully'
    })
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

// Update lead stage or data
export async function PATCH(request: NextRequest) {
  try {
    const { leadId, updates } = await request.json()

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      )
    }

    const updatedLead = {
      id: leadId,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({ 
      success: true, 
      lead: updatedLead,
      message: 'Lead updated successfully'
    })
  } catch (error) {
    console.error('Lead update error:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}