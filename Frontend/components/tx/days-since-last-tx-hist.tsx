"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock coherente con 4,231 clientes totales
const INACTIVITY_DATA = [
  { bucket: "0-7 días", usuarios: 2345, churn_pct: 2.1 },
  { bucket: "8-14 días", usuarios: 987, churn_pct: 5.4 },
  { bucket: "15-30 días", usuarios: 654, churn_pct: 12.8 },
  { bucket: "30+ días", usuarios: 245, churn_pct: 45.7 },
]

export function DaysSinceLastTxHist() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Días desde Última Transacción</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Usuarios por bucket con overlay de % churn</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={INACTIVITY_DATA}>
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


