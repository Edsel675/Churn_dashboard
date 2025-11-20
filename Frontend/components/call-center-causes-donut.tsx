"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Top 6-7 causas de contacto relacionadas con churn (mock)
const CAUSES = [
  { causa: "Problemas de cobro", porcentaje: 28 },
  { causa: "Comisiones elevadas", porcentaje: 19 },
  { causa: "Fallas en app", porcentaje: 16 },
  { causa: "Soporte lento", porcentaje: 12 },
  { causa: "Cierre de cuenta", porcentaje: 11 },
  { causa: "Fraude sospechado", porcentaje: 9 },
  { causa: "Otros", porcentaje: 5 },
]

const COLORS = [
  "#14b8a6", // Teal
  "#ef4444", // Rojo
  "#3b82f6", // Azul
  "#f59e0b", // Naranja
  "#8b5cf6", // Púrpura
  "#10b981", // Verde
  "#6366f1", // Índigo
]

export function CallCenterCausesDonut() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Causas de Contacto a Call Center</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Distribución de motivos relacionados con churn</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={CAUSES}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="porcentaje"
              nameKey="causa"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {CAUSES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              formatter={(value) => `${value}%`}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


