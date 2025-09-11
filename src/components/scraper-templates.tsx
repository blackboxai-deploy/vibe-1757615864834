"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const templates = [
  {
    id: '1',
    name: 'LinkedIn Profile Scraper',
    description: 'Extract comprehensive profile data from LinkedIn including name, title, company, experience, and contact information',
    category: 'Professional Networks',
    difficulty: 'Advanced',
    fields: ['Name', 'Job Title', 'Company', 'Experience', 'Education', 'Skills', 'Contact Info'],
    antiDetection: ['Proxy Rotation', 'CAPTCHA Bypass', 'Rate Limiting'],
    uses: 12847,
    rating: 4.8,
    icon: '👔'
  },
  {
    id: '2',
    name: 'Company Directory Crawler',
    description: 'Scrape business directories like Yellow Pages, Yelp, and Google My Business for company information',
    category: 'Business Directories',
    difficulty: 'Intermediate',
    fields: ['Business Name', 'Address', 'Phone', 'Website', 'Hours', 'Reviews'],
    antiDetection: ['IP Rotation', 'Browser Fingerprinting'],
    uses: 8924,
    rating: 4.6,
    icon: '🏢'
  },
  {
    id: '3',
    name: 'Job Board Aggregator',
    description: 'Collect job postings from multiple job boards including Indeed, Glassdoor, and Monster',
    category: 'Job Boards',
    difficulty: 'Intermediate',
    fields: ['Job Title', 'Company', 'Location', 'Salary', 'Description', 'Requirements'],
    antiDetection: ['Session Management', 'User Agent Rotation'],
    uses: 15632,
    rating: 4.9,
    icon: '💼'
  },
  {
    id: '4',
    name: 'Social Media Profile Matcher',
    description: 'Cross-reference profiles across Facebook, Twitter, Instagram, and other social platforms',
    category: 'Social Media',
    difficulty: 'Expert',
    fields: ['Profile Name', 'Bio', 'Followers', 'Posts', 'Profile Picture', 'Links'],
    antiDetection: ['Advanced Proxy', 'Behavioral Mimicking', 'CAPTCHA AI'],
    uses: 6789,
    rating: 4.7,
    icon: '📱'
  },
  {
    id: '5',
    name: 'E-commerce Product Data',
    description: 'Extract product information from Amazon, eBay, and other marketplaces',
    category: 'E-commerce',
    difficulty: 'Advanced',
    fields: ['Product Name', 'Price', 'Images', 'Reviews', 'Specifications', 'Availability'],
    antiDetection: ['Residential Proxies', 'Cookie Management', 'Dynamic Headers'],
    uses: 21456,
    rating: 4.5,
    icon: '🛒'
  },
  {
    id: '6',
    name: 'Real Estate Listings',
    description: 'Gather property data from Zillow, Realtor.com, and MLS databases',
    category: 'Real Estate',
    difficulty: 'Intermediate',
    fields: ['Address', 'Price', 'Bedrooms', 'Bathrooms', 'Square Feet', 'Photos'],
    antiDetection: ['Geographic Rotation', 'Request Throttling'],
    uses: 9834,
    rating: 4.4,
    icon: '🏠'
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-600'
    case 'Intermediate':
      return 'bg-yellow-600'
    case 'Advanced':
      return 'bg-orange-600'
    case 'Expert':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}

export function ScraperTemplates() {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 Template Library
          </CardTitle>
          <CardDescription>
            Pre-built scraper templates optimized for specific websites and use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input 
              placeholder="Search templates..." 
              className="flex-1"
            />
            <Button variant="outline">🏷️ Category</Button>
            <Button variant="outline">⚡ Difficulty</Button>
            <Button variant="outline">📊 Sort</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">All Templates</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Professional Networks</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Business Directories</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Social Media</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">E-commerce</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">Job Boards</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-4">
              {/* Category */}
              <div>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>

              {/* Extracted Fields */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Extracted Fields</h4>
                <div className="flex flex-wrap gap-1">
                  {template.fields.slice(0, 4).map((field) => (
                    <Badge key={field} variant="outline" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                  {template.fields.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.fields.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Anti-Detection Features */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Anti-Detection</h4>
                <div className="flex flex-wrap gap-1">
                  {template.antiDetection.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs text-green-600 border-green-600">
                      🛡️ {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                <span>⭐ {template.rating}</span>
                <span>📊 {template.uses.toLocaleString()} uses</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Template Card */}
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-6xl opacity-50">🛠️</div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Need a Custom Template?</h3>
            <p className="text-muted-foreground mb-4">
              Create your own template or request one from our team
            </p>
            <div className="flex gap-2">
              <Button variant="outline">📝 Create Custom</Button>
              <Button variant="outline">💬 Request Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}