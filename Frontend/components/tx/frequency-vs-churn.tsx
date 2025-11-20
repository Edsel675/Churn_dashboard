"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock coherente con 4,231 clientes totales
const FREQ_DATA = [
  { bucket: "0-2 tx/mes", usuarios: 1245, churn_pct: 28.5 },
  { bucket: "3-5 tx/mes", usuarios: 1678, churn_pct: 15.2 },
  { bucket: "6-10 tx/mes", usuarios: 987, churn_pct: 8.1 },
  { bucket: "10+ tx/mes", usuarios: 321, churn_pct: 3.2 },
]

export function FrequencyVsChurn() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Frecuencia de Uso vs Churn</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Usuarios por bucket y % de churn por frecuencia</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={FREQ_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="bucket" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              formatter={(value, name) => {
                if (name === "Usuarios") return (value as number).toLocaleString()
                if (name === "Churn (%)") return `${(value as number).toFixed(1)}%`
                return value as string
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar yAxisId="left" dataKey="usuarios" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Usuarios" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="churn_pct"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#ef4444" }}
              name="Churn (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


