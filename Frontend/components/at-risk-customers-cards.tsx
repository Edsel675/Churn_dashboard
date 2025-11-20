"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCircle2, Circle, TrendingUp, AlertTriangle, User } from "lucide-react"
import { ClientProfileDialog } from "@/components/clients/client-profile-dialog"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  riskScore: number
  lastPurchase: string
  daysSinceContact: number
  tracked: boolean
  level: "Básico" | "Estándar" | "Premium" | "VIP"
  contractType: "Mensual" | "Trimestral" | "Anual"
}

const DUMMY_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Carlos García",
    email: "carlos.garcia@email.com",
    phone: "+34 612 345 678",
    riskScore: 95,
    lastPurchase: "2024-08-15",
    daysSinceContact: 45,
    tracked: false,
    level: "Básico",
    contractType: "Mensual",
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@email.com",
    phone: "+34 623 456 789",
    riskScore: 87,
    lastPurchase: "2024-07-20",
    daysSinceContact: 38,
    tracked: true,
    level: "Premium",
    contractType: "Anual",
  },
  {
    id: "3",
    name: "Juan Rodríguez",
    email: "juan.rodriguez@email.com",
    phone: "+34 634 567 890",
    riskScore: 92,
    lastPurchase: "2024-06-10",
    daysSinceContact: 62,
    tracked: false,
    level: "Estándar",
    contractType: "Trimestral",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+34 645 678 901",
    riskScore: 78,
    lastPurchase: "2024-08-05",
    daysSinceContact: 28,
    tracked: false,
    level: "VIP",
    contractType: "Anual",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    phone: "+34 656 789 012",
    riskScore: 85,
    lastPurchase: "2024-07-01",
    daysSinceContact: 52,
    tracked: true,
    level: "Estándar",
    contractType: "Mensual",
  },
  {
    id: "6",
    name: "Laura Fernández",
    email: "laura.fernandez@email.com",
    phone: "+34 667 890 123",
    riskScore: 91,
    lastPurchase: "2024-05-30",
    daysSinceContact: 75,
    tracked: false,
    level: "Premium",
    contractType: "Trimestral",
  },
  {
    id: "7",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "+34 678 901 234",
    riskScore: 88,
    lastPurchase: "2024-07-12",
    daysSinceContact: 41,
    tracked: false,
    level: "Básico",
    contractType: "Mensual",
  },
  {
    id: "8",
    name: "Carmen Ruiz",
    email: "carmen.ruiz@email.com",
    phone: "+34 689 012 345",
    riskScore: 83,
    lastPurchase: "2024-08-01",
    daysSinceContact: 33,
    tracked: true,
    level: "Estándar",
    contractType: "Trimestral",
  },
  {
    id: "9",
    name: "Fernando Morales",
    email: "fernando.morales@email.com",
    phone: "+34 690 123 456",
    riskScore: 89,
    lastPurchase: "2024-06-25",
    daysSinceContact: 58,
    tracked: false,
    level: "Premium",
    contractType: "Anual",
  },
  {
    id: "10",
    name: "Isabel Torres",
    email: "isabel.torres@email.com",
    phone: "+34 601 234 567",
    riskScore: 76,
    lastPurchase: "2024-08-10",
    daysSinceContact: 24,
    tracked: false,
    level: "VIP",
    contractType: "Anual",
  },
  {
    id: "11",
    name: "Miguel Hernández",
    email: "miguel.hernandez@email.com",
    phone: "+34 612 345 678",
    riskScore: 94,
    lastPurchase: "2024-05-15",
    daysSinceContact: 82,
    tracked: true,
    level: "Básico",
    contractType: "Mensual",
  },
  {
    id: "12",
    name: "Patricia Gómez",
    email: "patricia.gomez@email.com",
    phone: "+34 623 456 789",
    riskScore: 81,
    lastPurchase: "2024-07-28",
    daysSinceContact: 36,
    tracked: false,
    level: "Estándar",
    contractType: "Mensual",
  },
]

function getRiskColor(score: number) {
  if (score >= 80) return "bg-destructive/10 text-destructive border-destructive/20"
  if (score >= 40) return "bg-accent/10 text-accent border-accent/20"
  return "bg-chart-4/10 text-chart-4 border-chart-4/20"
}

function getRiskLabel(score: number) {
  if (score >= 80) return "Alto Riesgo"
  if (score >= 40) return "Riesgo Medio"
  return "Bajo Riesgo"
}

function getRiskFactors(customer: Customer): string[] {
  const factors: string[] = []
  if (customer.daysSinceContact > 30) factors.push("Inactividad prolongada")
  if (customer.riskScore >= 80) factors.push("Probabilidad alta de churn")
  if (customer.level === "Básico") factors.push("Nivel básico")
  if (customer.daysSinceContact > 60) factors.push("Sin contacto reciente")
  return factors.slice(0, 3) // Máximo 3 factores
}

function getRetentionActions(customer: Customer): string[] {
  const actions: string[] = []
  if (customer.daysSinceContact > 30) actions.push("Contacto urgente requerido")
  if (customer.level === "Básico") actions.push("Oferta de upgrade")
  if (customer.contractType === "Mensual") actions.push("Descuento por contrato anual")
  return actions.slice(0, 2) // Máximo 2 acciones
}

export function AtRiskCustomersCards() {
  const [customers, setCustomers] = useState<Customer[]>(DUMMY_CUSTOMERS)
  const [selectedClient, setSelectedClient] = useState<Customer | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleTracked = (id: string) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, tracked: !c.tracked } : c)))
  }

  const handleWhatsApp = (phone: string, name: string) => {
    const message = `Hola ${name}, queremos conocer cómo podemos ayudarte mejor.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCardClick = (customer: Customer) => {
    setSelectedClient(customer)
    setDialogOpen(true)
  }

  return (
    <>
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-xl">Clientes en Riesgo de Churn</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{customers.length} clientes requieren seguimiento</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((customer) => {
              const riskFactors = getRiskFactors(customer)
              const retentionActions = getRetentionActions(customer)
              
              return (
                <Card
                  key={customer.id}
                  className="bg-background border border-border hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleCardClick(customer)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{customer.name}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">{customer.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Probabilidad de churn */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Probabilidad de Churn</span>
                        <Badge className={`${getRiskColor(customer.riskScore)} border text-xs`}>
                          {customer.riskScore}%
                        </Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${customer.riskScore >= 80 ? 'bg-destructive' : customer.riskScore >= 40 ? 'bg-accent' : 'bg-chart-4'}`}
                          style={{ width: `${customer.riskScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{getRiskLabel(customer.riskScore)}</p>
                    </div>

                    {/* Factores de riesgo */}
                    {riskFactors.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 mb-1.5">
                          <AlertTriangle className="w-3 h-3 text-destructive" />
                          <span className="text-xs font-medium text-muted-foreground">Factores de Riesgo</span>
                        </div>
                        <div className="space-y-1">
                          {riskFactors.map((factor, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-destructive" />
                              {factor}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Acciones de retención */}
                    {retentionActions.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 mb-1.5">
                          <TrendingUp className="w-3 h-3 text-chart-4" />
                          <span className="text-xs font-medium text-muted-foreground">Acciones Sugeridas</span>
                        </div>
                        <div className="space-y-1">
                          {retentionActions.map((action, idx) => (
                            <div key={idx} className="text-xs text-chart-4 flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-chart-4" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Información adicional */}
                    <div className="pt-2 border-t space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Última compra:</span>
                        <span className="font-medium">{new Date(customer.lastPurchase).toLocaleDateString("es-ES", { month: "short", day: "numeric" })}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Sin contacto:</span>
                        <span className="font-medium">{customer.daysSinceContact} días</span>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-8 text-xs"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleWhatsApp(customer.phone, customer.name)
                        }}
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                        Contactar
                      </Button>
                      <Button
                        size="sm"
                        variant={customer.tracked ? "default" : "outline"}
                        className={`h-8 px-3 ${customer.tracked ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleTracked(customer.id)
                        }}
                      >
                        {customer.tracked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <ClientProfileDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={
          selectedClient
            ? {
                id: selectedClient.id,
                nombre: selectedClient.name,
                email: selectedClient.email,
                telefono: selectedClient.phone,
                riesgo: selectedClient.riskScore,
                nivel: selectedClient.level,
                ultimaCompra: new Date(selectedClient.lastPurchase).toLocaleDateString("es-ES"),
                diasSinContacto: selectedClient.daysSinceContact,
                tipoContrato: selectedClient.contractType,
              }
            : null
        }
      />
    </>
  )
}

