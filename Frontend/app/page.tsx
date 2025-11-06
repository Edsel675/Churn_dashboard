"use client"

import { useState } from "react"
import { MainNavbar } from "@/components/main-navbar"
import { DashboardSection } from "@/components/dashboard-section"
import { AnalysisSection } from "@/components/analysis-section"
import { CustomersSection } from "@/components/customers-section"

type NavSection = "dashboard" | "analysis" | "customers"

export default function Page() {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard")

  return (
    <div className="min-h-screen bg-background">
      <MainNavbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "analysis" && <AnalysisSection />}
          {activeSection === "customers" && <CustomersSection />}
        </div>
      </main>
    </div>
  )
}
