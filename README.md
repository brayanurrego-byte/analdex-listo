# 🎯 War Room del Importador 2.0
## XVI Foro Nacional de Importadores — Analdex × Branex
**Medellín, 26 Marzo 2026**

---

Dashboard de inteligencia en tiempo real para el importador colombiano.  
Datos vivos — TRM, Brent, calculadoras interactivas, timeline normativo, simulador electoral.

**Desarrollado por [Branex](https://wa.me/573008074984)** — Donde los datos se convierten en decisiones.

---

## 🚀 **Deploy Automático con Vercel**

### **Opción 1: GitHub + Vercel (Recomendado)**
1. **Fork este repositorio**
2. **Conecta con Vercel**: https://vercel.com/new
3. **Importa desde GitHub**
4. **Deploy automático** en 2 minutos

### **Opción 2: Desarrollo Local**
```bash
# Requiere Node.js 18+
npm install
npm run dev
```

### **Opción 3: Build para Producción**
```bash
npm run build
npm run preview
```

---

## 🛠️ **Stack Tecnológico**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.0
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Testing**: Vitest + Testing Library
- **Deploy**: Vercel

---

## 📊 **Features Implementadas**

### **✅ Dashboard Principal**
- TRM en vivo desde Superfinanciera
- Brent Oil precios en tiempo real
- Animaciones fluidas con Framer Motion
- Background neural interactivo

### **✅ APIs Reales**
- **TRM**: `datos.gov.co` (público, sin API key)
- **Brent**: Yahoo Finance vía proxy
- **Auto-refresh**: Cada 30 segundos

### **✅ Componentes Modulares**
- Header con navegación
- Market Overview con cards animados
- Sparkline charts interactivos
- Neural background canvas

---

## 📁 **Estructura del Proyecto**

```
src/
├── components/
│   ├── ui/           # Button, Card
│   ├── layout/       # Header
│   ├── dashboard/    # MarketOverview
│   ├── charts/       # Sparkline
│   └── backgrounds/  # NeuralBackground
├── hooks/            # Custom hooks
├── store/            # Zustand store
├── services/         # API services
├── types/            # TypeScript types
├── utils/            # Helpers
└── data/             # Constants
```

---

## 🎨 **Sistema de Diseño**

### **Colores Brand**
- **Void**: `#060B18` (fondo)
- **Signal**: `#00D4AA` (acentos)
- **Neural**: `#6C5CE7` (púrpura)
- **Data**: `#0984E3` (azul)

### **Componentes UI**
- **Button**: 4 variantes (primary, secondary, outline, ghost)
- **Card**: 3 variantes (default, glass, neural)
- **Animaciones**: Hover effects, micro-interacciones

---

## 📸 **Assets**

### **Speakers** (opcional)
Coloca en `public/speakers/`:
- `javier.jpg` → Javier Díaz Molina (Analdex)
- `david.jpg` → David Cubides (Banco de Occidente)
- `diego.jpg` → Diego Rengifo García (Analdex)
- `jesus.jpg` → Jesús Alonso Botero (EAFIT)

### **Logos** (opcional)
- `public/logos/analdex.png`

---

## 🚀 **Deploy en Vercel**

1. **Push a GitHub**
2. **Ve a Vercel**: https://vercel.com/new
3. **Importa repositorio**
4. **Configura variables** (si necesitas)
5. **Deploy** 🎉

### **URLs Esperadas**
- **Producción**: `https://warroom-analdex-branex.vercel.app`
- **Preview**: `https://warroom-analdex-branex-[branch].vercel.app`

---

## 🧪 **Testing**

```bash
# Unit tests
npm run test

# Test UI
npm run test:ui

# E2E tests
npm run test:e2e
```

---

## 📈 **Performance**

- **Lighthouse Score**: 95+
- **Bundle Size**: < 200KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2s

---

## 🔧 **Scripts Disponibles**

```bash
npm run dev      # Desarrollo local
npm run build    # Build producción
npm run preview  # Preview del build
npm run test     # Unit tests
npm run lint     # ESLint
npm run format   # Prettier
```

---

## 📞 **Contacto**

**Branex**  
📧 dashboards.branex@gmail.com  
📱 WhatsApp: 3008074984  
🌐 https://branex.co

---

*War Room 2.0 — Transformación completa con tecnología moderna*
