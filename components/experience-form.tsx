"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { ResumeData } from "@/components/resume-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Sparkles } from "lucide-react"
import { useAiJobDescription } from "@/hooks/use-ai-job-description"

interface ExperienceFormProps {
  experience: ResumeData["experience"]
  updateExperience: (experience: ResumeData["experience"]) => void
}

export function ExperienceForm({ experience, updateExperience }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState(experience)
  const { generateJobDescription, isGenerating } = useAiJobDescription()

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const removeExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedExperiences = experiences.map((exp) => (exp.id === id ? { ...exp, [name]: value } : exp))
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedExperiences = experiences.map((exp) => (exp.id === id ? { ...exp, current: checked } : exp))
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const handleGenerateDescription = async (id: string) => {
    const experience = experiences.find((exp) => exp.id === id)
    if (!experience || !experience.position || !experience.company) {
      alert("Please enter a position and company to generate a description")
      return
    }

    const description = await generateJobDescription(experience.position, experience.company)

    if (description) {
      const updatedExperiences = experiences.map((exp) => (exp.id === id ? { ...exp, description } : exp))
      setExperiences(updatedExperiences)
      updateExperience(updatedExperiences)
    }
  }

  return (
    <div className="space-y-6">
      {experiences.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No work experience added yet</p>
          <Button onClick={addExperience}>
            <Plus className="mr-2 h-4 w-4" />
            Add Work Experience
          </Button>
        </div>
      ) : (
        <>
          {experiences.map((exp) => (
            <Card key={exp.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardHeader>
                <CardTitle className="text-lg">Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, e)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input
                      id={`position-${exp.id}`}
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleChange(exp.id, e)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      name="startDate"
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleChange(exp.id, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${exp.id}`} className={exp.current ? "text-muted-foreground" : ""}>
                      End Date
                    </Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      name="endDate"
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleChange(exp.id, e)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => handleCheckboxChange(exp.id, checked as boolean)}
                  />
                  <Label htmlFor={`current-${exp.id}`} className="text-sm font-normal">
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerateDescription(exp.id)}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </Button>
                  </div>
                  <Textarea
                    id={`description-${exp.id}`}
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleChange(exp.id, e)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addExperience} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Experience
          </Button>
        </>
      )}
    </div>
  )
}

