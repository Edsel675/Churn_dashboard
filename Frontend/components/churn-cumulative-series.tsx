"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock de churn acumulado y promedio móvil 3M
const CHURN_CUMULATIVE = [
  { mes: "Enero", churnAcumulado: 8.2, ma3: null },
  { mes: "Febrero", churnAcumulado: 9.1, ma3: null },
  { mes: "Marzo", churnAcumulado: 8.5, ma3: 8.6 },
  { mes: "Abril", churnAcumulado: 10.2, ma3: 9.3 },
  { mes: "Mayo", churnAcumulado: 11.8, ma3: 10.2 },
  { mes: "Junio", churnAcumulado: 10.9, ma3: 11.0 },
  { mes: "Julio", churnAcumulado: 11.5, ma3: 11.4 },
  { mes: "Agosto", churnAcumulado: 12.5, ma3: 11.6 },
]

export function ChurnCumulativeSeries() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">% Churn Acumulado vs Tiempo</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Incluye promedio móvil de 3 meses</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={CHURN_CUMULATIVE}>
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
              formatter={(value, name) => `${(value as number).toFixed(1)}%`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="churnAcumulado"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ fill: "#ef4444", r: 4 }}
              name="Churn Acumulado (%)"
            />
            <Line
              type="monotone"
              dataKey="ma3"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              name="Promedio Móvil 3M"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


