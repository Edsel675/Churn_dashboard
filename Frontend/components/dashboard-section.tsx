import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { ChurnEvolutionChart } from "@/components/churn-evolution-chart"
import { EconomicImpactChart } from "@/components/economic-impact-chart"
import { TransactionsMoMChart } from "@/components/transactions-mom-chart"
import { ChurnForecastChart } from "@/components/churn-forecast-chart"

export function DashboardSection() {
  return (
    <section className="space-y-6">
      <DashboardHeader />
      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChurnEvolutionChart />
        <EconomicImpactChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionsMoMChart />
        <ChurnForecastChart />
      </div>
    </section>
  )
}
