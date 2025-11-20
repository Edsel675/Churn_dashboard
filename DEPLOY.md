# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a hostear tu Dashboard de Churn en Vercel.

## 📋 Requisitos Previos

1. **Cuenta de Vercel**: Crea una cuenta gratuita en [vercel.com](https://vercel.com)
2. **Repositorio en GitHub**: Tu código debe estar en GitHub (ya lo tienes: `Edsel675/Churn_dashboard`)

---

## 🔧 Opción 1: Despliegue desde la Web de Vercel (Recomendado)

### Paso 1: Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New..."** → **"Project"**
3. Conecta tu cuenta de GitHub si aún no lo has hecho
4. Busca y selecciona el repositorio **`Churn_dashboard`**

### Paso 2: Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Next.js. Configura lo siguiente:

**Configuración del Proyecto:**
- **Framework Preset**: `Next.js` (debería detectarse automáticamente)
- **Root Directory**: `Frontend` ⚠️ **IMPORTANTE**: Cambia esto a `Frontend`
- **Build Command**: `pnpm build` (o deja el default)
- **Output Directory**: `.next` (o deja el default)
- **Install Command**: `pnpm install` (o deja el default)

**Variables de Entorno:**
- Por ahora no necesitas variables de entorno (el proyecto usa datos mock)

### Paso 3: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Listo! Tu dashboard estará disponible en una URL como: `churn-dashboard.vercel.app`

---

## 🔧 Opción 2: Despliegue desde la Terminal (CLI)

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
# o
pnpm add -g vercel
```

### Paso 2: Iniciar Sesión

```bash
vercel login
```

### Paso 3: Desplegar

Desde la raíz del proyecto:

```bash
cd /Users/edseldejesuscisnerosbautista/Documents/Churn_dashboard
vercel
```

Sigue las instrucciones:
- **Set up and deploy?** → `Y`
- **Which scope?** → Selecciona tu cuenta
- **Link to existing project?** → `N` (primera vez)
- **Project name?** → `churn-dashboard` (o el que prefieras)
- **Directory?** → `Frontend` ⚠️ **IMPORTANTE**
- **Override settings?** → `N`

### Paso 4: Desplegar a Producción

```bash
vercel --prod
```

---

## ⚙️ Configuración Avanzada

### Si Vercel no detecta el directorio correcto:

1. Ve a **Project Settings** → **General**
2. En **Root Directory**, selecciona `Frontend`
3. Guarda y vuelve a desplegar

### Configuración Manual en Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. **Settings** → **General**
3. Configura:
   - **Root Directory**: `Frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
   - **Node.js Version**: `20.x` (o la última LTS)

---

## 🔄 Actualizaciones Automáticas

Una vez conectado, Vercel desplegará automáticamente cada vez que hagas push a la rama `main`:

```bash
git add .
git commit -m "Actualización"
git push
```

Vercel detectará el cambio y desplegará automáticamente.

---

## 🌐 Dominio Personalizado (Opcional)

1. Ve a **Project Settings** → **Domains**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

---

## 🐛 Solución de Problemas

### Error: "Build failed"

**Problema**: El build falla porque no encuentra el directorio correcto.

**Solución**: 
1. Verifica que el **Root Directory** esté configurado como `Frontend`
2. Verifica que `vercel.json` esté en la raíz del repositorio

### Error: "Module not found"

**Problema**: Faltan dependencias.

**Solución**:
1. Asegúrate de que `pnpm-lock.yaml` esté en el repositorio
2. Verifica que el **Install Command** sea `pnpm install`

### Error: "Image optimization"

**Problema**: Next.js intenta optimizar imágenes.

**Solución**: Ya está configurado en `next.config.mjs` con `images: { unoptimized: true }`

---

## 📝 Checklist Pre-Deploy

- [ ] El repositorio está en GitHub
- [ ] El archivo `vercel.json` está en la raíz del proyecto
- [ ] El directorio `Frontend` contiene el proyecto Next.js
- [ ] `package.json` tiene los scripts de build correctos
- [ ] No hay errores de TypeScript críticos (está configurado para ignorar)

---

## ✅ Verificación Post-Deploy

Después del despliegue, verifica:

1. ✅ La página carga correctamente
2. ✅ Los gráficos se renderizan
3. ✅ La navegación funciona
4. ✅ Los filtros funcionan
5. ✅ No hay errores en la consola del navegador

---

## 🎉 ¡Listo!

Tu dashboard estará disponible en:
- **URL de Vercel**: `https://churn-dashboard.vercel.app` (o similar)
- **Actualizaciones automáticas** en cada push a `main`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de build en Vercel Dashboard
2. Verifica la configuración del Root Directory
3. Asegúrate de que todas las dependencias estén en `package.json`

