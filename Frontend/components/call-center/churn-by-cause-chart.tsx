"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Datos: porcentaje de churn por cada causa de contacto
const CHURN_BY_CAUSE = [
  { causa: "Problemas de cobro", churnPct: 42.5 },
  { causa: "Comisiones elevadas", churnPct: 38.2 },
  { causa: "Fallas en app", churnPct: 31.8 },
  { causa: "Soporte lento", churnPct: 28.4 },
  { causa: "Cierre de cuenta", churnPct: 95.0 },
  { causa: "Fraude sospechado", churnPct: 22.1 },
  { causa: "Otros", churnPct: 15.3 },
]

export function ChurnByCauseChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Porcentaje de Churn por Causas de Contacto</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Tasa de churn asociada a cada motivo de contacto al call center
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={CHURN_BY_CAUSE}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: "12px" }}
            />
            <YAxis 
              type="category"
              dataKey="causa"
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: "12px" }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend />
            <Bar 
              dataKey="churnPct" 
              fill="var(--color-chart-2)"
              name="% de Churn"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

