import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { ChurnEvolutionChart } from "@/components/churn-evolution-chart"
import { EconomicImpactChart } from "@/components/economic-impact-chart"

export function DashboardSection() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChurnEvolutionChart />
        <EconomicImpactChart />
      </div>
    </div>
  )
}
