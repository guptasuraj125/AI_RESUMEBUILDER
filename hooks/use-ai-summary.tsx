"use client"

import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function useAiSummary() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSummary = async (jobTitle: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      // Log API key to debug (Remove in production)
      console.log("API Key:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

      // Use gemini-1.5-flash for faster response
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      // Define the prompt
      const prompt = `Write a professional summary for a ${jobTitle} resume. Keep it concise (3-5 sentences), professional, and highlight key skills and value propositions. Do not use first-person pronouns.`

      // Generate text
      const result = await model.generateContent(prompt)
      const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response received."

      return text.trim()
    } catch (error) {
      console.error("Error generating summary:", error)
      setError("Failed to generate summary. Please try again.")
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateSummary, isGenerating, error }
}
