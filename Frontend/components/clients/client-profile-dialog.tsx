"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Activity,
} from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface ClientProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: {
    id: string
    nombre: string
    email: string
    telefono: string
    riesgo: number
    nivel: string
    ultimaCompra: string
    diasSinContacto: number
    tipoContrato: string
  } | null
}

export function ClientProfileDialog({ open, onOpenChange, client }: ClientProfileDialogProps) {
  if (!client) return null

  const activityData = [
    { mes: "Feb", score: 15 },
    { mes: "Mar", score: 28 },
    { mes: "Abr", score: 45 },
    { mes: "May", score: 67 },
    { mes: "Jun", score: 82 },
    { mes: "Jul", score: 95 },
  ]

  const riskData = [{ value: client.riesgo }]

  const getRiskBadgeVariant = () => {
    if (client.riesgo >= 80) return "destructive" as const
    if (client.riesgo >= 40) return "default" as const
    return "secondary" as const
  }

  const getRiskLabel = () => {
    if (client.riesgo >= 80) return "Alto Riesgo"
    if (client.riesgo >= 40) return "Riesgo Medio"
    return "Bajo Riesgo"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">{client.nombre}</DialogTitle>
              <DialogDescription className="mt-1">
                Cliente {client.nivel} • ID: {client.id}
              </DialogDescription>
            </div>
            <Badge variant={getRiskBadgeVariant()} className="text-sm">
              Riesgo: {client.riesgo}%
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">INFORMACIÓN DE CONTACTO</h3>

              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{client.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.telefono}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>
                  Nivel: <Badge variant="outline">{client.nivel}</Badge>
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Contrato: {client.tipoContrato}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">ACTIVIDAD RECIENTE</h3>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Última compra: {client.ultimaCompra}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <AlertTriangle
                  className={`h-4 w-4 ${client.diasSinContacto > 30 ? "text-red-500" : "text-muted-foreground"}`}
                />
                <span>Sin contacto: {client.diasSinContacto} días</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Gasto promedio: $234.50/mes</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span>Transacciones: 8/mes</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">SCORE DE CHURN</h3>
              <ResponsiveContainer width="100%" height={140}>
                <RadialBarChart
                  cx="50%"
                  cy="70%"
                  innerRadius="60%"
                  outerRadius="90%"
                  barSize={14}
                  data={riskData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill={client.riesgo >= 80 ? "hsl(var(--color-chart-2))" : "hsl(var(--color-chart-1))"}
                    background={{ fill: "hsl(var(--muted))" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center -mt-4">
                <div className="text-4xl font-bold">{client.riesgo}%</div>
                <p className="text-xs text-muted-foreground mt-1">{getRiskLabel()}</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">EVOLUCIÓN DE RIESGO</h3>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--color-chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">FACTORES PRINCIPALES</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Inactividad (30+ días)</span>
                  <span className="font-medium text-red-600">-35%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Baja frecuencia de uso</span>
                  <span className="font-medium text-orange-600">-28%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ticket decreciente</span>
                  <span className="font-medium text-orange-600">-22%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="flex flex-wrap gap-3">
          <Button className="flex-1" variant="default">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contactar Cliente
          </Button>
          <Button className="flex-1" variant="outline">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Marcar como Atendido
          </Button>
          <Button variant="outline">Ver Historial Completo</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

