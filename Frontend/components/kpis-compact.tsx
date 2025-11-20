"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, AlertTriangle, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function KPIsCompact() {
  const kpis = [
    {
      label: "Tasa de Churn",
      value: "12.5%",
      change: 2.3,
      trend: "up" as const,
      icon: TrendingUp,
      iconBg: "bg-red-100 dark:bg-red-950/20",
      iconColor: "text-red-600 dark:text-red-500"
    },
    {
      label: "Clientes Totales",
      value: "4,231",
      change: 5.2,
      trend: "up" as const,
      icon: Users,
      iconBg: "bg-blue-100 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-500"
    },
    {
      label: "Clientes en Riesgo",
      value: "287",
      change: 12.8,
      trend: "up" as const,
      icon: AlertTriangle,
      iconBg: "bg-orange-100 dark:bg-orange-950/20",
      iconColor: "text-orange-600 dark:text-orange-500"
    },
    {
      label: "Tasa de Retención",
      value: "87.5%",
      change: 3.1,
      trend: "down" as const,
      icon: Target,
      iconBg: "bg-green-100 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon
        return (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-lg", kpi.iconBg)}>
                <Icon className={cn("h-5 w-5", kpi.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <span className={cn(
                    "text-xs font-medium",
                    kpi.trend === "up" ? "text-red-600" : "text-green-600"
                  )}>
                    {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">vs mes anterior</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

