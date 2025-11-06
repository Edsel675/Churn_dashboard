"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { ContractTypeAnalysis } from "@/components/analysis-contract-type"
import { PaymentMethodAnalysis } from "@/components/analysis-payment-method"
import { ChargesVsChurnAnalysis } from "@/components/analysis-charges-vs-churn"

type AnalysisTab = "contract" | "payment" | "charges"

export function AnalysisTabsSection() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("contract")
  const [isCollapsed, setIsCollapsed] = useState(false)

  const tabs = [
    { id: "contract" as const, label: "Distribución por Tipo de Contrato" },
    { id: "payment" as const, label: "Método de Pago" },
    { id: "charges" as const, label: "Relación Cargos vs Churn" },
  ]

  return (
    <Card className="bg-card border border-border">
      <CardHeader className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Análisis Detallado</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Explorá datos más profundos sobre comportamiento de churn
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${isCollapsed ? "" : "rotate-180"}`}
          />
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-6">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-b-none ${
                  activeTab === tab.id
                    ? "border-b-2 border-primary bg-transparent text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {activeTab === "contract" && <ContractTypeAnalysis />}
          {activeTab === "payment" && <PaymentMethodAnalysis />}
          {activeTab === "charges" && <ChargesVsChurnAnalysis />}
        </CardContent>
      )}
    </Card>
  )
}
