import { ResumeBuilder } from "@/components/resume-builder"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>
        <ResumeBuilder />
      </div>
    </main>
  )
}

