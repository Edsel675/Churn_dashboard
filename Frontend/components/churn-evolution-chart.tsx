"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const CHURN_DATA = [
  { mes: "Enero", churn: 8.2, retencion: 91.8 },
  { mes: "Febrero", churn: 9.1, retencion: 90.9 },
  { mes: "Marzo", churn: 8.5, retencion: 91.5 },
  { mes: "Abril", churn: 10.2, retencion: 89.8 },
  { mes: "Mayo", churn: 11.8, retencion: 88.2 },
  { mes: "Junio", churn: 10.9, retencion: 89.1 },
  { mes: "Julio", churn: 11.5, retencion: 88.5 },
  { mes: "Agosto", churn: 12.5, retencion: 87.5 },
]

export function ChurnEvolutionChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Evolución del Churn</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Tendencia de los últimos 8 meses</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={CHURN_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="churn"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={{ fill: "var(--color-chart-2)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Tasa de Churn (%)"
            />
            <Line
              type="monotone"
              dataKey="retencion"
              stroke="var(--color-chart-4)"
              strokeWidth={2}
              dot={{ fill: "var(--color-chart-4)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Tasa de Retención (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
