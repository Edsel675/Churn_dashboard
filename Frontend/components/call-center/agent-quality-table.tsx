"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AgentQuality = {
  agenteId: string
  nombre: string
  llamadas: number
  resueltasPct: number
  tmaSeg: number
  csat: number
  motivoRealMatchPct: number
  evitadoChurnPct: number
}

const AGENTS_MOCK: AgentQuality[] = [
  { agenteId: "A01", nombre: "María López", llamadas: 520, resueltasPct: 89, tmaSeg: 280, csat: 4.6, motivoRealMatchPct: 90, evitadoChurnPct: 42 },
  { agenteId: "A02", nombre: "Juan Pérez", llamadas: 480, resueltasPct: 86, tmaSeg: 300, csat: 4.4, motivoRealMatchPct: 87, evitadoChurnPct: 40 },
  { agenteId: "A03", nombre: "Ana Torres", llamadas: 410, resueltasPct: 82, tmaSeg: 320, csat: 4.2, motivoRealMatchPct: 85, evitadoChurnPct: 36 },
  { agenteId: "A04", nombre: "Luis García", llamadas: 600, resueltasPct: 91, tmaSeg: 265, csat: 4.7, motivoRealMatchPct: 93, evitadoChurnPct: 45 },
  { agenteId: "A05", nombre: "Sofía Díaz", llamadas: 390, resueltasPct: 78, tmaSeg: 350, csat: 4.0, motivoRealMatchPct: 80, evitadoChurnPct: 32 },
  { agenteId: "A06", nombre: "Carlos Ruiz", llamadas: 450, resueltasPct: 84, tmaSeg: 310, csat: 4.3, motivoRealMatchPct: 86, evitadoChurnPct: 37 },
  { agenteId: "A07", nombre: "Elena Ríos", llamadas: 365, resueltasPct: 76, tmaSeg: 370, csat: 3.9, motivoRealMatchPct: 79, evitadoChurnPct: 29 },
  { agenteId: "A08", nombre: "Diego Vega", llamadas: 505, resueltasPct: 88, tmaSeg: 295, csat: 4.5, motivoRealMatchPct: 91, evitadoChurnPct: 41 },
  { agenteId: "A09", nombre: "Paula Méndez", llamadas: 430, resueltasPct: 83, tmaSeg: 330, csat: 4.1, motivoRealMatchPct: 84, evitadoChurnPct: 34 },
  { agenteId: "A10", nombre: "Roberto Sánchez", llamadas: 475, resueltasPct: 87, tmaSeg: 290, csat: 4.5, motivoRealMatchPct: 89, evitadoChurnPct: 39 },
  { agenteId: "A11", nombre: "Carmen Flores", llamadas: 420, resueltasPct: 81, tmaSeg: 340, csat: 4.1, motivoRealMatchPct: 83, evitadoChurnPct: 35 },
  { agenteId: "A12", nombre: "Fernando Morales", llamadas: 555, resueltasPct: 90, tmaSeg: 270, csat: 4.6, motivoRealMatchPct: 92, evitadoChurnPct: 43 },
  { agenteId: "A13", nombre: "Isabel Ramírez", llamadas: 380, resueltasPct: 77, tmaSeg: 360, csat: 3.8, motivoRealMatchPct: 78, evitadoChurnPct: 31 },
  { agenteId: "A14", nombre: "Miguel Herrera", llamadas: 490, resueltasPct: 85, tmaSeg: 305, csat: 4.4, motivoRealMatchPct: 88, evitadoChurnPct: 38 },
  { agenteId: "A15", nombre: "Patricia Jiménez", llamadas: 445, resueltasPct: 82, tmaSeg: 325, csat: 4.2, motivoRealMatchPct: 85, evitadoChurnPct: 36 },
]

type SortKey = "llamadas" | "resueltasPct" | "csat"

export function AgentQualityTable() {
  const [sortKey, setSortKey] = useState<SortKey>("llamadas")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const rows = useMemo(() => {
    const sorted = [...AGENTS_MOCK].sort((a, b) => {
      const va = a[sortKey]
      const vb = b[sortKey]
      return sortDir === "asc" ? Number(va) - Number(vb) : Number(vb) - Number(va)
    })
    return sorted
  }, [sortKey, sortDir])

  function onSort(newKey: SortKey) {
    if (sortKey === newKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(newKey)
      setSortDir("desc")
    }
  }

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Calidad de Llamadas por Agente</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Rendimiento individual; ordena por llamadas, % resueltas o CSAT</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Agente</TableHead>
                <TableHead className="whitespace-nowrap cursor-pointer" onClick={() => onSort("llamadas")}>
                  Llamadas {sortKey === "llamadas" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="whitespace-nowrap cursor-pointer" onClick={() => onSort("resueltasPct")}>
                  % Resueltas {sortKey === "resueltasPct" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="whitespace-nowrap">TMA (seg)</TableHead>
                <TableHead className="whitespace-nowrap cursor-pointer" onClick={() => onSort("csat")}>
                  CSAT {sortKey === "csat" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="whitespace-nowrap">% Motivo Real Matched</TableHead>
                <TableHead className="whitespace-nowrap">% Evitado Churn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.agenteId}>
                  <TableCell className="font-medium">{r.nombre}</TableCell>
                  <TableCell>{r.llamadas.toLocaleString()}</TableCell>
                  <TableCell className="text-chart-1">{r.resueltasPct}%</TableCell>
                  <TableCell>{r.tmaSeg}</TableCell>
                  <TableCell className="text-chart-4">{r.csat.toFixed(1)}</TableCell>
                  <TableCell>{r.motivoRealMatchPct}%</TableCell>
                  <TableCell className="text-chart-2">{r.evitadoChurnPct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


