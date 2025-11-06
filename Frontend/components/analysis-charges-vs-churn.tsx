"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CHARGES_DATA = [
  { montoPromedio: 9.99, churnRate: 8.5, clientes: 450 },
  { montoPromedio: 19.99, churnRate: 10.2, clientes: 680 },
  { montoPromedio: 29.99, churnRate: 11.8, clientes: 520 },
  { montoPromedio: 49.99, churnRate: 7.3, clientes: 890 },
  { montoPromedio: 79.99, churnRate: 5.1, clientes: 320 },
  { montoPromedio: 99.99, churnRate: 3.2, clientes: 260 },
  { montoPromedio: 149.99, churnRate: 2.8, clientes: 111 },
]

export function ChargesVsChurnAnalysis() {
  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-foreground">Análisis: Monto de Cargo vs Tasa de Churn</h3>
        <p className="text-xs text-muted-foreground mb-4">
          A mayor monto de cargo, menor tasa de churn. Clientes más comprometidos tienden a planes premium.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="montoPromedio"
              name="Monto Promedio ($)"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              dataKey="churnRate"
              name="Tasa Churn (%)"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
              formatter={(value, name) => {
                if (name === "Monto Promedio ($)") return `$${value.toFixed(2)}`
                if (name === "Tasa Churn (%)") return `${value.toFixed(1)}%`
                return value
              }}
            />
            <Scatter name="Segmentos" data={CHARGES_DATA} fill="var(--color-chart-1)" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
        <div>
          <h4 className="text-xs font-semibold text-foreground mb-2">Insight Clave</h4>
          <p className="text-xs text-muted-foreground">
            Planes con monto mayor a $50 tienen tasa de churn significativamente más baja (2-7% vs 8-12%).
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-foreground mb-2">Recomendación</h4>
          <p className="text-xs text-muted-foreground">
            Enfocarse en convertir clientes de planes básicos a premium mediante upsell o mejora de valor.
          </p>
        </div>
      </div>
    </div>
  )
}
