"use client"; // Ensure this is the first line

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { ExperienceForm } from "@/components/experience-form";
import { EducationForm } from "@/components/education-form";
import { SkillsForm } from "@/components/skills-form";
import { ResumePreview } from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner"; // For toast notifications

export type ResumeData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }[];
  skills: string[];
};

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });
  const [isExporting, setIsExporting] = useState(false);

  // Functions to update state
  const updatePersonalInfo = (personalInfo: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
  };

  const updateExperience = (experience: ResumeData["experience"]) => {
    setResumeData((prev) => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData["skills"]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf"); // ✅ Dynamic Import Fixes Build Error

      const doc = new jsPDF();

      // Add resume content to the PDF
      doc.setFontSize(18);
      doc.text(resumeData.personalInfo.name || "N/A", 15, 15);
      doc.setFontSize(12);
      doc.text(`Email: ${resumeData.personalInfo.email || "N/A"}`, 15, 25);
      doc.text(`Phone: ${resumeData.personalInfo.phone || "N/A"}`, 15, 35);
      doc.text(`Location: ${resumeData.personalInfo.location || "N/A"}`, 15, 45);
      doc.text(`Title: ${resumeData.personalInfo.title || "N/A"}`, 15, 55);
      doc.text(`Summary: ${resumeData.personalInfo.summary || "N/A"}`, 15, 65);

      // Save the PDF
      doc.save("resume.pdf");
      toast.success("Resume exported successfully!");
    } catch (error) {
      console.error("Error exporting resume:", error);
      toast.error("Failed to export resume. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_1fr] gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      {/* Left Side: Forms */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-gradient-to-r from-blue-100 to-purple-100">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PersonalInfoForm personalInfo={resumeData.personalInfo} updatePersonalInfo={updatePersonalInfo} />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceForm experience={resumeData.experience} updateExperience={updateExperience} />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm education={resumeData.education} updateEducation={updateEducation} />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm skills={resumeData.skills} updateSkills={updateSkills} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Side: Preview and Export */}
      <div className="flex flex-col gap-4">
        {/* Export Buttons */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex justify-end gap-2">
          <Button onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>

        {/* Resume Preview */}
        <div id="resume-preview" className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex-1 overflow-auto">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
