"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, RotateCcw, Filter, Check } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useFilters } from "@/contexts/filter-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function DashboardFilters() {
  const { filters, updateFilters, resetFilters } = useFilters()

  const hasActiveFilters =
    filters.segment !== "all" ||
    filters.contractType !== "all" ||
    filters.riskLevel !== "all"

  const activeFiltersCount = [
    filters.segment !== "all",
    filters.contractType !== "all",
    filters.riskLevel !== "all",
  ].filter(Boolean).length

  return (
    <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-none">Filtros de Análisis</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} filtro${activeFiltersCount > 1 ? "s" : ""} activo${activeFiltersCount > 1 ? "s" : ""}`
                  : "Personaliza tu vista"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="h-9 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Restablecer
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 border-2 bg-background hover:bg-accent",
                  !filters.dateRange && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-muted-foreground leading-none mb-0.5">
                    Período
                  </span>
                  {filters.dateRange?.from ? (
                    <span className="text-xs font-medium leading-none">
                      {format(filters.dateRange.from, "dd MMM", { locale: es })} - {format(filters.dateRange.to, "dd MMM yy", { locale: es })}
                    </span>
                  ) : (
                    <span className="text-xs leading-none">Seleccionar rango</span>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange?.from}
                selected={{
                  from: filters.dateRange?.from,
                  to: filters.dateRange?.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    updateFilters({ dateRange: { from: range.from, to: range.to } })
                  }
                }}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-background px-1 text-[10px] text-muted-foreground font-medium z-10">
              Nivel de Cliente
            </label>
            <Select value={filters.segment} onValueChange={(value: any) => updateFilters({ segment: value })}>
              <SelectTrigger
                className={cn(
                  "w-full h-11 border-2 bg-background",
                  filters.segment !== "all" && "border-primary bg-primary/5",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center justify-between w-full">
                    <span>Todos los niveles</span>
                    {filters.segment === "all" && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </SelectItem>
                <SelectItem value="basico">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                    <span>Básico</span>
                  </div>
                </SelectItem>
                <SelectItem value="estandar">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                    <span>Estándar</span>
                  </div>
                </SelectItem>
                <SelectItem value="premium">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                    <span>Premium</span>
                  </div>
                </SelectItem>
                <SelectItem value="vip">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span>VIP</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-background px-1 text-[10px] text-muted-foreground font-medium z-10">
              Tipo de Contrato
            </label>
            <Select value={filters.contractType} onValueChange={(value: any) => updateFilters({ contractType: value })}>
              <SelectTrigger
                className={cn(
                  "w-full h-11 border-2 bg-background",
                  filters.contractType !== "all" && "border-primary bg-primary/5",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center justify-between w-full">
                    <span>Todos los contratos</span>
                    {filters.contractType === "all" && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </SelectItem>
                <SelectItem value="mensual">Mensual</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-background px-1 text-[10px] text-muted-foreground font-medium z-10">
              Nivel de Riesgo
            </label>
            <Select value={filters.riskLevel} onValueChange={(value: any) => updateFilters({ riskLevel: value })}>
              <SelectTrigger
                className={cn(
                  "w-full h-11 border-2 bg-background",
                  filters.riskLevel !== "all" && "border-primary bg-primary/5",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center justify-between w-full">
                    <span>Todos los niveles</span>
                    {filters.riskLevel === "all" && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Alto (&gt;80%)</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span>Medio (50-80%)</span>
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span>Bajo (&lt;50%)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
            <span className="text-xs text-muted-foreground font-medium">Filtros aplicados:</span>
            {filters.segment !== "all" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1.5 py-1 text-xs cursor-pointer hover:bg-secondary/80"
                onClick={() => updateFilters({ segment: "all" })}
              >
                Nivel: {filters.segment.charAt(0).toUpperCase() + filters.segment.slice(1)}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1.5 hover:bg-transparent">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.contractType !== "all" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1.5 py-1 text-xs cursor-pointer hover:bg-secondary/80"
                onClick={() => updateFilters({ contractType: "all" })}
              >
                Contrato: {filters.contractType.charAt(0).toUpperCase() + filters.contractType.slice(1)}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1.5 hover:bg-transparent">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.riskLevel !== "all" && (
              <Badge
                variant="secondary"
                className="pl-2.5 pr-1.5 py-1 text-xs cursor-pointer hover:bg-secondary/80"
                onClick={() => updateFilters({ riskLevel: "all" })}
              >
                Riesgo: {filters.riskLevel === "high" ? "Alto" : filters.riskLevel === "medium" ? "Medio" : "Bajo"}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1.5 hover:bg-transparent">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


