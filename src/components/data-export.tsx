"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const exportData = {
  leads: { count: 1247, size: '2.3 MB', lastUpdate: '2 hours ago' },
  companies: { count: 892, size: '1.8 MB', lastUpdate: '4 hours ago' },
  contacts: { count: 2156, size: '3.1 MB', lastUpdate: '1 hour ago' },
  social: { count: 643, size: '1.2 MB', lastUpdate: '3 hours ago' },
  enriched: { count: 1098, size: '4.7 MB', lastUpdate: '30 minutes ago' }
}

const exportFormats = [
  { value: 'csv', label: 'CSV', icon: '📊', description: 'Comma-separated values for Excel/Sheets' },
  { value: 'xlsx', label: 'Excel', icon: '📈', description: 'Microsoft Excel format with formatting' },
  { value: 'json', label: 'JSON', icon: '🔧', description: 'JavaScript Object Notation for APIs' },
  { value: 'xml', label: 'XML', icon: '📄', description: 'Extensible Markup Language' },
  { value: 'pdf', label: 'PDF', icon: '📑', description: 'Formatted report document' },
  { value: 'sql', label: 'SQL', icon: '🗄️', description: 'Database insert statements' }
]

export function DataExport() {
  const [selectedData, setSelectedData] = useState<string[]>(['leads', 'contacts'])
  const [exportFormat, setExportFormat] = useState('csv')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleDataSelection = (dataType: string, checked: boolean) => {
    if (checked) {
      setSelectedData([...selectedData, dataType])
    } else {
      setSelectedData(selectedData.filter(d => d !== dataType))
    }
  }

  const startExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const totalRecords = selectedData.reduce((sum, type) => sum + exportData[type as keyof typeof exportData].count, 0)
  const totalSize = selectedData.reduce((sum, type) => {
    const size = exportData[type as keyof typeof exportData].size
    const sizeInMB = parseFloat(size.replace(' MB', ''))
    return sum + sizeInMB
  }, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Data Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗂️ Select Data to Export
          </CardTitle>
          <CardDescription>
            Choose which datasets to include in your export
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(exportData).map(([key, data]) => (
            <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                checked={selectedData.includes(key)}
                onCheckedChange={(checked) => handleDataSelection(key, checked as boolean)}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium capitalize">{key} Data</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{data.count.toLocaleString()} records</Badge>
                    <Badge variant="outline">{data.size}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Last updated: {data.lastUpdate}</p>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total Selected:</span>
              <span>{totalRecords.toLocaleString()} records ({totalSize.toFixed(1)} MB)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚙️ Export Configuration
          </CardTitle>
          <CardDescription>
            Configure export format and options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <div className="grid grid-cols-2 gap-2">
              {exportFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    exportFormat === format.value ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                  }`}
                  onClick={() => setExportFormat(format.value)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{format.icon}</span>
                    <span className="font-medium">{format.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filename">File Name</Label>
            <Input
              id="filename"
              placeholder="scraped-data-2024"
              defaultValue={`scraped-data-${new Date().toISOString().split('T')[0]}`}
            />
          </div>

          <div className="space-y-3">
            <Label>Export Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-headers" defaultChecked />
                <Label htmlFor="include-headers" className="text-sm">Include column headers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-metadata" defaultChecked />
                <Label htmlFor="include-metadata" className="text-sm">Include metadata and timestamps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="clean-data" defaultChecked />
                <Label htmlFor="clean-data" className="text-sm">Clean and validate data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="compress-file" />
                <Label htmlFor="compress-file" className="text-sm">Compress file (ZIP)</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date Range Filter</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" placeholder="Start date" />
              <Input type="date" placeholder="End date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quality Filter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select quality filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="high">High Quality Only (Score 80+)</SelectItem>
                <SelectItem value="verified">Verified Contacts Only</SelectItem>
                <SelectItem value="complete">Complete Profiles Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Summary & Actions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📤 Export Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isExporting ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Exporting data...</span>
                <span className="text-sm text-muted-foreground">{exportProgress}% complete</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Processing {totalRecords.toLocaleString()} records in {exportFormat.toUpperCase()} format
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold">{totalRecords.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold">{totalSize.toFixed(1)} MB</p>
                  <p className="text-sm text-muted-foreground">File Size</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold uppercase">{exportFormat}</p>
                  <p className="text-sm text-muted-foreground">Format</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold">~2m</p>
                  <p className="text-sm text-muted-foreground">Est. Time</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  onClick={startExport}
                  disabled={selectedData.length === 0}
                  className="bg-gradient-to-r from-green-600 to-blue-600"
                >
                  📤 Start Export
                </Button>
                <Button variant="outline">📧 Email When Ready</Button>
                <Button variant="outline">📅 Schedule Export</Button>
                <Button variant="outline">💾 Save Template</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Export Presets */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Quick Export Presets
          </CardTitle>
          <CardDescription>
            Common export configurations for fast access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="font-semibold mb-2">📊 Complete Lead Report</h4>
              <p className="text-sm text-muted-foreground mb-3">All leads with enrichment data in Excel format</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">1,247 records</Badge>
                <Button size="sm" variant="outline">Export</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="font-semibold mb-2">📱 Contact List CSV</h4>
              <p className="text-sm text-muted-foreground mb-3">Clean contact information for CRM import</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">2,156 records</Badge>
                <Button size="sm" variant="outline">Export</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="font-semibold mb-2">🏢 Company Database</h4>
              <p className="text-sm text-muted-foreground mb-3">Company profiles with social media links</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">892 records</Badge>
                <Button size="sm" variant="outline">Export</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}