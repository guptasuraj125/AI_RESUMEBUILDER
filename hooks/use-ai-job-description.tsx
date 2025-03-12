"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Ensure you're using named export (not default)
export function useAiJobDescription() {
  const [isGenerating, setIsGenerating] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("🚨 Gemini API Key is missing! Check your .env.local file.");
  }

  const generateJobDescription = async (position: string, company: string) => {
    setIsGenerating(true);
    try {
      console.log("🔍 Using Gemini 1.5 Flash Model...");

      if (!API_KEY) throw new Error("🚨 Gemini API Key is missing!");

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create a prompt for generating job descriptions
      const prompt = `Write a **professional job description** for a **${position}** at **${company}**.
      - Focus on **key responsibilities and achievements**.
      - Use **bullet points** and **action verbs**.
      - Keep it concise and **industry-standard**.`;

      // Generate the AI response
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      

      // Extract response text
   

      return text.trim();
    } catch (error) {
      console.error("❌ Error generating job description:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateJobDescription, isGenerating };
}
