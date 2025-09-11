"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const deploymentPlatforms = [
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '▲',
    description: 'Fastest deployment with global CDN',
    pros: ['Instant deployment', 'Auto-scaling', 'Global CDN', 'Zero config'],
    cons: ['Usage limits on free plan'],
    pricing: 'Free tier available',
    deployTime: '~2 minutes',
    difficulty: 'Beginner',
    recommended: true
  },
  {
    id: 'netlify',
    name: 'Netlify',
    icon: '🌐',
    description: 'Simple deployment with great features',
    pros: ['Easy setup', 'Branch previews', 'Form handling', 'Identity service'],
    cons: ['Function limits', 'Build time limits'],
    pricing: 'Free tier available',
    deployTime: '~3 minutes',
    difficulty: 'Beginner',
    recommended: false
  },
  {
    id: 'docker',
    name: 'Docker Self-Hosted',
    icon: '🐳',
    description: 'Full control with containerization',
    pros: ['Complete control', 'Any VPS/cloud', 'Custom config', 'No limits'],
    cons: ['Requires setup', 'Server management', 'Security responsibility'],
    pricing: 'VPS costs (~$5-20/month)',
    deployTime: '~10 minutes',
    difficulty: 'Intermediate',
    recommended: false
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    icon: '☁️',
    description: 'Enterprise-grade with full AWS services',
    pros: ['Enterprise features', 'Unlimited scaling', 'Advanced monitoring', 'Full AWS ecosystem'],
    cons: ['Complex setup', 'Higher costs', 'Steep learning curve'],
    pricing: 'Pay-per-use (~$10-100+/month)',
    deployTime: '~15 minutes',
    difficulty: 'Advanced',
    recommended: false
  }
]

export function DeploymentWizard() {
  const [selectedPlatform, setSelectedPlatform] = useState('vercel')
  const [customDomain, setCustomDomain] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([])
  const [deploymentUrl, setDeploymentUrl] = useState('')

  const selectedPlatformData = deploymentPlatforms.find(p => p.id === selectedPlatform)

  const startDeployment = async () => {
    setIsDeploying(true)
    setDeploymentProgress(0)
    setDeploymentLogs([])

    try {
      // Start deployment
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedPlatform,
          domain: customDomain,
          config: {
            nodeVersion: '18.x',
            buildCommand: 'pnpm run build --no-lint',
            installCommand: 'pnpm install'
          }
        })
      })

      const deployment = await response.json()
      if (deployment.success) {
        setDeploymentUrl(deployment.urls.app)
        simulateDeploymentProgress(deployment.deploymentId)
      }
    } catch (error) {
      console.error('Deployment failed:', error)
      setIsDeploying(false)
    }
  }

  const simulateDeploymentProgress = (deploymentId: string) => {
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        const newProgress = Math.min(100, prev + Math.random() * 15)
        
        // Add logs based on progress
        if (newProgress > 20 && newProgress < 25) {
          setDeploymentLogs(logs => [...logs, '📦 Installing dependencies...'])
        } else if (newProgress > 40 && newProgress < 45) {
          setDeploymentLogs(logs => [...logs, '🔨 Building application...'])
        } else if (newProgress > 60 && newProgress < 65) {
          setDeploymentLogs(logs => [...logs, '🚀 Deploying to platform...'])
        } else if (newProgress > 80 && newProgress < 85) {
          setDeploymentLogs(logs => [...logs, '🔒 Setting up SSL certificate...'])
        } else if (newProgress >= 100) {
          setDeploymentLogs(logs => [...logs, '✅ Deployment successful!'])
          setIsDeploying(false)
          clearInterval(interval)
        }

        return newProgress
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 Deployment Wizard
          </CardTitle>
          <CardDescription>
            Deploy your ScrapeMaster Pro to production in minutes
          </CardDescription>
        </CardHeader>
      </Card>

      {!isDeploying ? (
        <>
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Deployment Platform</CardTitle>
              <CardDescription>
                Select the platform that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {deploymentPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPlatform === platform.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{platform.icon}</span>
                        <h3 className="font-semibold">{platform.name}</h3>
                      </div>
                      {platform.recommended && (
                        <Badge className="bg-green-600">Recommended</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {platform.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Deploy Time:</span>
                        <p>{platform.deployTime}</p>
                      </div>
                      <div>
                        <span className="font-medium">Difficulty:</span>
                        <p>{platform.difficulty}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Pricing:</span>
                        <p>{platform.pricing}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Details */}
          {selectedPlatformData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedPlatformData.icon} {selectedPlatformData.name} Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="config">Configuration</TabsTrigger>
                    <TabsTrigger value="guide">Setup Guide</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Advantages</h4>
                        <ul className="space-y-1 text-sm">
                          {selectedPlatformData.pros.map((pro, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-green-600">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-600 mb-2">Considerations</h4>
                        <ul className="space-y-1 text-sm">
                          {selectedPlatformData.cons.map((con, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-orange-600">⚠</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="config" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="domain">Custom Domain (Optional)</Label>
                        <Input
                          id="domain"
                          placeholder="your-domain.com"
                          value={customDomain}
                          onChange={(e) => setCustomDomain(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave empty to use platform's default domain
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Environment</Label>
                        <Select defaultValue="production">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="staging">Staging</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto (Recommended)</SelectItem>
                            <SelectItem value="us-east">US East</SelectItem>
                            <SelectItem value="us-west">US West</SelectItem>
                            <SelectItem value="eu-west">Europe West</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="guide" className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <h4 className="font-semibold mb-2">Pre-deployment Checklist</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Application built and tested successfully</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Environment variables configured</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Database connection tested</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>API endpoints validated</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">What happens during deployment:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Source code validation</li>
                          <li>Dependency installation</li>
                          <li>Production build generation</li>
                          <li>Asset optimization</li>
                          <li>Server deployment</li>
                          <li>Health check verification</li>
                          <li>Domain configuration (if provided)</li>
                        </ol>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Deploy Button */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Ready to Deploy?</h3>
                <p className="text-muted-foreground">
                  Your ScrapeMaster Pro will be deployed to {selectedPlatformData?.name} with all features enabled
                </p>
                <Button
                  onClick={startDeployment}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8"
                >
                  🚀 Deploy to {selectedPlatformData?.name}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Estimated deployment time: {selectedPlatformData?.deployTime}
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Deployment Progress */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Deploying to {selectedPlatformData?.name}
            </CardTitle>
            <CardDescription>
              Please wait while your application is being deployed...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Deployment Progress</span>
                <span>{Math.round(deploymentProgress)}%</span>
              </div>
              <Progress value={deploymentProgress} className="h-3" />
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Deployment Logs</h4>
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded max-h-48 overflow-y-auto">
                {deploymentLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
                <div className="animate-pulse">_</div>
              </div>
            </div>

            {deploymentProgress === 100 && (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-2xl">✅</span>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    Deployment Successful!
                  </h4>
                </div>
                <p className="text-green-700 dark:text-green-300">
                  Your ScrapeMaster Pro is now live and ready to use.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => window.open(deploymentUrl, '_blank')}
                    className="bg-green-600"
                  >
                    🌐 Open Application
                  </Button>
                  <Button variant="outline">
                    📊 View Analytics
                  </Button>
                  <Button variant="outline">
                    ⚙️ Manage Settings
                  </Button>
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  <p><strong>URL:</strong> {deploymentUrl}</p>
                  <p><strong>Status:</strong> Online and operational</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}