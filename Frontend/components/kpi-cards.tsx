"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, AlertTriangle, Target } from "lucide-react"

interface KPIData {
  label: string
  value: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
  color: string
}

export function KPICards() {
  const kpis: KPIData[] = [
    {
      label: "Tasa de Churn",
      value: "12.5%",
      change: 2.3,
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Clientes Totales",
      value: "4,231",
      change: 5.2,
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Clientes en Riesgo",
      value: "287",
      change: 12.8,
      trend: "up",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Tasa de Retención",
      value: "87.5%",
      change: 3.1,
      trend: "down",
      icon: <Target className="w-5 h-5" />,
      color: "bg-chart-4/10 text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="bg-card border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
            <div className={`${kpi.color} p-2 rounded-lg`}>{kpi.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-2">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-chart-4" />
                )}
                <span className={kpi.trend === "up" ? "text-destructive" : "text-chart-4"}>
                  {Math.abs(kpi.change)}%
                </span>
                <span className="text-xs text-muted-foreground">vs mes anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
