"use client"

import { useNavigation } from "@/contexts/navigation-context"
import { DashboardSection } from "@/components/dashboard-section"
import { AnalysisTabsSection } from "@/components/analysis-tabs-section"
import { AtRiskClientsSection } from "@/components/at-risk-clients-section"

export function DashboardContent() {
  const { activeSection } = useNavigation()

  return (
    <div className="p-6">
      {activeSection === "dashboard" && (
        <div className="animate-in fade-in duration-300 space-y-8">
          <DashboardSection />
        </div>
      )}

      {activeSection === "analysis" && (
        <div className="animate-in fade-in duration-300 space-y-8">
          <AnalysisTabsSection />
        </div>
      )}

      {activeSection === "clients" && (
        <div className="animate-in fade-in duration-300 space-y-8">
          <AtRiskClientsSection />
        </div>
      )}
    </div>
  )
}
