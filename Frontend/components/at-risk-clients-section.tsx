"use client"

import { AtRiskCustomersTable } from "@/components/at-risk-customers-table"

export function AtRiskClientsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Clientes en Riesgo de Churn</h2>
        <p className="text-muted-foreground">
          Gestiona y da seguimiento a los clientes con mayor probabilidad de abandonar
        </p>
      </div>
      <AtRiskCustomersTable />
    </section>
  )
}
