"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { ResumeData } from "@/components/resume-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  education: ResumeData["education"]
  updateEducation: (education: ResumeData["education"]) => void
}

export function EducationForm({ education, updateEducation }: EducationFormProps) {
  const [educations, setEducations] = useState(education)

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const removeEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedEducations = educations.map((edu) => (edu.id === id ? { ...edu, [name]: value } : edu))
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedEducations = educations.map((edu) => (edu.id === id ? { ...edu, current: checked } : edu))
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  return (
    <div className="space-y-6">
      {educations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addEducation}>
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      ) : (
        <>
          {educations.map((edu) => (
            <Card key={edu.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleChange(edu.id, e)}
                    placeholder="University or School Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(edu.id, e)}
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      name="field"
                      value={edu.field}
                      onChange={(e) => handleChange(edu.id, e)}
                      placeholder="Computer Science, Business, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${edu.id}`}
                      name="startDate"
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleChange(edu.id, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${edu.id}`} className={edu.current ? "text-muted-foreground" : ""}>
                      End Date
                    </Label>
                    <Input
                      id={`endDate-${edu.id}`}
                      name="endDate"
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleChange(edu.id, e)}
                      disabled={edu.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${edu.id}`}
                    checked={edu.current}
                    onCheckedChange={(checked) => handleCheckboxChange(edu.id, checked as boolean)}
                  />
                  <Label htmlFor={`current-${edu.id}`} className="text-sm font-normal">
                    I am currently studying here
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addEducation} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Education
          </Button>
        </>
      )}
    </div>
  )
}

