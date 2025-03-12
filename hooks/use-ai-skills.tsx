"use client"

import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function useAiSkills() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSkills = async (jobTitle: string): Promise<string[] | null> => {
    setIsGenerating(true)
    try {
      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) // Use Gemini 1.5 Flash

      // Generate text
      const prompt = `Generate a list of 10 relevant skills for a ${jobTitle} position. Include both technical and soft skills. Format the response as a comma-separated list. Example: "JavaScript, Teamwork, Python, Communication, React, Problem Solving, SQL, Leadership, AWS, Time Management".`
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      // Parse the comma-separated list into an array
      const skills = text
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0)

      return skills
    } catch (error) {
      console.error("Error generating skills:", error)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateSkills, isGenerating }
}