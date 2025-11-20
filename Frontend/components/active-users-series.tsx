"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock de % de usuarios activos (complementario al churn)
const ACTIVE_USERS = [
  { mes: "Enero", activosPct: 91.8 },
  { mes: "Febrero", activosPct: 90.9 },
  { mes: "Marzo", activosPct: 91.5 },
  { mes: "Abril", activosPct: 89.8 },
  { mes: "Mayo", activosPct: 88.2 },
  { mes: "Junio", activosPct: 89.1 },
  { mes: "Julio", activosPct: 88.5 },
  { mes: "Agosto", activosPct: 87.5 },
]

export function ActiveUsersSeries() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">% Usuarios Activos vs Tiempo</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Complemento natural de la evolución del churn</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={ACTIVE_USERS}>
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
              formatter={(value) => `${(value as number).toFixed(1)}%`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="activosPct"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={{ fill: "#14b8a6", r: 4 }}
              name="Usuarios Activos (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


