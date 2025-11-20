"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const DATA = [
  { agente: "M. López", resueltasPct: 89, evitadoChurnPct: 42 },
  { agente: "J. Pérez", resueltasPct: 86, evitadoChurnPct: 40 },
  { agente: "A. Torres", resueltasPct: 82, evitadoChurnPct: 36 },
  { agente: "L. García", resueltasPct: 91, evitadoChurnPct: 45 },
  { agente: "S. Díaz", resueltasPct: 78, evitadoChurnPct: 32 },
  { agente: "C. Ruiz", resueltasPct: 84, evitadoChurnPct: 37 },
  { agente: "E. Ríos", resueltasPct: 76, evitadoChurnPct: 29 },
  { agente: "D. Vega", resueltasPct: 88, evitadoChurnPct: 41 },
  { agente: "P. Méndez", resueltasPct: 83, evitadoChurnPct: 34 },
]

export function AgentQualityChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Resolución y Churn Evitado por Agente</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">% resueltas vs % casos donde se evitó churn</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="agente" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              formatter={(value) => `${value}%`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="resueltasPct" name="% Resueltas" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="evitadoChurnPct" name="% Evitado Churn" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


