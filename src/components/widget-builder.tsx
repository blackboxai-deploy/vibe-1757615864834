"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function WidgetBuilder() {
  const [widgetConfig, setWidgetConfig] = useState({
    name: 'LinkedIn Lead Extractor Widget',
    type: 'lead-scraper',
    size: 'medium',
    theme: 'auto',
    fields: ['name', 'title', 'company', 'email'],
    features: {
      realTime: true,
      antiDetection: true,
      captchaBypass: false,
      leadScoring: true
    }
  })

  const widgetCode = `<!-- ScrapeMaster Pro Widget -->
<div id="scrapemaster-widget"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${typeof window !== 'undefined' ? window.location.origin : ''}/widgets/embed.js';
    script.async = true;
    script.onload = function() {
      ScrapeMaster.init({
        container: '#scrapemaster-widget',
        apiKey: 'YOUR_API_KEY',
        widgetId: 'widget-${Date.now()}',
        config: ${JSON.stringify(widgetConfig, null, 2)}
      });
    };
    document.head.appendChild(script);
  })();
</script>`

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Widget Configuration */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Widget Configuration
            </CardTitle>
            <CardDescription>
              Configure your embeddable scraper widget
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="widget-name">Widget Name</Label>
              <Input
                id="widget-name"
                value={widgetConfig.name}
                onChange={(e) => setWidgetConfig({...widgetConfig, name: e.target.value})}
                placeholder="Enter widget name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="widget-type">Widget Type</Label>
              <Select
                value={widgetConfig.type}
                onValueChange={(value) => setWidgetConfig({...widgetConfig, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead-scraper">👥 Lead Scraper</SelectItem>
                  <SelectItem value="data-extractor">📊 Data Extractor</SelectItem>
                  <SelectItem value="contact-finder">🔍 Contact Finder</SelectItem>
                  <SelectItem value="company-research">🏢 Company Research</SelectItem>
                  <SelectItem value="social-matcher">📱 Social Matcher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Widget Size</Label>
                <Select
                  value={widgetConfig.size}
                  onValueChange={(value) => setWidgetConfig({...widgetConfig, size: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">📱 Compact</SelectItem>
                    <SelectItem value="medium">💻 Medium</SelectItem>
                    <SelectItem value="large">🖥️ Large</SelectItem>
                    <SelectItem value="fullwidth">📺 Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={widgetConfig.theme}
                  onValueChange={(value) => setWidgetConfig({...widgetConfig, theme: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">🌓 Auto</SelectItem>
                    <SelectItem value="light">☀️ Light</SelectItem>
                    <SelectItem value="dark">🌙 Dark</SelectItem>
                    <SelectItem value="custom">🎨 Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Data Fields to Extract</Label>
              <div className="flex flex-wrap gap-2">
                {['name', 'title', 'company', 'email', 'phone', 'location', 'social'].map((field) => (
                  <Badge 
                    key={field}
                    variant={widgetConfig.fields.includes(field) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const newFields = widgetConfig.fields.includes(field)
                        ? widgetConfig.fields.filter(f => f !== field)
                        : [...widgetConfig.fields, field]
                      setWidgetConfig({...widgetConfig, fields: newFields})
                    }}
                  >
                    {field}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Advanced Features</Label>
              <div className="space-y-3">
                {[
                  { key: 'realTime', label: 'Real-time Extraction', icon: '⚡' },
                  { key: 'antiDetection', label: 'Anti-Detection', icon: '🛡️' },
                  { key: 'captchaBypass', label: 'CAPTCHA Bypass', icon: '🤖' },
                  { key: 'leadScoring', label: 'AI Lead Scoring', icon: '🎯' }
                ].map(({ key, label, icon }) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <span>{icon}</span>
                      {label}
                    </label>
                    <Switch
                      checked={widgetConfig.features[key as keyof typeof widgetConfig.features]}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          features: { ...widgetConfig.features, [key]: checked }
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget Embed Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💻 Embed Code
            </CardTitle>
            <CardDescription>
              Copy and paste this code into your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              value={widgetCode}
              className="font-mono text-xs h-48 resize-none"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => navigator.clipboard.writeText(widgetCode)}
                className="flex-1"
              >
                📋 Copy Code
              </Button>
              <Button variant="outline">
                📧 Email Code
              </Button>
              <Button variant="outline">
                💾 Save Widget
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Widget Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👁️ Widget Preview
            </CardTitle>
            <CardDescription>
              Live preview of your widget
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Widget Preview Container */}
            <div className={`border-2 border-dashed rounded-lg p-6 ${
              widgetConfig.size === 'compact' ? 'max-w-xs' :
              widgetConfig.size === 'medium' ? 'max-w-md' :
              widgetConfig.size === 'large' ? 'max-w-lg' : 'w-full'
            } ${
              widgetConfig.theme === 'dark' ? 'bg-gray-900 text-white' :
              widgetConfig.theme === 'light' ? 'bg-white text-gray-900' : 'bg-card'
            }`}>
              {/* Widget Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  SM
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{widgetConfig.name}</h3>
                  <p className="text-xs opacity-75">
                    {widgetConfig.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              </div>

              {/* Widget Input */}
              <div className="space-y-3">
                <Input placeholder="Enter LinkedIn URL or profile name" className="text-sm" />
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  🚀 Extract Data
                </Button>
              </div>

              {/* Sample Results */}
              <div className="mt-4 space-y-2">
                <div className="text-xs font-medium opacity-75">Sample Results:</div>
                <div className="bg-muted/50 rounded p-3 space-y-2 text-xs">
                  {widgetConfig.fields.map((field) => (
                    <div key={field} className="flex justify-between">
                      <span className="capitalize opacity-75">{field}:</span>
                      <span className="font-medium">
                        {field === 'name' && 'Sarah Johnson'}
                        {field === 'title' && 'VP Engineering'}
                        {field === 'company' && 'TechCorp'}
                        {field === 'email' && 'sarah@techcorp.com'}
                        {field === 'phone' && '+1 555-123-4567'}
                        {field === 'location' && 'San Francisco, CA'}
                        {field === 'social' && '@sarahjohnson_dev'}
                      </span>
                    </div>
                  ))}
                  {widgetConfig.features.leadScoring && (
                    <div className="flex justify-between border-t pt-2">
                      <span className="opacity-75">AI Score:</span>
                      <Badge className="text-xs bg-green-600">92/100</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Widget Features */}
              <div className="mt-3 flex flex-wrap gap-1">
                {Object.entries(widgetConfig.features).map(([key, enabled]) => 
                  enabled && (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key === 'realTime' && '⚡ Real-time'}
                      {key === 'antiDetection' && '🛡️ Protected'}
                      {key === 'captchaBypass' && '🤖 CAPTCHA'}
                      {key === 'leadScoring' && '🎯 AI Scored'}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Preview Controls */}
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                📱 Mobile Preview
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                💻 Desktop Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Widget Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Widget Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Extractions</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <div>
                <p className="text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active Websites</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">2.1s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}