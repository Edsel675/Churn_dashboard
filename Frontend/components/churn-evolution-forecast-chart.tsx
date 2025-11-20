"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

// Datos combinados: histórico real + proyección ML
const CHURN_COMBINED = [
  // Histórico (línea sólida)
  { mes: "Enero", historico: 8.2, forecast: null },
  { mes: "Febrero", historico: 9.1, forecast: null },
  { mes: "Marzo", historico: 8.5, forecast: null },
  { mes: "Abril", historico: 10.2, forecast: null },
  { mes: "Mayo", historico: 11.8, forecast: null },
  { mes: "Junio", historico: 10.9, forecast: null },
  { mes: "Julio", historico: 11.5, forecast: null },
  { mes: "Agosto", historico: 12.5, forecast: null },
  // Forecast (línea punteada)
  { mes: "Septiembre", historico: null, forecast: 12.8 },
  { mes: "Octubre", historico: null, forecast: 13.1 },
  { mes: "Noviembre", historico: null, forecast: 13.3 },
  { mes: "Diciembre", historico: null, forecast: 13.5 },
]

export function ChurnEvolutionForecastChart() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Evolución y Predicción de Churn</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Histórico real vs proyección del modelo ML
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={CHURN_COMBINED}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="mes" 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: "12px" }} 
            />
            <YAxis 
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
              formatter={(value: any) => value !== null ? `${value.toFixed(1)}%` : "-"}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            
            {/* Separador visual entre histórico y predicción */}
            <ReferenceLine 
              x="Agosto" 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3"
              label={{ 
                value: "← Histórico | Predicción →", 
                position: "top",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11
              }}
            />
            
            {/* Línea histórica (sólida) */}
            <Line
              type="monotone"
              dataKey="historico"
              stroke="var(--color-chart-2)"
              strokeWidth={2.5}
              dot={{ fill: "var(--color-chart-2)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Histórico Real"
              connectNulls={false}
            />
            
            {/* Línea de predicción (punteada) */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-chart-1)"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ fill: "var(--color-chart-1)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Predicción ML"
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

