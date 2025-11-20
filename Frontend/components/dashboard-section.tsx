import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { EconomicImpactChart } from "@/components/economic-impact-chart"
import { TransactionsMoMChart } from "@/components/transactions-mom-chart"
import { ChurnEvolutionForecastChart } from "@/components/churn-evolution-forecast-chart"
import { CallCenterCausesDonut } from "@/components/call-center-causes-donut"

export function DashboardSection() {
  return (
    <section className="space-y-6">
      <DashboardHeader />
      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChurnEvolutionForecastChart />
        <EconomicImpactChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionsMoMChart />
        <CallCenterCausesDonut />
      </div>
    </section>
  )
}
