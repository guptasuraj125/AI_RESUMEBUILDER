"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { ExperienceForm } from "@/components/experience-form";
import { EducationForm } from "@/components/education-form";
import { SkillsForm } from "@/components/skills-form";
import { ResumePreview } from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
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
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
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

  const handlePreview = () => {
    // Open the resume preview in a new tab
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Resume Preview</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #1e40af; }
              h2 { color: #9333ea; }
              .section { margin-bottom: 20px; }
              .section h3 { border-bottom: 2px solid #1e40af; padding-bottom: 5px; }
              .experience, .education { margin-bottom: 15px; }
              .skills { display: flex; flex-wrap: wrap; gap: 5px; }
              .skill { background: #dbeafe; color: #1e40af; padding: 5px 10px; border-radius: 12px; }
            </style>
          </head>
          <body>
            <div id="resume-preview">
              ${document.getElementById("resume-preview")?.innerHTML}
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      toast.error("Failed to open preview. Please allow pop-ups for this site.");
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      // Add resume content to the PDF
      doc.setFontSize(18);
      doc.text(resumeData.personalInfo.name, 15, 15);
      doc.setFontSize(12);
      doc.text(`Email: ${resumeData.personalInfo.email}`, 15, 25);
      doc.text(`Phone: ${resumeData.personalInfo.phone}`, 15, 35);
      doc.text(`Location: ${resumeData.personalInfo.location}`, 15, 45);
      doc.text(`Title: ${resumeData.personalInfo.title}`, 15, 55);
      doc.text(`Summary: ${resumeData.personalInfo.summary}`, 15, 65);

      // Add experience
      doc.setFontSize(14);
      doc.text("Experience", 15, 80);
      resumeData.experience.forEach((exp, index) => {
        const y = 90 + index * 30;
        doc.text(`${exp.position} at ${exp.company}`, 15, y);
        doc.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, 15, y + 10);
        doc.text(exp.description, 15, y + 20);
      });

      // Add education
      doc.setFontSize(14);
      doc.text("Education", 15, 150);
      resumeData.education.forEach((edu, index) => {
        const y = 160 + index * 30;
        doc.text(`${edu.degree} in ${edu.field}`, 15, y);
        doc.text(`at ${edu.institution}`, 15, y + 10);
        doc.text(`${edu.startDate} - ${edu.current ? "Present" : edu.endDate}`, 15, y + 20);
      });

      // Add skills
      doc.setFontSize(14);
      doc.text("Skills", 15, 220);
      doc.text(resumeData.skills.join(", "), 15, 230);

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
            <TabsTrigger value="personal" className="hover:bg-blue-200">
              Personal
            </TabsTrigger>
            <TabsTrigger value="experience" className="hover:bg-blue-200">
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="hover:bg-blue-200">
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="hover:bg-blue-200">
              Skills
            </TabsTrigger>
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
          <Button variant="outline" onClick={handlePreview}>
            <FileText className="mr-2 h-4 w-4" />
            Preview
          </Button>
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