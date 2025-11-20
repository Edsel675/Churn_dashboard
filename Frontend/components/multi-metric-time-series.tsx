"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock realista para métricas múltiples por mes
// - MRR en USD (~40k-55k)
// - Ticket Promedio en USD (~22-27)
// - NPS (35-55)
const MULTI_SERIES_DATA = [
  { mes: "Enero", mrr: 45000, avgTicket: 22.8, nps: 42 },
  { mes: "Febrero", mrr: 47000, avgTicket: 23.4, nps: 44 },
  { mes: "Marzo", mrr: 46000, avgTicket: 23.1, nps: 45 },
  { mes: "Abril", mrr: 44000, avgTicket: 22.6, nps: 41 },
  { mes: "Mayo", mrr: 43000, avgTicket: 22.3, nps: 39 },
  { mes: "Junio", mrr: 44500, avgTicket: 22.9, nps: 40 },
  { mes: "Julio", mrr: 45500, avgTicket: 23.2, nps: 43 },
  { mes: "Agosto", mrr: 47000, avgTicket: 23.7, nps: 46 },
]

export function MultiMetricTimeSeries() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Métricas Clave vs Tiempo</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Evolución mensual de MRR, Ticket Promedio y NPS</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={MULTI_SERIES_DATA}>
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
              formatter={(value, name) => {
                if (name === "MRR (USD)") return `$${(value as number).toLocaleString()}`
                if (name === "Ticket Promedio (USD)") return `$${(value as number).toFixed(2)}`
                if (name === "NPS") return `${value}`
                return value as string
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="mrr"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", r: 4 }}
              name="MRR (USD)"
            />
            <Line
              type="monotone"
              dataKey="avgTicket"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={{ fill: "#14b8a6", r: 4 }}
              name="Ticket Promedio (USD)"
            />
            <Line
              type="monotone"
              dataKey="nps"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ fill: "#ef4444", r: 4 }}
              name="NPS"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


