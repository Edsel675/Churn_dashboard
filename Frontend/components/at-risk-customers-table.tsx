"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCircle2, Circle } from "lucide-react"
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
  if (score >= 80) return "bg-destructive/10 text-destructive"
  if (score >= 40) return "bg-accent/10 text-accent"
  return "bg-chart-4/10 text-chart-4"
}

export function AtRiskCustomersTable() {
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

  const handleRowClick = (customer: Customer) => {
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Riesgo</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Última Compra</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Sin Contacto</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(customer)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">{customer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(customer.riskScore)}`}>
                        {customer.riskScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(customer.lastPurchase).toLocaleDateString("es-ES")}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{customer.daysSinceContact} días</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2 bg-transparent"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleWhatsApp(customer.phone, customer.name)
                          }}
                          title="Enviar WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={customer.tracked ? "default" : "outline"}
                          className={`h-8 px-2 ${customer.tracked ? "bg-primary text-primary-foreground" : ""}`}
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleTracked(customer.id)
                          }}
                          title={customer.tracked ? "Desmarcar seguimiento" : "Marcar en seguimiento"}
                        >
                          {customer.tracked ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
