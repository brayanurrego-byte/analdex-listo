// ============================================================
//  WAR ROOM DEL IMPORTADOR — VERSIÓN HÍBRIDA
//  XVI Foro Nacional de Importadores — Analdex × Branex
//  Medellín, 26 Marzo 2026
//  Desarrollado por Branex — dashboards.branex@gmail.com
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── BRAND ───────────────────────────────────────────────
const B = {
  void:    '#060B18',
  deep:    '#0F1B35',
  card:    '#0D1A30',
  signal:  '#00D4AA',
  neural:  '#6C5CE7',
  data:    '#0984E3',
  pulse:   '#00CEFF',
  analdex: '#1B5CA8',
  gold:    '#F4C430',
  red:     '#FF5555',
  yellow:  '#FECA57',
  text:    '#FFFFFF',
  muted:   'rgba(255,255,255,0.6)',
  faint:   'rgba(255,255,255,0.25)',
  border:  'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.13)',
};

// ─── SESSIONS ────────────────────────────────────────────
const SESSIONS = [
  { id:0, time:'8:30',  label:'Instalación',       accent:B.signal,  speaker:'Javier Díaz Molina',       org:'Presidente · Analdex',               photo:'/speakers/javier.jpg',  initials:'JD' },
  { id:1, time:'9:15',  label:'Panorama 2026',      accent:B.data,    speaker:'David Cubides',             org:'Economista Jefe · Banco de Occidente',photo:'/speakers/david.jpg',   initials:'DC' },
  { id:2, time:'9:50',  label:'Normativa 25 Años',  accent:B.neural,  speaker:'Diego Rengifo García',      org:'VP Técnico · Analdex',               photo:'/speakers/diego.jpg',   initials:'DR' },
  { id:3, time:'11:00', label:'Panel LatAm',         accent:B.yellow,  speaker:'Chile · México · Colombia', org:'Régimen Sancionatorio Comparado',    photo:null,                    initials:'🌎' },
  { id:4, time:'14:00', label:'Parlamentario',       accent:'#FF6B6B', speaker:'Panel de Senadores',        org:'Proyectos de ley activos',           photo:null,                    initials:'🏛' },
  { id:5, time:'15:00', label:'Elecciones 2026',     accent:B.pulse,   speaker:'Jesús Alonso Botero',       org:'Profesor Emérito · EAFIT',           photo:'/speakers/jesus.jpg',   initials:'JB' },
  { id:6, time:'16:00', label:'Solvencia',           accent:B.signal,  speaker:'Panel Empresarial',         org:'Solvencia Económica · IDI™ Branex',  photo:null,                    initials:'⚖' },
];

// ─── DATA ────────────────────────────────────────────────
const TRM_HIST = [
  {m:'E25',v:4280},{m:'F25',v:4190},{m:'M25',v:4050},{m:'A25',v:4120},
  {m:'M25',v:4080},{m:'J25',v:4200},{m:'J25',v:4310},{m:'A25',v:4260},
  {m:'S25',v:4180},{m:'O25',v:4090},{m:'N25',v:4150},{m:'D25',v:4270},
  {m:'E26',v:4380},{m:'F26',v:4250},{m:'M26',v:4271},
];

const TIMELINE = [
  {year:'2000',title:'Decreto 2685',       desc:'El Estatuto Aduanero original — la constitución del comercio exterior colombiano. Rigió 16 años ininterrumpidos.',                                  type:'reforma'  },
  {year:'2007',title:'TLC EFTA',           desc:'Primer TLC con Europa no-UE: Suiza, Noruega e Islandia. Acceso a industria farmacéutica y tecnológica de primer nivel.',                    type:'tlc'     },
  {year:'2012',title:'TLC EE.UU.',         desc:'El tratado de mayor impacto: 330 millones de consumidores con acceso preferencial. Colombia en el mapa global.',                         type:'tlc'     },
  {year:'2014',title:'TLC Unión Europea', desc:'500 millones de consumidores. El mayor bloque económico del mundo le abre la puerta a los productos colombianos.',                     type:'tlc'     },
  {year:'2016',title:'Decreto 1165',      desc:'Nuevo Estatuto Aduanero — modernización total del régimen. Colombia se alinea con estándares SAFE de la OMA.',                           type:'reforma'  },
  {year:'2019',title:'OEA Colombia',      desc:'Operadores Económicos Autorizados. Las empresas con buen historial obtienen trato preferencial en aduanas.',                      type:'mod'     },
  {year:'2021',title:'DIAN Digital',      desc:'Modernización tecnológica: MUISCA 2.0, declaraciones electrónicas, factura-e. La aduana entra al siglo XXI.',                       type:'tech'    },
  {year:'2023',title:'Giro Político',     desc:'Gobierno Petro revisa TLCs y política comercial. Incertidumbre sobre régimen de inversión y apertura comercial.',                    type:'politica'},
  {year:'2024',title:'🔥 Decreto Sancionatorio', desc:'El más polémico de la era reciente. Endurece multas, cambia bases de cálculo. PYMEs en alerta. Debate nacional.',           type:'sancion' },
  {year:'2025',title:'Declaración Anticipada', desc:'La DIAN impulsa declaración anticipada obligatoria. Ecosistema aduanero no está listo — debate de implementación.',              type:'reforma'  },
  {year:'2026',title:'¿Qué sigue?',        desc:'Este foro. Esta sala. La narrativa del comercio exterior colombiano se escribe con las decisiones que se toman hoy.',                  type:'futuro'  },
];

const SANCION = [
  {asp:'Prescripción sanciones', col:'3 años', chi:'3 años', mex:'5 años', w:'mex'},
  {asp:'Base cálculo multa',     col:'% valor mercancía', chi:'UTM (~USD 70)', mex:'% contribución', w:'chi'},
  {asp:'Multa máxima importador',col:'200% del valor', chi:'300 UTM', mex:'100% contribución', w:'mex'},
  {asp:'Instancia de apelación',col:'DIAN interno', chi:'Tribunal Aduanero', mex:'TFJA independiente', w:'chi'},
  {asp:'Habilitación OEA',       col:'Sí (3 años)', chi:'Sí (2 años)', mex:'Sí (2 años)', w:'tie'},
  {asp:'Reforma más reciente',   col:'2024 (Polémica)', chi:'2022 (Gradual)', mex:'2023 (Consenso)', w:'chi'},
  {asp:'Recurso preventivo importador', col:'Limitado', chi:'Medida cautelar', mex:'Suspensión prov.', w:'mex'},
];

const PROYECTOS = [
  {cod:'PL 234/2025',titulo:'Simplificación de Trámites Aduaneros',estado:'Segundo debate',impacto:'Reduce tiempos de despacho de 12 a 5 días hábiles',alerta:false,comision:'Comisión Tercera'},
  {cod:'PL 156/2025',titulo:'Zonas Francas — Nueva Generación',estado:'Primer debate',impacto:'Amplía beneficios a empresas de servicios digitales y e-commerce',alerta:false,comision:'Comisión Sexta'},
  {cod:'PL 089/2025',titulo:'Modificación Régimen Sancionatorio',estado:'En comisión',impacto:'Busca reducir bases de multas para PYMEs importadoras',alerta:true,comision:'Comisión Tercera'},
  {cod:'PL 310/2025',titulo:'Declaración Anticipada Obligatoria',estado:'Radicado',impacto:'Obliga declaración antes de arribo — debate por implementación',alerta:true,comision:'Comisión Sexta'},
  {cod:'PL 045/2026',titulo:'Solvencia Económica Importadores',estado:'En estudio',impacto:'Nuevos requisitos de capital — PYMEs en riesgo de exclusión',alerta:true,comision:'Comisión Tercera'},
  {cod:'PL 078/2026',titulo:'Acuerdo Asia-Pacífico',estado:'Ponencia',impacto:'Reducción arancelaria con Corea del Sur y Japón',alerta:false,comision:'Comisión Segunda'},
];

const INSIGHTS = [
  'China representa el 28.8% de las importaciones colombianas. En 2020 era el 22%. La dependencia crece cada año.',
  'Cada punto de devaluación del peso equivale a ~USD 700M en mayor valor de importaciones en COP.',
  'Colombia tiene 16 TLCs vigentes pero solo aprovecha activamente 4 de ellos para reducir aranceles reales.',
  'El déficit comercial 2025 de USD 16.377M es el más alto en 30 años. Colombia importa 40% más de lo que exporta.',
  'Las manufacturas crecieron 11.7% en importaciones 2025 — señal de reactivación industrial.',
  'Tasa política monetaria: 10.25% desde enero 2026. El costo financiero de importar nunca fue tan alto.',
  'Japón creció 80.2% en diciembre 2025 — el mercado asiático se diversifica más allá de China.',
  'Antioquia es la 2ª región importadora del país. Esta sala mueve miles de millones en comercio anual.',
];

// ─── API FUNCTIONS ─────────────────────────────────────────
async function fetchTRM() {
  try {
    const res = await fetch('https://www.datos.gov.co/resource/mcec-87by.json?$order=vigenciadesde%20desc&$limit=1');
    const data = await res.json();
    return data[0]?.valor ? parseFloat(data[0].valor.replace(',', '')) : 4271;
  } catch {
    return 4271;
  }
}

async function fetchBrent() {
  try {
    const res = await fetch('https://api.allorigins.win/raw?url=https://query1.finance.yahoo.com/v8/finance/chart/BZ=F');
    const data = await res.json();
    const price = data.chart?.result?.[0]?.meta?.regularMarketPrice;
    return price ? parseFloat(price.toFixed(2)) : 82.45;
  } catch {
    return 82.45;
  }
}

// ─── HOOKS ─────────────────────────────────────────────────
function useCountUp(target, active = true) {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    if (!active || !target) return;
    setAnimating(true);
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current += stepValue;
      const easeOut = 1 - Math.pow(1 - step / steps, 4);
      setCount(Math.floor(target * easeOut));
      
      if (step >= steps) {
        setCount(target);
        setAnimating(false);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target, active]);
  
  return count;
}

// ─── COMPONENTS ─────────────────────────────────────────────
function Sparkline({ data, color = B.signal, height = 70, width = 320 }) {
  const values = data.map(d => d.v);
  const min = Math.min(...values) - 80;
  const max = Math.max(...values) + 80;
  
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return [x, y];
  });
  
  const pathData = `M ${points.map(p => p.join(',')).join(' L ')}`;
  const areaData = `M ${points[0].join(',')} L ${points.map(p => p.join(',')).join(' L ')} L ${width},${height} L 0,${height} Z`;
  const lastPoint = points[points.length - 1];
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaData} fill={`url(#gradient-${color.replace('#', '')})`}/>
      <path d={pathData} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="4" fill={color}/>
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="8" fill={color} fillOpacity="0.2"/>
    </svg>
  );
}

function NeuralBg() {
  const canvasRef = useRef();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    
    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    
    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach(nodeB => {
          const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.09 * (1 - distance / 170)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, 0.22)';
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    const handleResize = () => {
      resize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>;
}

// ─── MAIN APP ───────────────────────────────────────────────
export default function App() {
  const [trm, setTrm] = useState(4271);
  const [brent, setBrent] = useState(82.45);
  const [lastUpdate, setLastUpdate] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const trmCountUp = useCountUp(trm, true);
  const brentCountUp = useCountUp(brent, true);
  
  useEffect(() => {
    const loadData = async () => {
      const [trmValue, brentValue] = await Promise.all([fetchTRM(), fetchBrent()]);
      setTrm(trmValue);
      setBrent(brentValue);
      setLastUpdate(new Date().toLocaleString('es-CO'));
    };
    
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const fmtCOP = (num) => new Intl.NumberFormat('es-CO').format(num);
  const fmtUSD = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: B.void, color: B.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <NeuralBg />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: `${B.void}CC`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${B.border}` }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: B.signal }}>
                <span style={{ color: B.void, fontWeight: 'bold', fontSize: '12px' }}>WR</span>
              </div>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>War Room</h1>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>XVI Foro Importadores</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-2">
              {['dashboard', 'timeline', 'sessions', 'projects', 'compare'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className="px-3 py-1 rounded text-sm transition-all"
                  style={{
                    backgroundColor: activeSection === section ? B.signal : 'transparent',
                    color: activeSection === section ? B.void : B.text,
                    opacity: activeSection === section ? 1 : 0.7
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: B.signal }}></div>
                <span style={{ opacity: 0.6 }}>Live</span>
              </div>
              <button className="px-3 py-1 rounded text-sm border" style={{ borderColor: B.border }}>
                Exportar
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* TRM Card */}
              <div className="rounded-lg p-6 backdrop-blur-md border" style={{ backgroundColor: `${B.card}80`, borderColor: B.border }}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium" style={{ opacity: 0.6 }}>TRM</h3>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: B.signal }}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      ${fmtCOP(trmCountUp)}
                    </div>
                    <div className="text-xs" style={{ opacity: 0.6 }}>
                      {lastUpdate}
                    </div>
                  </div>

                  <div className="h-16">
                    <Sparkline data={TRM_HIST} color={B.signal} />
                  </div>
                </div>
              </div>

              {/* Brent Card */}
              <div className="rounded-lg p-6 backdrop-blur-md border" style={{ backgroundColor: `${B.card}80`, borderColor: B.border }}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium" style={{ opacity: 0.6 }}>Brent Oil</h3>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: B.data }}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {fmtUSD(brentCountUp)}
                    </div>
                    <div className="text-xs" style={{ opacity: 0.6 }}>
                      Barril · USD
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <span style={{ color: B.yellow }}>▲</span>
                    <span style={{ opacity: 0.6 }}>+2.3% hoy</span>
                  </div>
                </div>
              </div>

              {/* Importaciones Card */}
              <div className="rounded-lg p-6 backdrop-blur-md border" style={{ backgroundColor: `${B.card}80`, borderColor: B.border }}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium" style={{ opacity: 0.6 }}>Importaciones</h3>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${B.yellow}20`, color: B.yellow }}>2025</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">$52.3B</div>
                    <div className="text-xs" style={{ opacity: 0.6 }}>
                      +11.7% vs 2024
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <span style={{ color: B.signal }}>▲</span>
                    <span style={{ opacity: 0.6 }}>Manufacturas</span>
                  </div>
                </div>
              </div>

              {/* Déficit Card */}
              <div className="rounded-lg p-6 backdrop-blur-md border" style={{ backgroundColor: `${B.card}80`, borderColor: B.border }}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium" style={{ opacity: 0.6 }}>Déficit</h3>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${B.red}20`, color: B.red }}>Crítico</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">$16.4B</div>
                    <div className="text-xs" style={{ opacity: 0.6 }}>
                      +40% import vs export
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <span style={{ color: B.red }}>▼</span>
                    <span style={{ opacity: 0.6 }}>30 años máximo</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection !== 'dashboard' && (
            <div className="text-center py-20" style={{ opacity: 0.6 }}>
              <h2 className="text-2xl font-bold mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
              <p>Component en desarrollo...</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 mt-20" style={{ borderTop: `1px solid ${B.border}` }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ fontSize: '14px', opacity: 0.6 }}>
            XVI Foro Nacional de Importadores · Medellín 26 Marzo 2026
          </p>
          <p style={{ fontSize: '12px', opacity: 0.3, marginTop: '8px' }}>
            Desarrollado por Branex — dashboards.branex@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}
