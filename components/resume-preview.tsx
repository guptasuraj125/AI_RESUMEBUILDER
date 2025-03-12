"use client"; // Ensures this runs only on the client side

import type { ResumeData } from "@/components/resume-builder";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  if (!resumeData) return null; // Prevents errors if no data is provided

  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="font-sans text-sm bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        {personalInfo?.name && (
          <h1 className="text-3xl font-bold text-blue-800">{personalInfo.name}</h1>
        )}
        {personalInfo?.title && (
          <h2 className="text-lg text-purple-600 mt-2">{personalInfo.title}</h2>
        )}

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-x-4 mt-3 text-sm text-gray-700">
          {personalInfo?.email && (
            <div className="flex items-center gap-1">
              <span className="text-blue-600">✉️</span>
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <span className="text-blue-600">📞</span>
              {personalInfo.phone}
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1">
              <span className="text-blue-600">📍</span>
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Work Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-700">{exp.position}</h4>
                    <h5 className="text-gray-600">{exp.company}</h5>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {exp.startDate && (
                      <>
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                        {" - "}
                        {exp.current
                          ? "Present"
                          : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                          : ""}
                      </>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-700">{edu.institution}</h4>
                    <h5 className="text-gray-600">
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </h5>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {edu.startDate && (
                      <>
                        {new Date(edu.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                        {" - "}
                        {edu.current
                          ? "Present"
                          : edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                          : ""}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
