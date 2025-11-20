"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip as RTooltip } from "recharts"
import { useMemo } from "react"

// Heatmap implementado con grid CSS para máxima claridad y control visual.
// Mantiene consistencia de estilos (Card, headers) y añade tooltip custom.
// Escala: blanco -> teal oscuro para actividad alta o inversa si fuera churn.

type HeatDatum = { nivel: string; mes: string; valor: number }

const NIVELES = ["Básico", "Estándar", "Premium", "VIP"]
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]

// Mock realista: valor como churn % por nivel/mes (más alto en Básico, más bajo en Premium/VIP)
const RAW_HEAT: HeatDatum[] = [
  { nivel: "Básico", mes: "Enero", valor: 14.2 },
  { nivel: "Básico", mes: "Febrero", valor: 15.0 },
  { nivel: "Básico", mes: "Marzo", valor: 14.5 },
  { nivel: "Básico", mes: "Abril", valor: 16.2 },
  { nivel: "Básico", mes: "Mayo", valor: 17.1 },
  { nivel: "Básico", mes: "Junio", valor: 16.0 },
  { nivel: "Básico", mes: "Julio", valor: 16.4 },
  { nivel: "Básico", mes: "Agosto", valor: 17.8 },

  { nivel: "Estándar", mes: "Enero", valor: 10.2 },
  { nivel: "Estándar", mes: "Febrero", valor: 10.9 },
  { nivel: "Estándar", mes: "Marzo", valor: 10.5 },
  { nivel: "Estándar", mes: "Abril", valor: 11.8 },
  { nivel: "Estándar", mes: "Mayo", valor: 12.6 },
  { nivel: "Estándar", mes: "Junio", valor: 11.9 },
  { nivel: "Estándar", mes: "Julio", valor: 12.1 },
  { nivel: "Estándar", mes: "Agosto", valor: 12.9 },

  { nivel: "Premium", mes: "Enero", valor: 6.2 },
  { nivel: "Premium", mes: "Febrero", valor: 6.9 },
  { nivel: "Premium", mes: "Marzo", valor: 6.5 },
  { nivel: "Premium", mes: "Abril", valor: 7.3 },
  { nivel: "Premium", mes: "Mayo", valor: 7.8 },
  { nivel: "Premium", mes: "Junio", valor: 7.1 },
  { nivel: "Premium", mes: "Julio", valor: 7.4 },
  { nivel: "Premium", mes: "Agosto", valor: 7.9 },

  { nivel: "VIP", mes: "Enero", valor: 3.9 },
  { nivel: "VIP", mes: "Febrero", valor: 4.1 },
  { nivel: "VIP", mes: "Marzo", valor: 3.7 },
  { nivel: "VIP", mes: "Abril", valor: 4.3 },
  { nivel: "VIP", mes: "Mayo", valor: 4.8 },
  { nivel: "VIP", mes: "Junio", valor: 4.2 },
  { nivel: "VIP", mes: "Julio", valor: 4.4 },
  { nivel: "VIP", mes: "Agosto", valor: 4.9 },
]

function interpolateTeal(value: number, min: number, max: number) {
  // Normaliza 0..1
  const t = min === max ? 0 : (value - min) / (max - min)
  // Interpolación simple entre blanco (t=0) y teal (t=1) usando HSL del tema
  // Usamos color final teal por defecto, con alpha progresivo
  const alpha = 0.15 + t * 0.85
  return `color-mix(in oklab, white, hsl(var(--color-chart-1)) ${Math.round(
    t * 100,
  )}%)`
}

export function UserLevelHeatmap() {
  const minMax = useMemo(() => {
    const vals = RAW_HEAT.map((d) => d.valor)
    return { min: Math.min(...vals), max: Math.max(...vals) }
  }, [])

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Mapa de Calor por Nivel de Usuario</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Churn % por nivel y mes</p>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Cabeceras de columnas (meses) */}
            <div className="grid" style={{ gridTemplateColumns: `120px repeat(${MESES.length}, minmax(60px, 1fr))` }}>
              <div />
              {MESES.map((m) => (
                <div key={m} className="text-xs text-muted-foreground p-2">{m}</div>
              ))}
              {NIVELES.map((nivel) => (
                <>
                  <div key={`${nivel}-label`} className="text-xs font-medium text-foreground p-2 sticky left-0 bg-card">
                    {nivel}
                  </div>
                  {MESES.map((mes) => {
                    const d = RAW_HEAT.find((x) => x.nivel === nivel && x.mes === mes)!
                    const bg = interpolateTeal(d.valor, minMax.min, minMax.max)
                    return (
                      <div
                        key={`${nivel}-${mes}`}
                        className="h-8 rounded-sm border border-border/40"
                        title={`${nivel} — ${mes}: ${d.valor.toFixed(1)}%`}
                        style={{ background: bg }}
                      />
                    )
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda de escala de colores */}
        <div className="mt-4">
          <div className="text-xs text-muted-foreground mb-1">Escala de color (más oscuro = mayor churn)</div>
          <div className="h-3 w-full rounded-sm"
               style={{
                 background:
                   "linear-gradient(90deg, white 0%, hsl(var(--color-chart-1)) 100%)",
               }}
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>{minMax.min.toFixed(1)}%</span>
            <span>{minMax.max.toFixed(1)}%</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Mayor intensidad = mayor tasa de churn</div>
        </div>
      </CardContent>
    </Card>
  )
}


