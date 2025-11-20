export function DashboardHeader() {
  return (
    <div className="bg-primary border-b border-border">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground">Análisis de Churn</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">Danu Analítica - Panel de control para retención de clientes</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-foreground">Dashboard</div>
            <p className="text-sm text-primary-foreground/80">{new Date().toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
