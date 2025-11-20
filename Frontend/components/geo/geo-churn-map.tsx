"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { scaleLinear } from "d3-scale"
import { TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = [
  { id: "MX-NLE", name: "Nuevo León", clientes: 892, churn: 10.2, ingresos: 234500, perdidas: 15600 },
  { id: "MX-CMX", name: "Ciudad de México", clientes: 1245, churn: 13.8, ingresos: 456700, perdidas: 34200 },
  { id: "MX-JAL", name: "Jalisco", clientes: 678, churn: 11.5, ingresos: 198900, perdidas: 12800 },
  { id: "MX-MEX", name: "Estado de México", clientes: 534, churn: 14.2, ingresos: 145600, perdidas: 18900 },
  { id: "MX-GUA", name: "Guanajuato", clientes: 423, churn: 9.8, ingresos: 123400, perdidas: 9100 },
  { id: "MX-PUE", name: "Puebla", clientes: 567, churn: 12.3, ingresos: 167800, perdidas: 15200 },
  { id: "MX-QUE", name: "Querétaro", clientes: 389, churn: 8.5, ingresos: 112300, perdidas: 7200 },
  { id: "MX-YUC", name: "Yucatán", clientes: 312, churn: 11.9, ingresos: 98700, perdidas: 8900 },
  { id: "MX-SON", name: "Sonora", clientes: 445, churn: 10.7, ingresos: 134500, perdidas: 10200 },
  { id: "MX-CHH", name: "Chihuahua", clientes: 398, churn: 9.4, ingresos: 118900, perdidas: 8100 },
  { id: "MX-BCN", name: "Baja California", clientes: 521, churn: 13.1, ingresos: 189600, perdidas: 18700 },
  { id: "MX-TAM", name: "Tamaulipas", clientes: 467, churn: 11.2, ingresos: 142300, perdidas: 11200 },
]

// Media nacional de churn (mock)
const NATIONAL_AVERAGE = 11.5

// Datos de tendencia temporal por estado (mock)
const getTrendData = (stateName: string) => [
  { mes: "Enero", churn: 8.5 },
  { mes: "Febrero", churn: 9.2 },
  { mes: "Marzo", churn: 8.8 },
  { mes: "Abril", churn: 10.1 },
  { mes: "Mayo", churn: 11.3 },
  { mes: "Junio", churn: 10.7 },
  { mes: "Julio", churn: 11.2 },
  { mes: "Agosto", churn: 12.1 },
]

export function GeoChurnMap() {
  const [tooltipContent, setTooltipContent] = useState<any>(null)
  const [selectedState, setSelectedState] = useState<typeof mockData[0] | null>(null)

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
                onClick={() => setSelectedState(state)}
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

      {/* Panel de detalles lateral */}
      <Sheet open={selectedState !== null} onOpenChange={(open) => !open && setSelectedState(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedState && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl">{selectedState.name}</SheetTitle>
                <SheetDescription>
                  Análisis detallado de métricas de churn
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Métricas principales */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-muted-foreground">Tasa de Churn</span>
                      </div>
                      <div className="text-2xl font-bold">{selectedState.churn}%</div>
                      <div className="flex items-center gap-1 mt-1">
                        {selectedState.churn > NATIONAL_AVERAGE ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-destructive" />
                            <span className="text-xs text-destructive">
                              +{(selectedState.churn - NATIONAL_AVERAGE).toFixed(1)}% vs media nacional
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-chart-4" />
                            <span className="text-xs text-chart-4">
                              {(NATIONAL_AVERAGE - selectedState.churn).toFixed(1)}% vs media nacional
                            </span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Clientes</span>
                      </div>
                      <div className="text-2xl font-bold">{selectedState.clientes.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-chart-4" />
                        <span className="text-xs text-muted-foreground">Ingresos Mensuales</span>
                      </div>
                      <div className="text-2xl font-bold">${(selectedState.ingresos / 1000).toFixed(0)}k</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-muted-foreground">Pérdidas Mensuales</span>
                      </div>
                      <div className="text-2xl font-bold text-destructive">${(selectedState.perdidas / 1000).toFixed(0)}k</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparativa con media nacional */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Comparativa con Media Nacional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Media Nacional</span>
                        <span className="font-semibold">{NATIONAL_AVERAGE}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{selectedState.name}</span>
                        <span className={`font-semibold ${selectedState.churn > NATIONAL_AVERAGE ? 'text-destructive' : 'text-chart-4'}`}>
                          {selectedState.churn}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${selectedState.churn > NATIONAL_AVERAGE ? 'bg-destructive' : 'bg-chart-4'}`}
                          style={{ width: `${(selectedState.churn / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tendencia temporal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Tendencia Temporal de Churn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={getTrendData(selectedState.name)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" style={{ fontSize: "10px" }} />
                        <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "10px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--color-card)",
                            border: `1px solid var(--color-border)`,
                            borderRadius: "6px",
                          }}
                          formatter={(value: number) => `${value.toFixed(1)}%`}
                        />
                        <Line
                          type="monotone"
                          dataKey="churn"
                          stroke="var(--color-chart-2)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-chart-2)", r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  )
}


