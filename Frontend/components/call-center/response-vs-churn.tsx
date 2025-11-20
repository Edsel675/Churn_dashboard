"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Point = { respMin: number; churnPct: number; segmento: string }

const RAW_POINTS: Point[] = [
  { respMin: 5, churnPct: 9.5, segmento: "Premium" },
  { respMin: 8, churnPct: 10.2, segmento: "Premium" },
  { respMin: 12, churnPct: 11.0, segmento: "Estándar" },
  { respMin: 15, churnPct: 11.8, segmento: "Estándar" },
  { respMin: 18, churnPct: 12.4, segmento: "Estándar" },
  { respMin: 22, churnPct: 12.9, segmento: "Básico" },
  { respMin: 25, churnPct: 13.2, segmento: "Básico" },
  { respMin: 30, churnPct: 13.9, segmento: "Básico" },
  { respMin: 35, churnPct: 14.3, segmento: "Básico" },
  { respMin: 40, churnPct: 14.7, segmento: "Básico" },
]

// Cálculo de regresión lineal simple (y = a + b x)
function linearRegression(points: { x: number; y: number }[]) {
  const n = points.length
  const sumX = points.reduce((a, p) => a + p.x, 0)
  const sumY = points.reduce((a, p) => a + p.y, 0)
  const sumXY = points.reduce((a, p) => a + p.x * p.y, 0)
  const sumXX = points.reduce((a, p) => a + p.x * p.x, 0)
  const b = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const a = sumY / n - (b * sumX) / n
  return { a, b }
}

export function ResponseVsChurn() {
  const regression = useMemo(() => {
    const pts = RAW_POINTS.map((p) => ({ x: p.respMin, y: p.churnPct }))
    const { a, b } = linearRegression(pts)
    const xs = pts.map((p) => p.x).sort((m, n) => m - n)
    // Serie de línea de tendencia
    const trend = xs.map((x) => ({ x, y: a + b * x }))
    return trend
  }, [])

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Tiempo de Respuesta vs Tasa de Churn</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Correlación entre velocidad de atención y retención</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="respMin"
              type="number"
              name="Tiempo de Respuesta (min)"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <YAxis
              dataKey="churnPct"
              type="number"
              name="Churn (%)"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 1", "dataMax + 1"]}
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
                if (name === "Churn (%)") return `${(value as number).toFixed(1)}%`
                if (name === "Tiempo de Respuesta (min)") return `${value} min`
                return value as string
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            {/* Puntos de datos */}
            <Scatter name="Muestras" data={RAW_POINTS} fill="#14b8a6" />
            {/* Línea de tendencia */}
            <Line
              data={regression}
              type="monotone"
              dataKey="y"
              stroke="#ef4444"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={false}
              name="Tendencia"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


