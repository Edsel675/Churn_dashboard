"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { scaleLinear } from "d3-scale"

const mockData = [
  { id: "MX-NLE", name: "Nuevo León", clientes: 892, churn: 10.2, ingresos: 234500, perdidas: 15600 },
  { id: "MX-CMX", name: "Ciudad de México", clientes: 1245, churn: 13.8, ingresos: 456700, perdidas: 34200 },
  { id: "MX-JAL", name: "Jalisco", clientes: 678, churn: 11.5, ingresos: 198900, perdidas: 12800 },
  { id: "MX-MEX", name: "Estado de México", clientes: 534, churn: 14.2, ingresos: 145600, perdidas: 18900 },
  { id: "MX-GUA", name: "Guanajuato", clientes: 423, churn: 9.8, ingresos: 123400, perdidas: 9100 },
]

export function GeoChurnMap() {
  const [tooltipContent, setTooltipContent] = useState<any>(null)

  const colorScale = scaleLinear<string>()
    .domain([0, 5, 10, 15, 20])
    .range(["#ffffff", "#99f6e4", "#14b8a6", "#0d9488", "#ef4444"])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución Geográfica de Churn</CardTitle>
        <p className="text-sm text-muted-foreground">Tasa de churn por estado</p>
      </CardHeader>
      <CardContent>
        <div className="relative bg-muted/30 rounded-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockData.map((state, i) => (
              <div
                key={i}
                className="bg-background border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: colorScale(state.churn),
                }}
                onMouseEnter={() => setTooltipContent(state)}
                onMouseLeave={() => setTooltipContent(null)}
              >
                <h4 className="font-semibold text-sm mb-2">{state.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clientes:</span>
                    <span className="font-medium">{state.clientes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Churn:</span>
                    <span className="font-bold" style={{ color: colorScale(state.churn) }}>
                      {state.churn}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ingresos:</span>
                    <span className="font-medium text-green-600">${(state.ingresos / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pérdidas:</span>
                    <span className="font-medium text-red-600">${(state.perdidas / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 pt-4 border-t">
            <span className="text-xs text-muted-foreground font-medium">Escala de Churn:</span>
            <div className="flex items-center gap-1">
              {[
                { label: "0-5%", color: "#ffffff", border: true },
                { label: "5-10%", color: "#99f6e4" },
                { label: "10-15%", color: "#14b8a6" },
                { label: "15%+", color: "#ef4444" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-12 h-6 rounded"
                    style={{
                      backgroundColor: item.color,
                      border: item.border ? "1px solid #e5e5e5" : "none",
                    }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4 italic">
            Vista de tarjetas por estado (fallback visual)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


