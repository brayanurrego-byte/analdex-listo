// ============================================================
//  WAR ROOM DEL IMPORTADOR — VERSIÓN FINAL
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
  {year:'2007',title:'TLC EFTA',           desc:'Primer TLC con Europa no-UE: Suiza, Noruega e Islandia. Acceso a industria farmacéutica y tecnológica de primer nivel.',                            type:'tlc'      },
  {year:'2012',title:'TLC EE.UU.',         desc:'El tratado de mayor impacto: 330 millones de consumidores con acceso preferencial. Colombia en el mapa global.',                                    type:'tlc'      },
  {year:'2014',title:'TLC Unión Europea',  desc:'500 millones de consumidores. El mayor bloque económico del mundo le abre la puerta a los productos colombianos.',                                  type:'tlc'      },
  {year:'2016',title:'Decreto 1165',       desc:'Nuevo Estatuto Aduanero — modernización total del régimen. Colombia se alinea con estándares SAFE de la OMA.',                                     type:'reforma'  },
  {year:'2019',title:'OEA Colombia',       desc:'Operadores Económicos Autorizados. Las empresas con buen historial obtienen trato preferencial en aduanas.',                                       type:'mod'      },
  {year:'2021',title:'DIAN Digital',       desc:'Modernización tecnológica: MUISCA 2.0, declaraciones electrónicas, factura-e. La aduana entra al siglo XXI.',                                      type:'tech'     },
  {year:'2023',title:'Giro Político',      desc:'Gobierno Petro revisa TLCs y política comercial. Incertidumbre sobre régimen de inversión y apertura comercial.',                                  type:'politica' },
  {year:'2024',title:'🔥 Decreto Sancionatorio', desc:'El más polémico de la era reciente. Endurece multas, cambia bases de cálculo. PYMEs en alerta. Debate nacional.',                           type:'sancion'  },
  {year:'2025',title:'Declaración Anticipada', desc:'La DIAN impulsa declaración anticipada obligatoria. Ecosistema aduanero no está listo — debate de implementación.',                            type:'reforma'  },
  {year:'2026',title:'¿Qué sigue?',        desc:'Este foro. Esta sala. La narrativa del comercio exterior colombiano se escribe con las decisiones que se toman hoy.',                              type:'futuro'   },
];

const SANCION = [
  {asp:'Prescripción sanciones',        col:'3 años',            chi:'3 años',            mex:'5 años',           w:'mex'},
  {asp:'Base cálculo multa',            col:'% valor mercancía', chi:'UTM (~USD 70)',      mex:'% contribución',   w:'chi'},
  {asp:'Multa máxima importador',       col:'200% del valor',    chi:'300 UTM',           mex:'100% contribución',w:'mex'},
  {asp:'Instancia de apelación',        col:'DIAN interno',      chi:'Tribunal Aduanero', mex:'TFJA independiente',w:'chi'},
  {asp:'Habilitación OEA',              col:'Sí (3 años)',        chi:'Sí (2 años)',        mex:'Sí (2 años)',      w:'tie'},
  {asp:'Reforma más reciente',          col:'2024 (Polémica)',    chi:'2022 (Gradual)',     mex:'2023 (Consenso)',  w:'chi'},
  {asp:'Recurso preventivo importador', col:'Limitado',          chi:'Medida cautelar',   mex:'Suspensión prov.', w:'mex'},
];

const PROYECTOS = [
  {cod:'PL 234/2025',titulo:'Simplificación de Trámites Aduaneros',   estado:'Segundo debate', impacto:'Reduce tiempos de despacho de 12 a 5 días hábiles',              alerta:false, comision:'Comisión Tercera'},
  {cod:'PL 156/2025',titulo:'Zonas Francas — Nueva Generación',        estado:'Primer debate',  impacto:'Amplía beneficios a empresas de servicios digitales y e-commerce', alerta:false, comision:'Comisión Sexta'},
  {cod:'PL 089/2025',titulo:'Modificación Régimen Sancionatorio',      estado:'En comisión',    impacto:'Busca reducir bases de multas para PYMEs importadoras',            alerta:true,  comision:'Comisión Tercera'},
  {cod:'PL 310/2025',titulo:'Declaración Anticipada Obligatoria',      estado:'Radicado',       impacto:'Obliga declaración antes de arribo — debate por implementación',    alerta:true,  comision:'Comisión Sexta'},
  {cod:'PL 045/2026',titulo:'Solvencia Económica Importadores',        estado:'En estudio',     impacto:'Nuevos requisitos de capital — PYMEs en riesgo de exclusión',       alerta:true,  comision:'Comisión Tercera'},
  {cod:'PL 078/2026',titulo:'Acuerdo Asia-Pacífico',                   estado:'Ponencia',       impacto:'Reducción arancelaria con Corea del Sur y Japón',                  alerta:false, comision:'Comisión Segunda'},
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

// ─── HELPERS ─────────────────────────────────────────────
const fmtCOP = n => Math.round(n).toLocaleString('es-CO');
const fmtUSD = n => parseFloat(n).toLocaleString('en-US', {maximumFractionDigits:2});

async function fetchTRM() {
  try {
    const url = 'https://www.datos.gov.co/resource/mcec-87by.json?$order=vigenciadesde%20DESC&$limit=1';
    const r = await fetch(url, { signal: AbortSignal.timeout(7000) });
    const d = await r.json();
    if (d?.[0]?.valor) return parseFloat(d[0].valor);
  } catch {}
  return null;
}

async function fetchBrent() {
  try {
    const url = 'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=3d';
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const r = await fetch(proxy, { signal: AbortSignal.timeout(9000) });
    const j = await r.json();
    const raw = JSON.parse(j.contents);
    return raw?.chart?.result?.[0]?.meta?.regularMarketPrice ?? null;
  } catch { return null; }
}

function useCountUp(target, active, duration=1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    setVal(0);
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return val;
}

// ─── SPARKLINE ───────────────────────────────────────────
function Sparkline({ data, color, h=70 }) {
  const vals = data.map(d=>d.v);
  const min = Math.min(...vals)-80; const max = Math.max(...vals)+80;
  const W = 320;
  const pts = vals.map((v,i)=>{
    const x=(i/(vals.length-1))*W;
    const y=h-((v-min)/(max-min))*h;
    return [x,y];
  });
  const path = `M ${pts.map(p=>p.join(',')).join(' L ')}`;
  const area = `M ${pts[0].join(',')} L ${pts.map(p=>p.join(',')).join(' L ')} L ${W},${h} L 0,${h} Z`;
  const last = pts[pts.length-1];
  return (
    <svg viewBox={`0 0 ${W} ${h}`} style={{width:'100%',height:h}} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg${color.replace('#','')})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={last[0]} cy={last[1]} r="4" fill={color}/>
      <circle cx={last[0]} cy={last[1]} r="8" fill={color} fillOpacity="0.2"/>
    </svg>
  );
}

// ─── NEURAL BG ───────────────────────────────────────────
function NeuralBg() {
  const ref = useRef(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext('2d');
    const resize = ()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight; };
    resize();
    const nodes = Array.from({length:32},()=>({
      x:Math.random()*c.width, y:Math.random()*c.height,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    }));
    let raf;
    const draw = ()=>{
      ctx.clearRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0||n.x>c.width) n.vx*=-1;
        if(n.y<0||n.y>c.height) n.vy*=-1;
      });
      nodes.forEach((a,i)=>nodes.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<170){
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(0,212,170,${.09*(1-d/170)})`; ctx.lineWidth=.8; ctx.stroke();
        }
      }));
      nodes.forEach(n=>{
        ctx.beginPath(); ctx.arc(n.x,n.y,2,0,Math.PI*2);
        ctx.fillStyle='rgba(0,212,170,0.22)'; ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize',resize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  },[]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.5}}/>;
}

// ─── UI ATOMS ────────────────────────────────────────────
function SLabel({ text, color }) {
  return (
    <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:color||B.muted,
      letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:10,opacity:.75}}>
      // {text}
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{background:`${color}1A`,color,border:`1px solid ${color}35`,
      borderRadius:99,padding:'3px 10px',fontSize:10,fontFamily:'JetBrains Mono, monospace',
      whiteSpace:'nowrap',letterSpacing:'0.04em'}}>
      {label}
    </span>
  );
}

function KCard({ label, value, suffix='', prefix='', accent, note, size=24 }) {
  return (
    <div style={{background:`linear-gradient(135deg,${B.deep}f0,${accent}0d)`,
      border:`1px solid ${accent}28`,borderRadius:14,padding:'16px 18px',
      textAlign:'center',flex:1,minWidth:130}}>
      <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:size,fontWeight:700,
        color:accent,lineHeight:1.1,letterSpacing:'-0.02em'}}>
        {prefix}{typeof value==='number'?value.toLocaleString('es-CO'):value}{suffix}
      </div>
      <div style={{fontSize:11,color:B.muted,marginTop:6,lineHeight:1.4}}>{label}</div>
      {note&&<div style={{fontSize:10,color:accent,marginTop:4,opacity:.8}}>{note}</div>}
    </div>
  );
}

function SpeakerBig({ session }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{display:'flex',alignItems:'center',gap:16,
      background:`linear-gradient(135deg,${B.deep}ee,${session.accent}12)`,
      border:`1px solid ${session.accent}28`,borderRadius:16,padding:'14px 20px',
      marginBottom:18,backdropFilter:'blur(12px)'}}>
      <div style={{width:64,height:64,borderRadius:'50%',overflow:'hidden',flexShrink:0,
        border:`2px solid ${session.accent}55`,
        background:`linear-gradient(135deg,${session.accent}22,${B.neural}22)`,
        display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
        {session.photo&&!err
          ?<img src={session.photo} alt={session.speaker} onError={()=>setErr(true)}
              style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
          :<span>{session.initials}</span>}
      </div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,
          color:B.text,letterSpacing:'-.01em'}}>{session.speaker}</div>
        <div style={{fontSize:12,color:session.accent,fontFamily:'JetBrains Mono, monospace',
          marginTop:3,opacity:.9}}>{session.org}</div>
      </div>
      <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:28,fontWeight:700,
        color:session.accent,opacity:.3}}>{session.time}</div>
    </div>
  );
}

// ─── LOGOS ───────────────────────────────────────────────
function AnaldexLogo({ height=30 }) {
  return (
    <div style={{background:'#fff',borderRadius:8,padding:'4px 10px',
      display:'flex',alignItems:'center',flexShrink:0,
      boxShadow:`0 0 0 1px rgba(255,255,255,0.1)`}}>
      <img src="/logos/analdex.jpg" alt="Analdex"
        style={{height,width:'auto',display:'block'}}/>
    </div>
  );
}

function BranexLogo({ size=26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="8"  r="3.5" fill="#00D4AA"/>
      <circle cx="34" cy="20" r="3.5" fill="#6C5CE7"/>
      <circle cx="28" cy="34" r="3.5" fill="#0984E3"/>
      <circle cx="12" cy="34" r="3.5" fill="#00CEFF"/>
      <circle cx="6"  cy="20" r="3.5" fill="#6C5CE7"/>
      <circle cx="20" cy="20" r="4.2" fill="#00D4AA"/>
      <line x1="20" y1="8"  x2="34" y2="20" stroke="#00D4AA" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="34" y1="20" x2="28" y2="34" stroke="#6C5CE7" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="28" y1="34" x2="20" y2="20" stroke="#0984E3" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="20" y1="20" x2="12" y2="34" stroke="#00CEFF" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="12" y1="34" x2="6"  y2="20" stroke="#6C5CE7" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="6"  y1="20" x2="20" y2="8"  stroke="#00D4AA" strokeWidth="1.3" strokeOpacity=".55"/>
      <line x1="20" y1="8"  x2="20" y2="20" stroke="#00D4AA" strokeWidth="1.6" strokeOpacity=".85"/>
      <line x1="34" y1="20" x2="20" y2="20" stroke="#6C5CE7" strokeWidth="1.6" strokeOpacity=".85"/>
      <line x1="6"  y1="20" x2="20" y2="20" stroke="#0984E3" strokeWidth="1.6" strokeOpacity=".85"/>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────
//  SESSION MODULES
// ──────────────────────────────────────────────────────────

// S0 — INSTALACIÓN
function S0({ session, active }) {
  const imp = useCountUp(70502, active, 1800);
  const exp = useCountUp(50199, active, 1800);
  const def = useCountUp(16377, active, 1800);
  return (
    <div>
      <SpeakerBig session={session}/>
      <div style={{background:`${B.deep}cc`,border:`1px solid ${B.signal}25`,borderRadius:14,
        padding:'14px 20px',marginBottom:18,borderLeft:`3px solid ${B.signal}`}}>
        <div style={{fontSize:14,lineHeight:1.7,fontStyle:'italic',color:B.muted}}>
          <span style={{color:B.text}}>"Hay un crecimiento de las compras provenientes del exterior del 10%.
          Eso muestra que la economía empieza a reactivarse. Pero nuestra balanza comercial deficitaria
          se sigue ampliando. Estamos importando mucho más de lo que exportamos. </span>
          <span style={{color:B.signal,fontWeight:600}}>¿Qué vamos a hacer?"</span>
        </div>
        <div style={{fontSize:11,color:B.muted,marginTop:6,fontFamily:'JetBrains Mono, monospace'}}>
          — Javier Díaz Molina · Analdex · Febrero 2026 · Infobae Colombia
        </div>
      </div>

      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:18}}>
        <KCard label="Importaciones Colombia 2025" value={imp} suffix="M USD" accent={B.data} size={28} note="Cifra histórica récord"/>
        <KCard label="Exportaciones Colombia 2025" value={exp} suffix="M USD" accent={B.signal} size={28}/>
        <KCard label="Déficit Comercial 2025" value={def} prefix="-$" suffix="M" accent={B.red} size={28} note="🚨 El más alto en 30 años"/>
        <KCard label="Crecimiento importaciones" value="10%" accent={B.yellow} size={28} note="vs año 2024"/>
      </div>

      <SLabel text="Estructura importaciones por uso económico · 2025" color={B.signal}/>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:18}}>
        {[
          {label:'Manufacturas',     pct:'74%', val:'$52.937M', growth:'+11.7%', color:B.data},
          {label:'Mat. primas',      pct:'18%', val:'$32.665M', growth:'+5.9%',  color:B.signal},
          {label:'Alimentos/Bebidas',pct:'15%', val:'$10.346M', growth:'+10.8%', color:B.yellow},
          {label:'Combustibles',     pct:'10%', val:'$7.090M',  growth:'-2.5%',  color:B.red},
        ].map(({label,pct,val,growth,color})=>(
          <div key={label} style={{flex:1,minWidth:140,background:B.deep,borderRadius:12,
            padding:'14px 16px',border:`1px solid ${color}25`}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:26,fontWeight:700,color}}>{pct}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,marginTop:4}}>{label}</div>
            <div style={{fontSize:11,color:B.muted,marginTop:2}}>{val}</div>
            <div style={{fontSize:11,marginTop:4,color:growth.startsWith('+')? B.signal:B.red}}>{growth} vs 2024</div>
          </div>
        ))}
      </div>

      <SLabel text="Top 5 proveedores · Colombia 2025" color={B.signal}/>
      <div style={{background:B.deep,borderRadius:14,padding:18,border:`1px solid ${B.border}`}}>
        {[
          ['🇨🇳 China',          28.8, B.red,    '28.8%', '+20.2% en dic'],
          ['🇺🇸 Estados Unidos', 21.8, B.data,   '21.8%', '-11.5% en dic'],
          ['🇧🇷 Brasil',          7.2, B.signal,  '7.2%',  '+3.1% anual'],
          ['🇲🇽 México',          6.9, '#FF9800', '6.9%',  '+1.2% anual'],
          ['🇯🇵 Japón',           4.8, B.neural,  '4.8%',  '+80.2% en dic 🚀'],
        ].map(([c,pct,col,label,note])=>(
          <div key={c} style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
            <div style={{width:172,fontSize:13,color:B.text,flexShrink:0}}>{c}</div>
            <div style={{flex:1,height:8,background:B.void,borderRadius:99,overflow:'hidden'}}>
              <div style={{width:`${(pct/32)*100}%`,height:'100%',background:col,
                borderRadius:99,transition:'width 1.5s cubic-bezier(0.34,1.2,0.64,1)'}}/>
            </div>
            <div style={{width:44,textAlign:'right',fontFamily:'JetBrains Mono, monospace',
              fontSize:13,color:col,fontWeight:700}}>{label}</div>
            <div style={{width:120,fontSize:10,color:B.muted,textAlign:'right'}}>{note}</div>
          </div>
        ))}
        <div style={{marginTop:8,fontSize:10,color:B.muted,textAlign:'right',fontFamily:'JetBrains Mono, monospace'}}>
          Fuente: DANE · Informe Importaciones 2025 · Analdex Analytics
        </div>
      </div>
    </div>
  );
}

// S1 — PANORAMA / CUBIDES
function S1({ session, trm }) {
  const [fob,  setFob]  = useState(50000);
  const [aran, setAran] = useState(10);
  const [flete,setFlete]= useState(10);
  const liveTRM = trm || 4271;
  const fleteV = fob*(flete/100);
  const seg    = fob*0.005;
  const cif    = fob+fleteV+seg;
  const cifCOP = cif*liveTRM;
  const aranCOP= cifCOP*(aran/100);
  const iva    = (cifCOP+aranCOP)*0.19;
  const total  = cifCOP+aranCOP+iva;

  return (
    <div>
      <SpeakerBig session={session}/>
      <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>

        {/* TRM LIVE */}
        <div style={{flex:'0 0 280px',background:B.deep,borderRadius:14,padding:20,
          border:`1px solid ${B.data}30`}}>
          <SLabel text="TRM · Superfinanciera Colombia" color={B.data}/>
          <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:6}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:50,fontWeight:700,
              color:B.data,lineHeight:1}}>
              ${liveTRM.toLocaleString('es-CO',{maximumFractionDigits:2})}
            </div>
          </div>
          <div style={{fontSize:11,marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:7,height:7,borderRadius:'50%',
              background:trm?B.signal:B.yellow,display:'inline-block',
              boxShadow:trm?`0 0 8px ${B.signal}`:'none',
              animation:trm?'pulse 2s infinite':'none'}}/>
            <span style={{color:B.muted}}>
              {trm?'En vivo — Superfinanciera':'Dato de referencia · 25 Mar 2026'}
            </span>
          </div>
          <Sparkline data={TRM_HIST} color={B.data} h={70}/>
          <div style={{display:'flex',justifyContent:'space-between',
            fontSize:10,color:B.muted,marginTop:4}}>
            <span>Ene 2025</span><span>Mar 2026</span>
          </div>
          <div style={{marginTop:14,background:`${B.data}12`,borderRadius:10,
            padding:'10px 14px',border:`1px solid ${B.data}20`,fontSize:12,color:B.muted,lineHeight:1.6}}>
            💡 Con el dólar en{' '}
            <span style={{color:B.data,fontFamily:'JetBrains Mono, monospace'}}>
              ${liveTRM.toLocaleString('es-CO')}
            </span>, importar en pesos cuesta{' '}
            <span style={{color:B.red,fontWeight:600}}>
              {(((liveTRM/TRM_HIST[0].v)-1)*100).toFixed(1)}% más
            </span>{' '}
            que hace 15 meses.
          </div>
          <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
            {[
              {label:'Tasa política monetaria',val:'10.25%',color:B.red,note:'↑100bps ene-26'},
              {label:'Inflación esperada 2026', val:'4.8%',  color:B.yellow,note:'Proyección BanRep'},
            ].map(({label,val,color,note})=>(
              <div key={label} style={{flex:1,background:`${color}10`,borderRadius:8,
                padding:'8px 12px',border:`1px solid ${color}25`}}>
                <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:18,color,fontWeight:700}}>{val}</div>
                <div style={{fontSize:10,color:B.muted,marginTop:3}}>{label}</div>
                <div style={{fontSize:10,color,marginTop:2,opacity:.7}}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CALCULADORA CIF */}
        <div style={{flex:1,minWidth:300,background:B.deep,borderRadius:14,padding:20,
          border:`1px solid ${B.data}30`}}>
          <SLabel text="Calculadora CIF — ¿Cuánto cuesta realmente tu importación?" color={B.data}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
            <div>
              <label style={{fontSize:11,color:B.muted,display:'block',marginBottom:5}}>Valor FOB (USD)</label>
              <input type="number" value={fob} min={0} step={1000}
                onChange={e=>setFob(Math.max(0,+e.target.value||0))}
                style={{width:'100%',background:B.void,border:`1px solid ${B.data}40`,
                  borderRadius:8,padding:'9px 12px',color:B.text,
                  fontFamily:'JetBrains Mono, monospace',fontSize:14,outline:'none'}}/>
            </div>
            <div>
              <label style={{fontSize:11,color:B.muted,display:'block',marginBottom:5}}>Arancel (%)</label>
              <select value={aran} onChange={e=>setAran(+e.target.value)}
                style={{width:'100%',background:B.void,border:`1px solid ${B.data}40`,
                  borderRadius:8,padding:'9px 12px',color:B.text,fontSize:13,outline:'none'}}>
                {[0,5,10,15,20,25].map(v=><option key={v} value={v}>
                  {v}%{v===0?' (libre)':v===10?' (promedio nacional)':''}
                </option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:11,color:B.muted,display:'block',marginBottom:5}}>
                Flete estimado — {flete}%
              </label>
              <input type="range" min={3} max={25} step={1} value={flete}
                onChange={e=>setFlete(+e.target.value)}
                style={{width:'100%',accentColor:B.data,marginTop:6,height:24,cursor:'pointer'}}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontSize:11,color:B.muted}}>Seguro (0.5% FOB)</div>
              <div style={{fontFamily:'JetBrains Mono, monospace',color:B.text,marginTop:4}}>
                USD {fmtUSD(fob*0.005)}
              </div>
            </div>
          </div>
          {[
            {label:'Valor CIF (USD)',            val:`USD ${fmtUSD(cif)}`,   color:B.muted},
            {label:'Valor CIF en pesos',          val:`$ ${fmtCOP(cifCOP)}`, color:B.data},
            {label:`Arancel (${aran}% del CIF)`,  val:`$ ${fmtCOP(aranCOP)}`,color:B.yellow},
            {label:'IVA 19%',                     val:`$ ${fmtCOP(iva)}`,    color:'#FF9800'},
          ].map(({label,val,color})=>(
            <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
              padding:'9px 0',borderBottom:`1px solid ${B.border}`}}>
              <span style={{fontSize:12,color:B.muted}}>{label}</span>
              <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:13,color}}>{val}</span>
            </div>
          ))}
          <div style={{marginTop:14,background:`${B.data}18`,borderRadius:10,
            padding:'14px 18px',border:`1px solid ${B.data}35`,
            display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14}}>TOTAL ESTIMADO</div>
              <div style={{fontSize:10,color:B.muted,marginTop:2}}>Sin bodegaje ni agencia de aduanas</div>
            </div>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:22,fontWeight:700,color:B.data}}>
              $ {fmtCOP(total)}
            </div>
          </div>
          <div style={{marginTop:14,background:`${B.signal}0d`,borderRadius:10,padding:'10px 14px',
            border:`1px solid ${B.signal}20`,fontSize:12,color:B.muted,lineHeight:1.6}}>
            💡 <strong style={{color:B.signal}}>Insight:</strong> Por cada USD 100K importados,
            si el dólar sube $200 COP adicionales, tu empresa paga{' '}
            <strong style={{color:B.signal}}>$ {fmtCOP(100000*200)}</strong> COP extra.
            Con importaciones de $1M USD: <strong style={{color:B.red}}>
              +$ {fmtCOP(1000000*200)} COP</strong> en costos.
          </div>
        </div>
      </div>
    </div>
  );
}

// S2 — NORMATIVA 25 AÑOS / RENGIFO
function S2({ session }) {
  const [sel, setSel] = useState(null);
  const TC = {reforma:B.data, tlc:B.signal, mod:B.neural, tech:B.pulse, politica:B.yellow, sancion:B.red, futuro:B.gold};

  return (
    <div>
      <SpeakerBig session={session}/>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:18}}>
        {[['25','Años de régimen aduanero'],['16','TLCs vigentes en 2026'],['2.300+','Artículos normativos'],['4','Reformas integrales']].map(([v,l])=>(
          <div key={l} style={{flex:1,minWidth:120,background:B.deep,borderRadius:12,
            padding:'14px 16px',border:`1px solid ${B.neural}28`,textAlign:'center'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:28,fontWeight:700,color:B.neural}}>{v}</div>
            <div style={{fontSize:11,color:B.muted,marginTop:5,lineHeight:1.3}}>{l}</div>
          </div>
        ))}
      </div>

      <SLabel text="Hitos del comercio exterior colombiano · 2000–2026" color={session.accent}/>
      <div style={{overflowX:'auto',paddingBottom:8,marginBottom:12}}>
        <div style={{display:'flex',gap:0,minWidth:900,position:'relative'}}>
          <div style={{position:'absolute',top:20,left:20,right:20,height:1,
            background:`linear-gradient(90deg,${B.neural}00,${B.neural}55,${B.data}55,${B.signal}00)`}}/>
          {TIMELINE.map((ev,i)=>{
            const c = TC[ev.type]||B.muted;
            const active = sel===i;
            return (
              <div key={ev.year} onClick={()=>setSel(active?null:i)}
                style={{flex:1,minWidth:82,display:'flex',flexDirection:'column',
                  alignItems:'center',cursor:'pointer',userSelect:'none',position:'relative'}}>
                <div style={{width:18,height:18,borderRadius:'50%',
                  background:active?c:`${c}22`,border:`2px solid ${c}`,
                  zIndex:1,marginBottom:8,flexShrink:0,transition:'all .2s',
                  boxShadow:active?`0 0 14px ${c}`:'none'}}/>
                <div style={{fontSize:10,fontFamily:'JetBrains Mono, monospace',color:c,marginBottom:3}}>{ev.year}</div>
                <div style={{fontSize:9,textAlign:'center',color:active?B.text:B.muted,
                  lineHeight:1.3,padding:'0 3px'}}>{ev.title.replace('🔥 ','')}</div>
              </div>
            );
          })}
        </div>
      </div>

      {sel!==null?(
        <div style={{background:`${TC[TIMELINE[sel].type]||B.data}12`,borderRadius:12,
          padding:'16px 20px',border:`1px solid ${TC[TIMELINE[sel].type]||B.data}30`,
          animation:'fadeIn .3s ease'}}>
          <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
            <Badge label={TIMELINE[sel].year} color={TC[TIMELINE[sel].type]||B.data}/>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,marginBottom:6}}>
                {TIMELINE[sel].title}
              </div>
              <div style={{fontSize:13,color:B.muted,lineHeight:1.7}}>{TIMELINE[sel].desc}</div>
            </div>
          </div>
        </div>
      ):(
        <div style={{textAlign:'center',fontSize:12,color:B.muted,padding:12,
          background:`${B.deep}88`,borderRadius:10,border:`1px solid ${B.border}`}}>
          👆 Toca cualquier año del timeline para ver el detalle histórico
        </div>
      )}

      <div style={{marginTop:16,background:`${B.neural}0d`,borderRadius:12,padding:'14px 18px',
        border:`1px solid ${B.neural}25`}}>
        <SLabel text="¿Qué significa 25 años de normativa para tu operación?" color={B.neural}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {title:'TLCs sin aprovechar',desc:'Colombia tiene 16 acuerdos. La mayoría de importadores activos solo usa 3-4. Hay arancel 0% que nadie solicita.',icon:'📋'},
            {title:'Estabilidad vs reforma',desc:'Cada cambio normativo genera incertidumbre operativa. El decreto 2024 tomó por sorpresa a miles de operadores.',icon:'⚖️'},
            {title:'Armonización OMA',desc:'El estándar SAFE de la OMA es la dirección global. Colombia lleva 7 años en proceso de alineación parcial.',icon:'🌐'},
            {title:'Digitalización pendiente',desc:'MUISCA 2.0 avanza pero la interoperabilidad con puertos sigue siendo el cuello de botella del comercio.',icon:'💻'},
          ].map(({title,desc,icon})=>(
            <div key={title} style={{background:B.deep,borderRadius:10,padding:'12px 14px',
              border:`1px solid ${B.border}`}}>
              <div style={{fontSize:16,marginBottom:6}}>{icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,marginBottom:5}}>{title}</div>
              <div style={{fontSize:11,color:B.muted,lineHeight:1.5}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// S3 — PANEL LATAM
function S3({ session }) {
  const countries = [
    {code:'col',label:'🇨🇴 Colombia',color:B.yellow},
    {code:'chi',label:'🇨🇱 Chile',   color:B.data},
    {code:'mex',label:'🇲🇽 México',  color:B.signal},
  ];
  return (
    <div>
      <div style={{display:'flex',gap:10,marginBottom:18,flexWrap:'wrap'}}>
        {countries.map(c=>(
          <div key={c.code} style={{flex:1,minWidth:160,background:`${c.color}12`,borderRadius:14,
            padding:'14px 18px',border:`1px solid ${c.color}30`,textAlign:'center'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:28}}>{c.label.split(' ')[0]}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,marginTop:6}}>{c.label.substring(3)}</div>
            <div style={{fontSize:11,color:B.muted,marginTop:4}}>
              {c.code==='col'&&'Reforma 2024 · Polémica'}
              {c.code==='chi'&&'Sistema más garantista'}
              {c.code==='mex'&&'Mayor prescripción · 5 años'}
            </div>
          </div>
        ))}
      </div>

      <SLabel text="Comparativo régimen sancionatorio aduanero" color={session.accent}/>
      <div style={{overflowX:'auto',marginBottom:16}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:580}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${B.border2}`}}>
              <th style={{textAlign:'left',padding:'10px 14px',fontSize:11,
                color:B.muted,fontWeight:500,fontFamily:'DM Sans, sans-serif'}}>Aspecto</th>
              {countries.map(c=>(
                <th key={c.code} style={{textAlign:'center',padding:'10px 14px',
                  fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:c.color}}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SANCION.map((row,i)=>(
              <tr key={row.asp} style={{background:i%2===0?`${B.deep}88`:'transparent'}}>
                <td style={{padding:'10px 14px',fontSize:12,color:B.muted}}>{row.asp}</td>
                {countries.map(c=>(
                  <td key={c.code} style={{padding:'10px 14px',textAlign:'center',
                    fontSize:12,fontFamily:'DM Sans, sans-serif',
                    color:row.w===c.code?B.signal:row.w==='tie'?B.yellow:B.muted,
                    fontWeight:row.w===c.code?600:400}}>
                    {row[c.code]}
                    {row.w===c.code&&<span style={{marginLeft:5,fontSize:10,
                      background:`${B.signal}22`,borderRadius:99,padding:'1px 5px',color:B.signal}}>✓ mejor</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SLabel text="Semáforo de riesgo para tu empresa" color={session.accent}/>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:14}}>
        {[
          {tipo:'PYME importadora',      col:['Alto 🔴',  'Bajo 🟢',   'Medio 🟡'], cs:[B.red,B.signal,B.yellow]},
          {tipo:'Empresa mediana',        col:['Medio 🟡', 'Bajo 🟢',   'Bajo 🟢'],  cs:[B.yellow,B.signal,B.signal]},
          {tipo:'Operador OEA',           col:['Bajo 🟢',  'Bajo 🟢',   'Bajo 🟢'],  cs:[B.signal,B.signal,B.signal]},
        ].map(({tipo,col,cs})=>(
          <div key={tipo} style={{flex:1,minWidth:180,background:B.deep,borderRadius:12,
            padding:'14px 16px',border:`1px solid ${B.border}`}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,
              marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${B.border}`}}>{tipo}</div>
            {countries.map((c,ci)=>(
              <div key={c.code} style={{display:'flex',justifyContent:'space-between',
                marginBottom:6,fontSize:12}}>
                <span style={{color:B.muted}}>{c.label}</span>
                <span style={{color:cs[ci],fontWeight:600}}>{col[ci]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{background:`${session.accent}0d`,borderRadius:12,padding:'14px 18px',
        border:`1px solid ${session.accent}25`,fontSize:13,color:B.muted,lineHeight:1.7}}>
        <strong style={{color:session.accent}}>💡 Insight Branex · </strong>
        Colombia tiene la reforma más reciente (2024) y la más polémica. Chile tiene el sistema
        más garantista con tribunales independientes especializados. México tiene el mayor riesgo
        temporal: 5 años de prescripción. Si operás en los 3 mercados, el cumplimiento diferencial
        es tu mayor riesgo legal del año.
      </div>
    </div>
  );
}

// S4 — PANEL PARLAMENTARIO
function S4({ session }) {
  const [filterAlerta, setFilterAlerta] = useState(false);
  const shown = filterAlerta ? PROYECTOS.filter(p=>p.alerta) : PROYECTOS;

  return (
    <div>
      <SpeakerBig session={session}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:8}}>
        <SLabel text="proyectos de ley activos · afectan tu operación" color={session.accent}/>
        <button onClick={()=>setFilterAlerta(!filterAlerta)}
          style={{background:filterAlerta?`${B.red}20`:`${B.deep}`,
            border:`1px solid ${filterAlerta?B.red:B.border2}`,borderRadius:8,
            padding:'6px 14px',color:filterAlerta?B.red:B.muted,
            fontSize:11,cursor:'pointer',fontFamily:'DM Sans, sans-serif'}}>
          {filterAlerta?'Ver todos':'🚨 Solo alertas'}
        </button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:10,marginBottom:16}}>
        {shown.map(p=>(
          <div key={p.cod} style={{background:B.deep,borderRadius:12,padding:16,
            border:`1px solid ${p.alerta?B.red+'30':B.border}`}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:4}}>
              <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,
                color:p.alerta?B.red:B.muted}}>{p.cod}</span>
              <div style={{display:'flex',gap:6}}>
                {p.alerta&&<Badge label="ALERTA" color={B.red}/>}
                <Badge label={p.estado} color={p.alerta?B.red:B.faint}/>
              </div>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,
              lineHeight:1.3,marginBottom:8}}>{p.titulo}</div>
            <div style={{fontSize:12,color:B.muted,lineHeight:1.5,marginBottom:8}}>{p.impacto}</div>
            <div style={{fontSize:10,color:B.faint,fontFamily:'JetBrains Mono, monospace'}}>{p.comision}</div>
          </div>
        ))}
      </div>

      <div style={{background:`${B.red}10`,borderRadius:12,padding:'14px 18px',
        border:`1px solid ${B.red}25`,marginBottom:14}}>
        <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:B.red,
          letterSpacing:'0.12em',marginBottom:8}}>// ALERTA MÁXIMA · PL 045/2026</div>
        <div style={{fontSize:13,color:B.muted,lineHeight:1.7}}>
          <strong style={{color:B.text}}>PL 045/2026 — Solvencia Económica Importadores:</strong>{' '}
          Nuevos requisitos de capital podrían excluir a PYMEs sin respaldo financiero suficiente.
          Consulta con tu agencia de aduanas <strong style={{color:B.red}}>antes de julio 2026</strong>.
        </div>
      </div>

      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        {[
          {label:'Comisión Tercera',  tema:'Hacienda y crédito público · Política macroeconómica', n:3, color:B.data},
          {label:'Comisión Sexta',    tema:'Comercio exterior · Turismo · Integración económica',   n:2, color:B.signal},
          {label:'Comisión Segunda',  tema:'Política exterior · Tratados · Comercio internacional', n:1, color:B.neural},
        ].map(({label,tema,n,color})=>(
          <div key={label} style={{flex:1,minWidth:200,background:B.deep,borderRadius:12,
            padding:'14px 16px',border:`1px solid ${color}25`,display:'flex',gap:14,alignItems:'center'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:28,fontWeight:700,color}}>{n}</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13}}>{label}</div>
              <div style={{fontSize:10,color:B.muted,marginTop:4,lineHeight:1.4}}>{tema}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// S5 — ELECCIONES / BOTERO
function S5({ session, trm }) {
  const [sc, setSc] = useState(null);
  const liveTRM = trm || 4271;
  const hoy = new Date('2026-03-26');
  const ev  = new Date('2026-05-31');
  const dias = Math.floor((ev-hoy)/86400000);

  const scenarios = [
    {id:'A',icon:'⚠️',label:'Continuidad',   trmMin:4500,trmMax:5400,
      color:B.red,  nota:'Revisión TLCs · control cambiario · presión sobre manufactura',   riesgo:'ALTO'},
    {id:'B',icon:'📈',label:'Centroderecha', trmMin:3800,trmMax:4400,
      color:B.signal,nota:'Pro libre mercado · profundización TLCs · peso apreciado',       riesgo:'BAJO'},
    {id:'C',icon:'⚖️',label:'Tercera Vía',   trmMin:4100,trmMax:4700,
      color:B.pulse, nota:'Pragmatismo económico · ajustes sectoriales graduales',           riesgo:'MEDIO'},
  ];
  const sel = scenarios.find(x=>x.id===sc);

  return (
    <div>
      <SpeakerBig session={session}/>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:18}}>
        <div style={{flex:1,minWidth:200,background:`${B.pulse}12`,borderRadius:14,
          border:`1px solid ${B.pulse}30`,padding:'16px 20px',display:'flex',alignItems:'center',gap:20}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:52,fontWeight:700,
              color:B.pulse,lineHeight:1}}>{dias}</div>
            <div style={{fontSize:11,color:B.muted,marginTop:4}}>días para primera vuelta</div>
            <div style={{fontSize:10,color:B.pulse,marginTop:3,fontFamily:'JetBrains Mono, monospace'}}>
              ~31 Mayo 2026 (estimado)
            </div>
          </div>
          <div style={{fontSize:12,color:B.muted,lineHeight:1.7,flex:1}}>
            El resultado electoral es el <strong style={{color:B.text}}>mayor factor de riesgo macroeconómico</strong>{' '}
            para la TRM en los próximos 18 meses. Cada escenario político implica una política
            comercial <strong style={{color:B.pulse}}>radicalmente distinta.</strong>
          </div>
        </div>
      </div>

      <SLabel text="Simulador de escenarios electorales — impacto directo en tu operación" color={session.accent}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10,marginBottom:14}}>
        {scenarios.map(s=>(
          <div key={s.id} onClick={()=>setSc(sc===s.id?null:s.id)}
            style={{cursor:'pointer',userSelect:'none',background:sc===s.id?`${s.color}18`:B.deep,
              borderRadius:14,padding:18,border:`${sc===s.id?2:1}px solid ${sc===s.id?s.color:s.color+'35'}`,
              transition:'all .2s',transform:sc===s.id?'scale(1.02)':'scale(1)'}}>
            <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,marginBottom:8}}>{s.label}</div>
            <div style={{marginBottom:10}}>
              <Badge label={`TRM ${s.trmMin.toLocaleString('es-CO')}–${s.trmMax.toLocaleString('es-CO')}`} color={s.color}/>
            </div>
            <div style={{marginBottom:8}}>
              <Badge label={`Riesgo ${s.riesgo}`} color={s.color}/>
            </div>
            <div style={{fontSize:11,color:B.muted,lineHeight:1.5,marginTop:8}}>{s.nota}</div>
          </div>
        ))}
      </div>

      {sel?(
        <div style={{background:`${sel.color}12`,borderRadius:12,padding:'16px 20px',
          border:`1px solid ${sel.color}35`,animation:'fadeIn .3s ease'}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,
            marginBottom:12,color:sel.color}}>📊 Impacto en tu operación — Escenario {sel.label}</div>
          <div style={{display:'flex',gap:20,flexWrap:'wrap',marginBottom:12}}>
            {[
              {label:'TRM mínima esperada', val:`$${sel.trmMin.toLocaleString('es-CO')}`, impact:(((sel.trmMin-liveTRM)/liveTRM)*100).toFixed(1)},
              {label:'TRM máxima esperada', val:`$${sel.trmMax.toLocaleString('es-CO')}`, impact:(((sel.trmMax-liveTRM)/liveTRM)*100).toFixed(1)},
            ].map(({label,val,impact})=>(
              <div key={label} style={{textAlign:'center'}}>
                <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:24,color:sel.color,fontWeight:700}}>{val}</div>
                <div style={{fontSize:12,color:B.muted,marginTop:3}}>{label}</div>
                <div style={{fontSize:12,marginTop:3,
                  color:parseFloat(impact)>0?B.red:B.signal,fontFamily:'JetBrains Mono, monospace'}}>
                  {parseFloat(impact)>0?'+':''}{impact}% vs hoy
                </div>
              </div>
            ))}
          </div>
          <div style={{fontSize:12,color:B.muted,lineHeight:1.7,padding:'10px 0',
            borderTop:`1px solid ${sel.color}25`}}>
            <strong style={{color:B.text}}>¿Qué hacer?</strong>{' '}
            {sel.id==='A'&&'Considera forward de dólares, diversificar proveedores, y revisar contratos con cláusulas de ajuste TRM.'}
            {sel.id==='B'&&'Oportunidad para importar capital y tecnología. El peso apreciado reduce costos nominales de importación.'}
            {sel.id==='C'&&'Estrategia mixta: mantener cobertura cambiaria parcial y monitorear anuncios sectoriales del nuevo gobierno.'}
          </div>
        </div>
      ):(
        <div style={{textAlign:'center',padding:14,background:`${B.deep}88`,borderRadius:10,
          border:`1px solid ${B.border}`,fontSize:12,color:B.muted}}>
          Selecciona un escenario para ver el impacto calculado en tus costos
        </div>
      )}
    </div>
  );
}

// S6 — SOLVENCIA + IDI™
function S6({ session, trm }) {
  const [cap,  setCap]  = useState(500000000);
  const [act,  setAct]  = useState(2000000000);
  const [pas,  setPas]  = useState(800000000);
  const [aran, setAran] = useState(11.4);
  const [dias, setDias] = useState(9);
  const liveTRM = trm||4271;

  const pat  = act-pas;
  const ratio= act/pas;
  const SMMLV2026 = 1423500; // estimado 2026
  const MIN_CAP   = SMMLV2026 * 100;
  const c1 = cap  >= MIN_CAP;
  const c2 = ratio>= 1.5;
  const c3 = pat  >= MIN_CAP;
  const score = [c1,c2,c3].filter(Boolean).length;
  const sColors = [B.red, B.yellow, B.yellow, B.signal];
  const sLabels = ['Crítico — No cumple requisitos','Riesgo alto','Requiere atención','Cumple requisitos DIAN'];

  // IDI™
  const trmFactor   = Math.min(((liveTRM/3700)-1)*40, 40);
  const aranFactor  = Math.min((aran/20)*35, 35);
  const diasFactor  = Math.min(((dias/5)-1)*25, 25);
  const idi = Math.max(0, Math.min(100, Math.round(trmFactor+aranFactor+diasFactor)));
  const idiC = idi<35?B.signal:idi<65?B.yellow:B.red;
  const idiL = idi<35?'Dolor Bajo':'Dolor Moderado';

  return (
    <div>
      <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:16}}>

        {/* SOLVENCIA */}
        <div style={{flex:1,minWidth:280,background:B.deep,borderRadius:14,padding:20,
          border:`1px solid ${B.signal}28`}}>
          <SLabel text="Calculadora solvencia económica · DIAN" color={B.signal}/>
          {[
            {label:'Capital suscrito y pagado',  val:cap,  set:setCap,  max:5000000000},
            {label:'Activos totales',             val:act,  set:setAct,  max:20000000000},
            {label:'Pasivos totales',             val:pas,  set:setPas,  max:10000000000},
          ].map(({label,val,set,max})=>(
            <div key={label} style={{marginBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                <label style={{fontSize:11,color:B.muted}}>{label}</label>
                <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,color:B.text}}>
                  $ {fmtCOP(val)}
                </span>
              </div>
              <input type="range" min={0} max={max} step={max/100} value={val}
                onChange={e=>set(+e.target.value)}
                style={{width:'100%',accentColor:B.signal,cursor:'pointer'}}/>
            </div>
          ))}
          {[
            {label:`Capital ≥ 100 SMMLV (~$${fmtCOP(MIN_CAP)})`, ok:c1, val:`$ ${fmtCOP(cap)}`},
            {label:'Activos/Pasivos ≥ 1.5',                        ok:c2, val:ratio.toFixed(2)},
            {label:`Patrimonio ≥ 100 SMMLV`,                       ok:c3, val:`$ ${fmtCOP(pat)}`},
          ].map(r=>(
            <div key={r.label} style={{display:'flex',justifyContent:'space-between',
              alignItems:'center',padding:'9px 12px',
              background:`${r.ok?B.signal:B.red}10`,borderRadius:8,marginBottom:6,
              border:`1px solid ${r.ok?B.signal:B.red}22`}}>
              <span style={{fontSize:11,color:r.ok?B.signal:B.red}}>
                {r.ok?'✓':'✗'} {r.label}
              </span>
              <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,
                color:r.ok?B.signal:B.red,fontWeight:600}}>{r.val}</span>
            </div>
          ))}
          <div style={{marginTop:12,textAlign:'center',
            background:`${sColors[score]}18`,borderRadius:10,padding:'14px',
            border:`1px solid ${sColors[score]}35`}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:36,
              color:sColors[score],fontWeight:700}}>{score}/3</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,
              color:sColors[score],marginTop:4}}>{sLabels[score]}</div>
          </div>
        </div>

        {/* IDI™ */}
        <div style={{flex:1,minWidth:280,background:B.deep,borderRadius:14,padding:20,
          border:`1px solid ${B.neural}28`}}>
          <SLabel text="IDI™ — Índice de Dolor Importador · Branex Analytics Lab" color={B.neural}/>

          {/* Gauge */}
          <div style={{textAlign:'center',margin:'0 0 16px'}}>
            <svg width="200" height="110" viewBox="0 0 200 110">
              <defs>
                <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor={B.signal}/>
                  <stop offset="50%"  stopColor={B.yellow}/>
                  <stop offset="100%" stopColor={B.red}/>
                </linearGradient>
              </defs>
              <path d="M 24 96 A 76 76 0 0 1 176 96" fill="none"
                stroke={`${B.border2}`} strokeWidth="16" strokeLinecap="round"/>
              <path d="M 24 96 A 76 76 0 0 1 176 96" fill="none"
                stroke="url(#gaugeG)" strokeWidth="16" strokeLinecap="round"
                strokeDasharray={`${(idi/100)*239} 239`}/>
              <text x="100" y="80" textAnchor="middle" fill={idiC}
                fontFamily="JetBrains Mono, monospace" fontSize="30" fontWeight="700">{idi}</text>
              <text x="100" y="98" textAnchor="middle" fill={B.muted}
                fontFamily="DM Sans, sans-serif" fontSize="11">/100</text>
            </svg>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:idiC,marginTop:-6}}>
              {idiL}
            </div>
          </div>

          {[
            {label:'Factor TRM', desc:`$${liveTRM.toLocaleString('es-CO')} vs base $3.700`,     val:trmFactor,  max:40, color:B.data},
            {label:'Factor Arancel', desc:`${aran.toFixed(1)}% promedio — ingresa el tuyo`,      val:aranFactor, max:35, color:B.yellow},
            {label:'Factor Tiempo', desc:`${dias} días despacho vs 5 días estándar OMA`,         val:diasFactor, max:25, color:B.neural},
          ].map(({label,desc,val,max,color})=>(
            <div key={label} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <div>
                  <div style={{fontSize:12,color:B.text}}>{label}</div>
                  <div style={{fontSize:10,color:B.muted}}>{desc}</div>
                </div>
                <span style={{fontFamily:'JetBrains Mono, monospace',color,fontSize:14,fontWeight:700}}>
                  {val.toFixed(1)}
                </span>
              </div>
              <div style={{height:5,background:B.void,borderRadius:99}}>
                <div style={{width:`${Math.min((val/max)*100,100)}%`,height:'100%',
                  background:`linear-gradient(90deg,${color},${B.pulse})`,borderRadius:99,
                  transition:'width .4s ease'}}/>
              </div>
            </div>
          ))}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
            <div>
              <div style={{fontSize:10,color:B.muted,marginBottom:4}}>Arancel prom. real (%)</div>
              <input type="range" min={0} max={25} step={0.5} value={aran}
                onChange={e=>setAran(+e.target.value)}
                style={{width:'100%',accentColor:B.neural,cursor:'pointer'}}/>
              <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:12,color:B.neural,marginTop:2}}>{aran.toFixed(1)}%</div>
            </div>
            <div>
              <div style={{fontSize:10,color:B.muted,marginBottom:4}}>Días de despacho</div>
              <input type="range" min={3} max={20} step={1} value={dias}
                onChange={e=>setDias(+e.target.value)}
                style={{width:'100%',accentColor:B.neural,cursor:'pointer'}}/>
              <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:12,color:B.neural,marginTop:2}}>{dias} días</div>
            </div>
          </div>
          <div style={{marginTop:10,fontSize:9,color:B.muted,fontFamily:'JetBrains Mono, monospace',textAlign:'center'}}>
            // metodología propietaria · Branex Analytics Lab™ · No es asesoría financiera
          </div>
        </div>
      </div>

      {/* CTA BRANEX */}
      <div style={{background:`linear-gradient(135deg,${B.signal}18,${B.neural}12)`,
        borderRadius:16,padding:'22px 24px',
        border:`1px solid ${B.signal}35`,
        display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
          <BranexLogo size={40}/>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,letterSpacing:'0.08em',color:B.signal}}>
              BRANEX
            </div>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:B.muted}}>
              Inteligencia visual para empresas
            </div>
          </div>
        </div>
        <div style={{flex:1,minWidth:240}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,marginBottom:6}}>
            ¿Tu empresa tiene datos sin inteligencia?
          </div>
          <div style={{fontSize:13,color:B.muted,lineHeight:1.6}}>
            Diseñamos dashboards empresariales con IA que convierten tus datos operativos
            en decisiones en tiempo real. Entregas en 1-2 semanas. Diagnóstico gratuito 30 min.
          </div>
        </div>
        <div style={{flexShrink:0,display:'flex',flexDirection:'column',gap:8,alignItems:'center'}}>
          <a href="https://wa.me/573008074984" target="_blank" rel="noreferrer"
            style={{background:`linear-gradient(135deg,${B.signal},${B.data})`,
              color:B.void,padding:'12px 28px',borderRadius:10,
              fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,
              textDecoration:'none',display:'block',textAlign:'center',letterSpacing:'0.05em'}}>
            📲 Habla con nosotros
          </a>
          <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:B.muted}}>
            dashboards.branex@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TICKER ──────────────────────────────────────────────
function Ticker({ trm, brent }) {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(()=>{
    const t = setInterval(()=>{
      setVis(false);
      setTimeout(()=>{ setIdx(i=>(i+1)%INSIGHTS.length); setVis(true); }, 400);
    }, 12000);
    return ()=>clearInterval(t);
  },[]);

  const liveTRM   = trm || 4271;
  const liveBrent = brent ? brent.toFixed(2) : '72.40*';
  const trmColor  = liveTRM>4500?B.red:liveTRM>4300?B.yellow:B.signal;

  return (
    <div style={{background:`${B.void}ee`,backdropFilter:'blur(18px)',
      borderTop:`1px solid ${B.border2}`,
      display:'flex',alignItems:'center',flexShrink:0,zIndex:100,overflow:'hidden',
      minHeight:44}}>
      {[
        {key:'TRM',   val:`$${liveTRM.toLocaleString('es-CO',{maximumFractionDigits:0})}`, sub:'COP/USD', color:trmColor, live:!!trm},
        {key:'BRENT', val:`$${liveBrent}`,                                                  sub:'USD/bbl', color:B.pulse,  live:!!brent},
        {key:'DÉFICIT 2025', val:'-$16.4B',                                                sub:'USD',     color:B.red,    live:false},
        {key:'IMPORTACIONES',val:'$70.5B',                                                 sub:'2025',    color:B.data,   live:false},
      ].map(({key,val,sub,color,live})=>(
        <div key={key} style={{display:'flex',alignItems:'center',gap:8,
          padding:'0 16px',borderRight:`1px solid ${B.border}`,flexShrink:0,height:44}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:9,color:B.muted,
              letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:2}}>{key}</div>
            <div style={{display:'flex',alignItems:'center',gap:5}}>
              <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:14,fontWeight:700,color}}>{val}</span>
              <span style={{fontSize:9,color:B.muted}}>{sub}</span>
              {live&&<span style={{width:5,height:5,borderRadius:'50%',background:B.signal,
                animation:'pulse 2s infinite',display:'inline-block'}}/>}
            </div>
          </div>
        </div>
      ))}
      <div style={{flex:1,padding:'0 16px',overflow:'hidden',height:44,display:'flex',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <BranexLogo size={14}/>
          <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:9,
            color:B.neural,letterSpacing:'0.1em',flexShrink:0}}>BRANEX AI //</span>
          <span style={{fontSize:11,color:B.muted,opacity:vis?1:0,transition:'opacity .4s',
            whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
            {INSIGHTS[idx]}
          </span>
        </div>
      </div>
      <div style={{padding:'0 16px',borderLeft:`1px solid ${B.border}`,
        fontFamily:'JetBrains Mono, monospace',fontSize:9,color:B.signal,
        letterSpacing:'0.1em',flexShrink:0,height:44,display:'flex',alignItems:'center'}}>
        branex.co ✦
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [active, setActive]  = useState(0);
  const [trm,    setTrm]     = useState(null);
  const [brent,  setBrent]   = useState(null);
  const [loaded, setLoaded]  = useState(false);
  const [prev,   setPrev]    = useState(0);

  useEffect(()=>{
    setTimeout(()=>setLoaded(true), 80);
    fetchTRM().then(v=>{ if(v) setTrm(v); });
    fetchBrent().then(v=>{ if(v) setBrent(v); });
    const t = setInterval(()=>{
      fetchTRM().then(v=>{ if(v) setTrm(v); });
    }, 5*60*1000);
    return ()=>clearInterval(t);
  },[]);

  const switchSession = (id) => {
    setPrev(active);
    setActive(id);
  };

  const session = SESSIONS[active];
  const MODULES = [S0,S1,S2,S3,S4,S5,S6];
  const Module  = MODULES[active];

  return (
    <div style={{minHeight:'100vh',background:B.void,display:'flex',flexDirection:'column',
      opacity:loaded?1:0,transition:'opacity .7s',position:'relative'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html,body { background:${B.void}; color:#fff; font-family:'DM Sans',sans-serif; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:${B.deep}; }
        ::-webkit-scrollbar-thumb { background:${B.signal}44; border-radius:99px; }
        ::-webkit-scrollbar-thumb:hover { background:${B.signal}88; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        input[type=range] { cursor:pointer; }
        select, input { color-scheme:dark; }
        a { transition:all .2s; }
        a:hover { filter:brightness(1.15); }
      `}</style>

      <NeuralBg/>

      {/* Session accent glow */}
      <div style={{position:'fixed',top:'35%',left:'50%',transform:'translate(-50%,-50%)',
        width:800,height:500,borderRadius:'50%',pointerEvents:'none',zIndex:0,
        background:`radial-gradient(ellipse,${session.accent}07 0%,transparent 70%)`,
        transition:'background .6s'}}/>

      {/* ── HEADER ── */}
      <div style={{position:'sticky',top:0,zIndex:50,
        background:`${B.void}ec`,backdropFilter:'blur(22px)',
        borderBottom:`1px solid ${B.border2}`}}>

        {/* Top bar */}
        <div style={{display:'flex',alignItems:'center',gap:14,padding:'10px 20px',flexWrap:'wrap'}}>
          <AnaldexLogo height={28}/>
          <div style={{color:B.faint,fontSize:18,fontWeight:200}}>×</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <BranexLogo size={24}/>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,
              letterSpacing:'0.12em',color:B.signal}}>BRANEX</span>
          </div>
          <div style={{flex:1}}/>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:B.text}}>
              War Room del Importador
            </div>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:B.muted,marginTop:1}}>
              XVI Foro Nacional · Country Club Ejecutivos Medellín · 26 Mar 2026
            </div>
          </div>
        </div>

        {/* Session tabs */}
        <div style={{display:'flex',gap:3,overflowX:'auto',padding:'0 20px 10px',
          scrollbarWidth:'none'}}>
          {SESSIONS.map(s=>(
            <button key={s.id} onClick={()=>switchSession(s.id)}
              style={{flexShrink:0,padding:'7px 14px',borderRadius:8,border:'none',
                cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,
                background:active===s.id?s.accent:B.deep,
                color:active===s.id?B.void:B.muted,
                boxShadow:active===s.id?`0 0 16px ${s.accent}55`:'none',
                transition:'all .2s'}}>
              <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:9,
                marginRight:5,opacity:.8}}>{s.time}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{flex:1,padding:'22px 20px',maxWidth:1240,margin:'0 auto',
        width:'100%',position:'relative',zIndex:1}}>
        <div key={active} style={{animation:'fadeIn .4s cubic-bezier(0.34,1.2,0.64,1)'}}>
          {/* Session header */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20,flexWrap:'wrap'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:20,fontWeight:700,
              color:session.accent}}>{session.time}</div>
            <div style={{width:2,height:24,background:session.accent,borderRadius:99}}/>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800}}>{session.label}</div>
            <div style={{flex:1}}/>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:B.muted}}>
              // session_{String(active).padStart(2,'0')} · XVI Foro Importadores 2026
            </div>
          </div>
          <Module session={session} trm={trm} brent={brent} active={loaded}/>
        </div>

        {/* Footer */}
        <div style={{marginTop:36,paddingTop:16,borderTop:`1px solid ${B.border}`,
          display:'flex',justifyContent:'space-between',alignItems:'center',
          flexWrap:'wrap',gap:8}}>
          <div style={{fontSize:10,color:B.muted,fontFamily:'JetBrains Mono, monospace'}}>
            // XVI Foro Nacional de Importadores · Analdex · Medellín 26 Mar 2026
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <BranexLogo size={16}/>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:12,color:B.signal}}>BRANEX</span>
            <span style={{fontSize:11,color:B.muted}}>· Donde los datos se convierten en decisiones.</span>
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <Ticker trm={trm} brent={brent}/>
    </div>
  );
}
