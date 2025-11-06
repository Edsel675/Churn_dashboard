"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const ECONOMIC_DATA = [
  { mes: "Enero", ingresoRetention: 45000, ingresoChurn: 5000 },
  { mes: "Febrero", ingresoRetention: 48000, ingresoChurn: 6200 },
  { mes: "Marzo", ingresoRetention: 47000, ingresoChurn: 5800 },
  { mes: "Abril", ingresoRetention: 44000, ingresoChurn: 8500 },
  { mes: "Mayo", ingresoRetention: 41000, ingresoChurn: 10200 },
  { mes: "Junio", ingresoRetention: 43000, ingresoChurn: 9100 },
  { mes: "Julio", ingresoRetention: 42000, ingresoChurn: 9800 },
  { mes: "Agosto", ingresoRetention: 40000, ingresoChurn: 11500 },
]

export function EconomicImpactChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Impacto Económico</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Ingresos por retención vs pérdidas por churn</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ECONOMIC_DATA}>
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
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar
              dataKey="ingresoRetention"
              fill="var(--color-chart-4)"
              radius={[4, 4, 0, 0]}
              name="Ingresos Retención"
            />
            <Bar dataKey="ingresoChurn" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} name="Pérdidas por Churn" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
