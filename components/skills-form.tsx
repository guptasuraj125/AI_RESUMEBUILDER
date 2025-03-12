"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ResumeData } from "@/components/resume-builder"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles } from "lucide-react"
import { useAiSkills } from "@/hooks/use-ai-skills"

interface SkillsFormProps {
  skills: ResumeData["skills"]
  updateSkills: (skills: ResumeData["skills"]) => void
}

export function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [skillsList, setSkillsList] = useState(skills)
  const [newSkill, setNewSkill] = useState("")
  const { generateSkills, isGenerating } = useAiSkills()

  // Add a skill to the list
  const addSkill = () => {
    if (!newSkill.trim()) return

    const updatedSkills = [...skillsList, newSkill.trim()]
    setSkillsList(updatedSkills)
    updateSkills(updatedSkills)
    setNewSkill("")
  }

  // Remove a skill from the list
  const removeSkill = (index: number) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index)
    setSkillsList(updatedSkills)
    updateSkills(updatedSkills)
  }

  // Handle Enter key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  // Generate skills using AI
  const handleGenerateSkills = async () => {
    const jobTitle = prompt("Enter your job title to generate relevant skills:")
    if (!jobTitle) return

    try {
      const generatedSkills = await generateSkills(jobTitle)
      if (generatedSkills && generatedSkills.length > 0) {
        // Filter out duplicates and update the skills list
        const newSkills = generatedSkills.filter((skill) => !skillsList.includes(skill))
        const updatedSkills = [...skillsList, ...newSkills]
        setSkillsList(updatedSkills)
        updateSkills(updatedSkills)
      }
    } catch (error) {
      console.error("Failed to generate skills:", error)
      alert("Failed to generate skills. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Skills Input and AI Generation Button */}
        <div className="flex justify-between items-center">
          <Label htmlFor="skills">Skills</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleGenerateSkills}
            disabled={isGenerating}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
        </div>

        {/* Input Field and Add Button */}
        <div className="flex gap-2">
          <Input
            id="skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2 mt-4">
          {skillsList.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No skills added yet. Add skills that are relevant to your profession.
            </p>
          ) : (
            skillsList.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>

      {/* Pro Tip Card */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Pro tip:</strong> Include a mix of technical skills (like programming languages or software) and
            soft skills (like communication or leadership) relevant to your target role.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}