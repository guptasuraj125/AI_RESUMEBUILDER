"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeData } from "@/components/resume-builder"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useAiSummary } from "@/hooks/use-ai-summary"

interface PersonalInfoFormProps {
  personalInfo: ResumeData["personalInfo"]
  updatePersonalInfo: (personalInfo: ResumeData["personalInfo"]) => void
}

export function PersonalInfoForm({ personalInfo, updatePersonalInfo }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(personalInfo)
  const { generateSummary, isGenerating } = useAiSummary()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    updatePersonalInfo({ ...formData, [name]: value })
  }

  const handleGenerateSummary = async () => {
    if (!formData.title) {
      alert("Please enter a job title to generate a summary")
      return
    }

    const summary = await generateSummary(formData.title)
    if (summary) {
      const updatedInfo = { ...formData, summary }
      setFormData(updatedInfo)
      updatePersonalInfo(updatedInfo)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, State"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button type="button" size="sm" variant="outline" onClick={handleGenerateSummary} disabled={isGenerating}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Write a professional summary..."
          rows={5}
        />
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Pro tip:</strong> Your professional summary should be concise (3-5 sentences) and highlight your
            expertise, experience, and key achievements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

