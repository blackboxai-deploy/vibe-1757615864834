"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

const crmIntegrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '☁️',
    description: 'Sync leads directly to Salesforce CRM with field mapping and automation',
    status: 'connected',
    syncedLeads: 1247,
    lastSync: '2 hours ago',
    features: ['Lead Sync', 'Contact Sync', 'Opportunity Creation', 'Custom Fields'],
    plan: 'Enterprise'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    logo: '🧡',
    description: 'Automatically create contacts and companies in your HubSpot portal',
    status: 'connected',
    syncedLeads: 892,
    lastSync: '1 hour ago',
    features: ['Contact Sync', 'Company Sync', 'Deal Creation', 'Email Integration'],
    plan: 'Professional'
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    logo: '🟢',
    description: 'Push qualified leads to your Pipedrive sales pipeline',
    status: 'disconnected',
    syncedLeads: 0,
    lastSync: 'Never',
    features: ['Person Sync', 'Organization Sync', 'Deal Creation', 'Activity Sync'],
    plan: 'Basic'
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    logo: '🔷',
    description: 'Integrate with Zoho CRM for comprehensive lead management',
    status: 'disconnected',
    syncedLeads: 0,
    lastSync: 'Never',
    features: ['Lead Sync', 'Contact Sync', 'Account Sync', 'Custom Modules'],
    plan: 'Professional'
  },
  {
    id: 'monday',
    name: 'Monday.com',
    logo: '🟣',
    description: 'Create work items and track leads in Monday.com boards',
    status: 'disconnected',
    syncedLeads: 0,
    lastSync: 'Never',
    features: ['Item Creation', 'Board Sync', 'Status Updates', 'File Attachments'],
    plan: 'Basic'
  },
  {
    id: 'notion',
    name: 'Notion',
    logo: '🗂️',
    description: 'Add scraped data to your Notion databases and workflows',
    status: 'connected',
    syncedLeads: 567,
    lastSync: '30 minutes ago',
    features: ['Database Sync', 'Page Creation', 'Property Mapping', 'Template Support'],
    plan: 'Pro'
  }
]

export function CRMIntegrations() {
  const [selectedCRM, setSelectedCRM] = useState(crmIntegrations[0])

  const getStatusBadge = (status: string) => {
    return status === 'connected' ? (
      <Badge className="bg-green-600">✅ Connected</Badge>
    ) : (
      <Badge variant="secondary">❌ Disconnected</Badge>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* CRM List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔗 Available Integrations
          </CardTitle>
          <CardDescription>
            Connect with popular CRM platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {crmIntegrations.map((crm) => (
              <div
                key={crm.id}
                className={`p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedCRM.id === crm.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedCRM(crm)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crm.logo}</span>
                    <div>
                      <h4 className="font-semibold">{crm.name}</h4>
                      <p className="text-xs text-muted-foreground">{crm.plan} Plan</p>
                    </div>
                  </div>
                  {getStatusBadge(crm.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{crm.description}</p>
                {crm.status === 'connected' && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{crm.syncedLeads} leads synced</span>
                    <span>Last: {crm.lastSync}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CRM Configuration */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCRM.logo}</span>
              <div>
                <CardTitle>{selectedCRM.name} Integration</CardTitle>
                <CardDescription>{selectedCRM.description}</CardDescription>
              </div>
            </div>
            {getStatusBadge(selectedCRM.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedCRM.status === 'connected' ? (
            <>
              {/* Connection Status */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedCRM.syncedLeads}</p>
                  <p className="text-sm text-muted-foreground">Leads Synced</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">98.7%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">Live</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
              </div>

              {/* Sync Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold">Sync Configuration</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Sync New Leads</Label>
                    <p className="text-xs text-muted-foreground">Automatically sync new leads as they're discovered</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Update Existing Records</Label>
                    <p className="text-xs text-muted-foreground">Update existing CRM records with new data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Create Opportunities</Label>
                    <p className="text-xs text-muted-foreground">Automatically create opportunities for high-score leads</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Bidirectional Sync</Label>
                    <p className="text-xs text-muted-foreground">Sync updates back from CRM to ScrapeMaster</p>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Field Mapping */}
              <div className="space-y-4">
                <h4 className="font-semibold">Field Mapping</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">ScrapeMaster Field</Label>
                      <p className="font-medium">Name</p>
                    </div>
                    <div>
                      <Label className="text-xs">{selectedCRM.name} Field</Label>
                      <p className="font-medium">First Name + Last Name</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">ScrapeMaster Field</Label>
                      <p className="font-medium">Email</p>
                    </div>
                    <div>
                      <Label className="text-xs">{selectedCRM.name} Field</Label>
                      <p className="font-medium">Email Address</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">ScrapeMaster Field</Label>
                      <p className="font-medium">Company</p>
                    </div>
                    <div>
                      <Label className="text-xs">{selectedCRM.name} Field</Label>
                      <p className="font-medium">Company Name</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">⚙️ Configure Mapping</Button>
                </div>
              </div>

              {/* Sync Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline">🔄 Sync Now</Button>
                <Button variant="outline">📊 View Sync Log</Button>
                <Button variant="outline">⚙️ Advanced Settings</Button>
                <Button variant="destructive" className="ml-auto">🔌 Disconnect</Button>
              </div>
            </>
          ) : (
            <>
              {/* Connection Setup */}
              <div className="space-y-4">
                <h4 className="font-semibold">Connect to {selectedCRM.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Enter your {selectedCRM.name} credentials to establish the connection
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key / Token</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder={`Enter your ${selectedCRM.name} API key`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instance-url">Instance URL (if applicable)</Label>
                    <Input
                      id="instance-url"
                      placeholder="https://your-instance.salesforce.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username (if required)</Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h5 className="font-medium mb-2">Setup Instructions:</h5>
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                    <li>Log into your {selectedCRM.name} account</li>
                    <li>Navigate to API settings or integrations</li>
                    <li>Generate a new API key or token</li>
                    <li>Copy the key and paste it above</li>
                    <li>Click "Test Connection" to verify</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                    🔌 Connect {selectedCRM.name}
                  </Button>
                  <Button variant="outline">🧪 Test Connection</Button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold">Available Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCRM.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Integration Analytics */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Integration Analytics
          </CardTitle>
          <CardDescription>
            Monitor sync performance and data flow across all integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">
                {crmIntegrations.filter(c => c.status === 'connected').length}
              </p>
              <p className="text-sm text-muted-foreground">Active Integrations</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">
                {crmIntegrations.reduce((sum, crm) => sum + crm.syncedLeads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Synced Records</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">97.3%</p>
              <p className="text-sm text-muted-foreground">Average Success Rate</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-muted-foreground">Sync Errors (24h)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}