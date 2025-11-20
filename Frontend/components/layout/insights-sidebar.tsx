"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Users,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from "lucide-react"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Función de cálculo de monto ahorrado
function calculateSavedAmount() {
  const monthlyRevenue = 46000 // MRR promedio mensual
  const churnRate = 0.125 // 12.5%
  const potentialLoss = monthlyRevenue * churnRate
  return `$${(potentialLoss / 1000).toFixed(0)}k`
}

export function InsightsSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const insights = [
    {
      icon: DollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      title: "Monto Ahorrado Potencial",
      description: "Retención vs pérdida por churn",
      metric: calculateSavedAmount(),
      shortMetric: "45k"
    },
    {
      icon: AlertTriangle,
      iconColor: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      title: "Churn elevado en Básicos",
      description: "Tasa 18% vs 12.5% promedio",
      metric: "+5.5pp",
      shortMetric: "18%"
    },
    {
      icon: Users,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      title: "45 clientes inactivos 30+ días",
      description: "Alto riesgo de churn (85%)",
      metric: "45",
      shortMetric: "45"
    },
    {
      icon: TrendingUp,
      iconColor: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      title: "Retención Premium mejoró",
      description: "De 91.8% a 94.2% este mes",
      metric: "+2.4pp",
      shortMetric: "94%"
    }
  ]

  const healthScore = 76
  const scoreData = [{ value: healthScore, fill: "hsl(var(--color-chart-1))" }]

  return (
    <aside 
      className={cn(
        "hidden lg:block border-r bg-muted/30 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className={cn("p-6 pt-0 space-y-6", isCollapsed && "px-3")}>
        {/* Header - Solo en expanded */}
        {!isCollapsed && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm">INSIGHTS DEL MES</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Análisis automático de tendencias
            </p>
          </div>
        )}

        {/* Insights Cards */}
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <Card 
              key={i} 
              className="border-none shadow-sm hover:shadow-md transition-all"
            >
              <CardContent className={cn("p-4", isCollapsed && "p-3")}>
                {isCollapsed ? (
                  // Collapsed: Solo icono + métrica
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                      <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
                    </div>
                    <span className={`text-xs font-bold ${insight.iconColor}`}>
                      {insight.shortMetric}
                    </span>
                  </div>
                ) : (
                  // Expanded: Todo el contenido
                  <div className="flex gap-3">
                    <div className={`p-2.5 rounded-lg ${insight.bgColor} flex-shrink-0 transition-transform hover:scale-110`}>
                      <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1 line-clamp-1">
                        {insight.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">
                        {insight.description}
                      </p>
                      <span className={`text-sm font-bold ${insight.iconColor}`}>
                        {insight.metric}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Health Score */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
          <CardHeader className={cn("pb-3", isCollapsed && "pb-2 px-2")}>
            {!isCollapsed && (
              <CardTitle className="text-sm font-medium text-center">
                Salud del Negocio
              </CardTitle>
            )}
          </CardHeader>
          <CardContent className={cn("pb-4", isCollapsed && "px-2 pb-2")}>
            <ResponsiveContainer 
              width="100%" 
              height={isCollapsed ? 80 : 140}
            >
              <RadialBarChart
                cx="50%"
                cy="70%"
                innerRadius="60%"
                outerRadius="90%"
                barSize={isCollapsed ? 8 : 14}
                data={scoreData}
                startAngle={180}
                endAngle={0}
              >
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--color-chart-1))" />
                    <stop offset="100%" stopColor="hsl(174, 72%, 56%)" />
                  </linearGradient>
                </defs>
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill="url(#healthGradient)"
                  background={{ fill: "hsl(var(--muted))" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="text-center -mt-4">
              <div 
                className={cn(
                  "font-bold text-primary",
                  isCollapsed ? "text-2xl" : "text-5xl"
                )}
                style={{ textShadow: "0 0 20px rgba(20, 184, 166, 0.3)" }}
              >
                {healthScore}
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600 mb-1">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">+4 pts vs mes anterior</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Estado: Saludable ✓
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer - Solo en expanded */}
        {!isCollapsed && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Actualizado: {new Date().toLocaleDateString('es-MX', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
              })}
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
