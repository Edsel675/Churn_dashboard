"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, AlertTriangle, Target, DollarSign, Phone } from "lucide-react"

interface KPIData {
  label: string
  value: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
  color: string
  subtitle?: string
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
    {
      label: "Ahorros del Último Mes",
      value: "$124.5k",
      change: 8.3,
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-chart-4/10 text-chart-4",
      subtitle: "47 clientes retenidos",
    },
    {
      label: "Casos del Contact Center",
      value: "1,234",
      change: -5.2,
      trend: "down",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-primary/10 text-primary",
      subtitle: "1,089 resueltos • 145 pendientes",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="bg-card border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2 px-2.5">
            <CardTitle className="text-[10px] font-medium text-muted-foreground leading-tight">{kpi.label}</CardTitle>
            <div className={`${kpi.color} p-1 rounded-md flex-shrink-0`}>
              {React.cloneElement(kpi.icon as React.ReactElement, { className: "w-3 h-3" })}
            </div>
          </CardHeader>
          <CardContent className="px-2.5 pb-2 pt-0">
            <div className="flex flex-col">
              <div className="text-base font-bold text-foreground leading-tight">{kpi.value}</div>
              {kpi.subtitle && (
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-1">{kpi.subtitle}</div>
              )}
              <div className="flex items-center gap-0.5 mt-1 flex-wrap">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-2.5 h-2.5 text-destructive flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5 text-chart-4 flex-shrink-0" />
                )}
                <span className={`text-[10px] font-medium ${kpi.trend === "up" ? "text-destructive" : "text-chart-4"}`}>
                  {Math.abs(kpi.change)}%
                </span>
                <span className="text-[10px] text-muted-foreground">vs anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
