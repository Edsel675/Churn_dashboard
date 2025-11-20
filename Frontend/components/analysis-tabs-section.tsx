"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContractTypeAnalysis } from "@/components/analysis-contract-type"
import { PaymentMethodAnalysis } from "@/components/analysis-payment-method"
import { ChargesVsChurnAnalysis } from "@/components/analysis-charges-vs-churn"
import { UserLevelHeatmap } from "@/components/user-level-heatmap"
import { AgentQualityTable } from "@/components/call-center/agent-quality-table"
import { AgentQualityChart } from "@/components/call-center/agent-quality-chart"
import { ResponseVsChurn } from "@/components/call-center/response-vs-churn"
import { CallCenterCausesDonut } from "@/components/call-center-causes-donut"
import { ChurnByCauseChart } from "@/components/call-center/churn-by-cause-chart"
import { GeoChurnMap } from "@/components/geo/geo-churn-map"
import { FrequencyVsChurn } from "@/components/tx/frequency-vs-churn"
import { DaysSinceLastTxHist } from "@/components/tx/days-since-last-tx-hist"
import { MultiMetricTimeSeries } from "@/components/multi-metric-time-series"
import { ChurnCumulativeSeries } from "@/components/churn-cumulative-series"
import { ActiveUsersSeries } from "@/components/active-users-series"
import { KPIsCompact } from "@/components/kpis-compact"

 type AnalysisTab =
  | "contract"
  | "payment"
  | "charges"
  | "heatmap"
  | "geo"
  | "tx"
  | "callcenter"
  | "advanced"
 
 export function AnalysisTabsSection() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("contract")
 
  const tabs = [
    { id: "contract" as const, label: "Distribución por Tipo de Contrato" },
    { id: "payment" as const, label: "Método de Pago" },
    { id: "charges" as const, label: "Relación Cargos vs Churn" },
    { id: "heatmap" as const, label: "Mapa de Calor" },
    { id: "geo" as const, label: "Geografía" },
    { id: "tx" as const, label: "Transacciones" },
    { id: "callcenter" as const, label: "Call Center" },
    { id: "advanced" as const, label: "Métricas Avanzadas" },
  ]
 
  return (
    <section className="space-y-6">
      {/* KPIs compactos */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground">
            MÉTRICAS PRINCIPALES
          </h3>
        </div>
        <KPIsCompact />
      </div>

      {/* Separador sutil */}
      <div className="border-t pt-6" />

      {/* Header de la sección */}
      <div>
        <h2 className="text-2xl font-bold">Análisis Detallado</h2>
        <p className="text-muted-foreground mt-1">
          Explora segmentaciones profundas de tus datos de churn
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b overflow-x-auto">
        <div className="flex items-center gap-2 pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "contract" && <ContractTypeAnalysis />}
        {activeTab === "payment" && <PaymentMethodAnalysis />}
        {activeTab === "charges" && <ChargesVsChurnAnalysis />}
        {activeTab === "heatmap" && <UserLevelHeatmap />}
        {activeTab === "geo" && (
          <div className="grid grid-cols-1 gap-6">
            <GeoChurnMap />
          </div>
        )}
        {activeTab === "tx" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FrequencyVsChurn />
            <DaysSinceLastTxHist />
          </div>
        )}
        {activeTab === "callcenter" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <CallCenterCausesDonut />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ChurnByCauseChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgentQualityTable />
              <AgentQualityChart />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ResponseVsChurn />
            </div>
          </div>
        )}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MultiMetricTimeSeries />
              <ChurnCumulativeSeries />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ActiveUsersSeries />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
