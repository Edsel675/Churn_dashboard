"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { mes: "Enero", transacciones: 11234 },
  { mes: "Febrero", transacciones: 12156 },
  { mes: "Marzo", transacciones: 12789 },
  { mes: "Abril", transacciones: 13234 },
  { mes: "Mayo", transacciones: 12456 },
  { mes: "Junio", transacciones: 12989 },
  { mes: "Julio", transacciones: 13456 },
  { mes: "Agosto", transacciones: 13789 }
]

export function TransactionsMoMChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Transacciones por Mes</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Volumen mensual de transacciones
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="mes" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
              formatter={(value: number) => [
                value.toLocaleString(), 
                "Transacciones"
              ]}
            />
            <Bar 
              dataKey="transacciones" 
              fill="#14b8a6"
              radius={[4, 4, 0, 0]}
              name="Transacciones"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
