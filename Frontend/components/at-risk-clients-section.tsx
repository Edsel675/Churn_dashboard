"use client"

import { AtRiskCustomersTable } from "@/components/at-risk-customers-table"
import { KPIsCompact } from "@/components/kpis-compact"

export function AtRiskClientsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Clientes en Riesgo de Churn</h2>
        <p className="text-muted-foreground">
          Gestiona y da seguimiento a los clientes con mayor probabilidad de abandonar
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground">
            MÉTRICAS PRINCIPALES
          </h3>
        </div>
        <KPIsCompact />
      </div>

      <AtRiskCustomersTable />
    </section>
  )
}
