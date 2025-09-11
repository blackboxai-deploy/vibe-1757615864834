"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SystemConfiguration() {
  const [settings, setSettings] = useState({
    maxConcurrentBots: 5,
    defaultRequestDelay: 2000,
    retryAttempts: 3,
    sessionTimeout: 30,
    autoScaling: true,
    resourceOptimization: true,
    errorNotifications: true,
    debugMode: false,
    dataRetention: 90,
    backupFrequency: 'daily'
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 Performance Settings
          </CardTitle>
          <CardDescription>
            Configure system performance and resource limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="max-bots">Maximum Concurrent Bots</Label>
            <Input
              id="max-bots"
              type="number"
              value={settings.maxConcurrentBots}
              onChange={(e) => updateSetting('maxConcurrentBots', parseInt(e.target.value))}
              min={1}
              max={50}
            />
            <p className="text-xs text-muted-foreground">
              Higher values increase data collection speed but use more resources
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="request-delay">Default Request Delay (ms)</Label>
            <Input
              id="request-delay"
              type="number"
              value={settings.defaultRequestDelay}
              onChange={(e) => updateSetting('defaultRequestDelay', parseInt(e.target.value))}
              min={500}
              max={10000}
            />
            <p className="text-xs text-muted-foreground">
              Lower values are faster but increase detection risk
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="retry-attempts">Retry Attempts</Label>
            <Input
              id="retry-attempts"
              type="number"
              value={settings.retryAttempts}
              onChange={(e) => updateSetting('retryAttempts', parseInt(e.target.value))}
              min={0}
              max={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
              min={5}
              max={120}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Scaling</Label>
              <p className="text-xs text-muted-foreground">Automatically adjust resources based on demand</p>
            </div>
            <Switch
              checked={settings.autoScaling}
              onCheckedChange={(checked) => updateSetting('autoScaling', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Resource Optimization</Label>
              <p className="text-xs text-muted-foreground">Optimize memory and CPU usage</p>
            </div>
            <Switch
              checked={settings.resourceOptimization}
              onCheckedChange={(checked) => updateSetting('resourceOptimization', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 System Monitoring
          </CardTitle>
          <CardDescription>
            Monitor system health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">CPU Usage</span>
                <Badge variant="secondary">34%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{width: '34%'}}></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Memory</span>
                <Badge variant="secondary">67%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-green-600 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Disk Space</span>
                <Badge variant="secondary">23%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-yellow-600 rounded-full" style={{width: '23%'}}></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Network</span>
                <Badge variant="secondary">12%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-purple-600 rounded-full" style={{width: '12%'}}></div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Bots</span>
              <span className="text-sm">3 / {settings.maxConcurrentBots}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Requests/Hour</span>
              <span className="text-sm">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-sm text-green-600">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm">7d 14h 23m</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔔 Notifications
          </CardTitle>
          <CardDescription>
            Configure alerts and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Error Notifications</Label>
              <p className="text-xs text-muted-foreground">Get notified when bots encounter errors</p>
            </div>
            <Switch
              checked={settings.errorNotifications}
              onCheckedChange={(checked) => updateSetting('errorNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Debug Mode</Label>
              <p className="text-xs text-muted-foreground">Enable detailed logging and debug information</p>
            </div>
            <Switch
              checked={settings.debugMode}
              onCheckedChange={(checked) => updateSetting('debugMode', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label>Notification Methods</Label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>📧 Email notifications</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>📱 Browser notifications</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded" />
                <span>📲 SMS alerts</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded" />
                <span>🔗 Webhook notifications</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-webhook-url.com"
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💾 Data Management
          </CardTitle>
          <CardDescription>
            Configure data retention and backup settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data-retention">Data Retention (days)</Label>
            <Input
              id="data-retention"
              type="number"
              value={settings.dataRetention}
              onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
              min={7}
              max={365}
            />
            <p className="text-xs text-muted-foreground">
              How long to keep extracted data before automatic cleanup
            </p>
          </div>

          <div className="space-y-2">
            <Label>Backup Frequency</Label>
            <Select
              value={settings.backupFrequency}
              onValueChange={(value) => updateSetting('backupFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Storage Statistics</Label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Data Stored</span>
                <span>23.7 GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Backup</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Backup Size</span>
                <span>18.9 GB</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline">💾 Backup Now</Button>
            <Button size="sm" variant="outline">🗑️ Clean Old Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💾 Save Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              💾 Save Settings
            </Button>
            <Button variant="outline">🔄 Reset to Defaults</Button>
            <Button variant="outline">📤 Export Config</Button>
            <Button variant="outline">📥 Import Config</Button>
            
            <div className="ml-auto flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}