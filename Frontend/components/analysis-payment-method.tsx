"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const PAYMENT_DATA = [
  { metodo: "Tarjeta Crédito", clientes: 1800, churnRate: 10.5 },
  { metodo: "Transferencia", clientes: 1200, churnRate: 8.2 },
  { metodo: "Wallet", clientes: 900, churnRate: 15.3 },
  { metodo: "Suscripción", clientes: 331, churnRate: 6.1 },
]

export function PaymentMethodAnalysis() {
  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-foreground">Clientes y Churn por Método de Pago</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={PAYMENT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="metodo" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="clientes" fill="var(--color-chart-1)" name="Clientes" />
            <Bar yAxisId="right" dataKey="churnRate" fill="var(--color-chart-2)" name="Tasa Churn (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PAYMENT_DATA.map((item, idx) => (
          <div key={idx} className="bg-muted/50 p-4 rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">{item.metodo}</div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold text-foreground">{item.clientes}</div>
                <div className="text-xs text-muted-foreground">clientes</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-chart-2">{item.churnRate}%</div>
                <div className="text-xs text-muted-foreground">churn</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
