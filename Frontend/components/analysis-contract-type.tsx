"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const CONTRACT_DATA = [
  { name: "Mensual", value: 45, churnRate: 18 },
  { name: "Trimestral", value: 30, churnRate: 12 },
  { name: "Anual", value: 25, churnRate: 5 },
]

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)"]

export function ContractTypeAnalysis() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-6">
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-4 text-foreground">Distribución de Contratos</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={CONTRACT_DATA}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {CONTRACT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-semibold mb-4 text-foreground">Tasa de Churn por Tipo</h3>
        {CONTRACT_DATA.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-semibold text-foreground">{item.churnRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${idx === 0 ? "bg-chart-2" : idx === 1 ? "bg-chart-1" : "bg-chart-4"}`}
                style={{ width: `${item.churnRate * 5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
