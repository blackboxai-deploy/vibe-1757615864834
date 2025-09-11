"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const extractionRules = [
  { id: '1', field: 'Name', selector: 'h1.profile-name', type: 'text', status: 'active' },
  { id: '2', field: 'Job Title', selector: '.job-title span', type: 'text', status: 'active' },
  { id: '3', field: 'Company', selector: '.company-name a', type: 'link', status: 'active' },
  { id: '4', field: 'Email', selector: '[data-email]', type: 'attribute', status: 'pending' },
  { id: '5', field: 'Profile Image', selector: '.profile-photo img', type: 'image', status: 'error' }
]

export function VisualScraperBuilder() {
  const [selectedUrl, setSelectedUrl] = useState('https://linkedin.com/in/example')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* URL Input & Controls */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌐 Target Website Configuration
          </CardTitle>
          <CardDescription>
            Enter the website URL you want to scrape and configure extraction rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="target-url">Target URL</Label>
              <Input
                id="target-url"
                placeholder="https://example.com"
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                {isPreviewMode ? '📝 Edit Mode' : '👁️ Preview Mode'}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                🚀 Load Page
              </Button>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              LinkedIn Profile
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Company Directory
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Job Listings
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Contact Pages
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Social Media
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Website Preview */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🖥️ Website Preview
          </CardTitle>
          <CardDescription>
            Click on elements to create extraction rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simulated Website Preview */}
          <div className="border rounded-lg bg-white dark:bg-gray-900 min-h-[600px] relative overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 mx-4 bg-white dark:bg-gray-700 rounded px-3 py-1 text-sm text-gray-600">
                {selectedUrl}
              </div>
            </div>

            {/* Simulated LinkedIn Profile */}
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-start gap-4">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f61ce47b-7efd-4f1f-828d-21a14967d09d.png"
                  alt="Professional headshot business portrait LinkedIn style photo"
                  className="w-30 h-30 rounded-full border-4 border-blue-600 cursor-pointer hover:ring-4 hover:ring-blue-200 transition-all"
                  onClick={() => console.log('Selected profile image')}
                />
                <div className="flex-1">
                  <h1 
                    className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:bg-blue-100 hover:dark:bg-blue-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected name field')}
                  >
                    Sarah Johnson
                  </h1>
                  <p 
                    className="text-lg text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-green-100 hover:dark:bg-green-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected job title')}
                  >
                    Senior Software Engineer
                  </p>
                  <p 
                    className="text-blue-600 cursor-pointer hover:bg-purple-100 hover:dark:bg-purple-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected company')}
                  >
                    TechCorp Solutions Inc.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p 
                    className="cursor-pointer hover:bg-yellow-100 hover:dark:bg-yellow-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected email')}
                  >
                    📧 sarah.johnson@techcorp.com
                  </p>
                  <p 
                    className="cursor-pointer hover:bg-red-100 hover:dark:bg-red-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected phone')}
                  >
                    📱 +1 (555) 123-4567
                  </p>
                  <p 
                    className="cursor-pointer hover:bg-indigo-100 hover:dark:bg-indigo-900 p-1 rounded transition-colors"
                    onClick={() => console.log('Selected location')}
                  >
                    📍 San Francisco, CA
                  </p>
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="font-semibold mb-3">Experience</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-medium cursor-pointer hover:bg-blue-100 hover:dark:bg-blue-900 p-1 rounded">
                      Senior Software Engineer
                    </h4>
                    <p className="text-blue-600 cursor-pointer hover:bg-purple-100 hover:dark:bg-purple-900 p-1 rounded">
                      TechCorp Solutions Inc.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Jan 2022 - Present • 2 years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay for selection hints */}
            {isPreviewMode && (
              <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-center font-medium">👆 Click on any element to create extraction rule</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Extraction Rules Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚙️ Extraction Rules
          </CardTitle>
          <CardDescription>
            Configure data extraction patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {extractionRules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{rule.field}</span>
                <Badge variant={
                  rule.status === 'active' ? 'default' : 
                  rule.status === 'error' ? 'destructive' : 'secondary'
                }>
                  {rule.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {rule.selector}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Test</Button>
                <Button size="sm" variant="ghost" className="text-red-600">Remove</Button>
              </div>
            </div>
          ))}

          {/* Add New Rule */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <Button variant="outline" className="w-full">
              ➕ Add New Rule
            </Button>
          </div>

          {/* Anti-Detection Settings */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-semibold flex items-center gap-2">
              🛡️ Anti-Detection
            </h4>
            <div className="space-y-2">
              <Label htmlFor="delay">Request Delay (ms)</Label>
              <Input id="delay" placeholder="1000-3000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proxy">Proxy Pool</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select proxy pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-residential">US Residential</SelectItem>
                  <SelectItem value="eu-datacenter">EU Datacenter</SelectItem>
                  <SelectItem value="global-mobile">Global Mobile</SelectItem>
                  <SelectItem value="premium-rotating">Premium Rotating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deploy Button */}
          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 mt-6">
            🚀 Deploy Scraper
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}