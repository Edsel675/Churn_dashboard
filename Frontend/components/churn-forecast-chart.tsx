"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

// Mock de forecast: histórico sólido Ene-Agosto, forecast punteado Sep-Dic con banda de confianza
const CHURN_FORECAST = [
  // Histórico
  { mes: "Enero", churn: 8.2, tipo: "historico" as const },
  { mes: "Febrero", churn: 9.1, tipo: "historico" as const },
  { mes: "Marzo", churn: 8.5, tipo: "historico" as const },
  { mes: "Abril", churn: 10.2, tipo: "historico" as const },
  { mes: "Mayo", churn: 11.8, tipo: "historico" as const },
  { mes: "Junio", churn: 10.9, tipo: "historico" as const },
  { mes: "Julio", churn: 11.5, tipo: "historico" as const },
  { mes: "Agosto", churn: 12.5, tipo: "historico" as const },
  // Forecast (ligero crecimiento hacia 13.5%)
  { mes: "Septiembre", churn: 12.8, low: 12.1, high: 13.5, tipo: "forecast" as const },
  { mes: "Octubre", churn: 13.1, low: 12.3, high: 13.9, tipo: "forecast" as const },
  { mes: "Noviembre", churn: 13.3, low: 12.5, high: 14.1, tipo: "forecast" as const },
  { mes: "Diciembre", churn: 13.5, low: 12.7, high: 14.3, tipo: "forecast" as const },
]

export function ChurnForecastChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Predicción de Churn</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Proyección basada en modelo ML con intervalo de confianza</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={CHURN_FORECAST}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            
            <XAxis 
              dataKey="mes"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            
            <YAxis 
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value, name) => {
                if (name === "Churn %") return `${(value as number).toFixed(1)}%`
                return value as string
              }}
            />
            
            <Legend />
            
            {/* Separador visual */}
            <ReferenceLine 
              x="Agosto" 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3"
              label={{ 
                value: "← Histórico | Predicción →", 
                position: "top",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11
              }}
            />
            
            {/* Área de confianza - band chart */}
            <Area
              type="monotone"
              dataKey="high"
              stroke="#9ca3af"
              strokeWidth={1}
              fill="#e5e7eb"
              fillOpacity={0.3}
              name="Límite superior"
            />
            <Area
              type="monotone"
              dataKey="low"
              stroke="none"
              fill="#ffffff"
              fillOpacity={1}
              name="Límite inferior"
            />
            
            {/* Línea de churn */}
            <Line
              type="monotone"
              dataKey="churn"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={(props: any) => {
                const isHistoric = props.payload.tipo === "historico"
                return (
                  <circle
                    key={`dot-${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={isHistoric ? "#ef4444" : "transparent"}
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                )
              }}
              strokeDasharray={(dataPoint: any) => 
                dataPoint.tipo === "forecast" ? "5 5" : "0"
              }
              name="Churn %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


