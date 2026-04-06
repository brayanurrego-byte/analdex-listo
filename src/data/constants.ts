import { Session, TimelineEvent, SancionComparison, ProyectoLey, TRMData } from '@/types'

export const SESSIONS: Session[] = [
  { id: 0, time: '8:30', label: 'Instalación', accent: '#00D4AA', speaker: 'Javier Díaz Molina', org: 'Presidente · Analdex', photo: '/speakers/javier.jpg', initials: 'JD' },
  { id: 1, time: '9:15', label: 'Panorama 2026', accent: '#0984E3', speaker: 'David Cubides', org: 'Economista Jefe · Banco de Occidente', photo: '/speakers/david.jpg', initials: 'DC' },
  { id: 2, time: '9:50', label: 'Normativa 25 Años', accent: '#6C5CE7', speaker: 'Diego Rengifo García', org: 'VP Técnico · Analdex', photo: '/speakers/diego.jpg', initials: 'DR' },
  { id: 3, time: '11:00', label: 'Panel LatAm', accent: '#FECA57', speaker: 'Chile · México · Colombia', org: 'Régimen Sancionatorio Comparado', photo: null, initials: '🌎' },
  { id: 4, time: '14:00', label: 'Parlamentario', accent: '#FF6B6B', speaker: 'Panel de Senadores', org: 'Proyectos de ley activos', photo: null, initials: '🏛' },
  { id: 5, time: '15:00', label: 'Elecciones 2026', accent: '#00CEFF', speaker: 'Jesús Alonso Botero', org: 'Profesor Emérito · EAFIT', photo: '/speakers/jesus.jpg', initials: 'JB' },
  { id: 6, time: '16:00', label: 'Solvencia', accent: '#00D4AA', speaker: 'Panel Empresarial', org: 'Solvencia Económica · IDI™ Branex', photo: null, initials: '⚖' },
]

export const TRM_HIST: TRMData[] = [
  { m: 'E25', v: 4280 }, { m: 'F25', v: 4190 }, { m: 'M25', v: 4050 }, { m: 'A25', v: 4120 },
  { m: 'M25', v: 4080 }, { m: 'J25', v: 4200 }, { m: 'J25', v: 4310 }, { m: 'A25', v: 4260 },
  { m: 'S25', v: 4180 }, { m: 'O25', v: 4090 }, { m: 'N25', v: 4150 }, { m: 'D25', v: 4270 },
  { m: 'E26', v: 4380 }, { m: 'F26', v: 4250 }, { m: 'M26', v: 4271 },
]

export const TIMELINE: TimelineEvent[] = [
  { year: '2000', title: 'Decreto 2685', desc: 'El Estatuto Aduanero original — la constitución del comercio exterior colombiano. Rigió 16 años ininterrumpidos.', type: 'reforma' },
  { year: '2007', title: 'TLC EFTA', desc: 'Primer TLC con Europa no-UE: Suiza, Noruega e Islandia. Acceso a industria farmacéutica y tecnológica de primer nivel.', type: 'tlc' },
  { year: '2012', title: 'TLC EE.UU.', desc: 'El tratado de mayor impacto: 330 millones de consumidores con acceso preferencial. Colombia en el mapa global.', type: 'tlc' },
  { year: '2014', title: 'TLC Unión Europea', desc: '500 millones de consumidores. El mayor bloque económico del mundo le abre la puerta a los productos colombianos.', type: 'tlc' },
  { year: '2016', title: 'Decreto 1165', desc: 'Nuevo Estatuto Aduanero — modernización total del régimen. Colombia se alinea con estándares SAFE de la OMA.', type: 'reforma' },
  { year: '2019', title: 'OEA Colombia', desc: 'Operadores Económicos Autorizados. Las empresas con buen historial obtienen trato preferencial en aduanas.', type: 'mod' },
  { year: '2021', title: 'DIAN Digital', desc: 'Modernización tecnológica: MUISCA 2.0, declaraciones electrónicas, factura-e. La aduana entra al siglo XXI.', type: 'tech' },
  { year: '2023', title: 'Giro Político', desc: 'Gobierno Petro revisa TLCs y política comercial. Incertidumbre sobre régimen de inversión y apertura comercial.', type: 'politica' },
  { year: '2024', title: '🔥 Decreto Sancionatorio', desc: 'El más polémico de la era reciente. Endurece multas, cambia bases de cálculo. PYMEs en alerta. Debate nacional.', type: 'sancion' },
  { year: '2025', title: 'Declaración Anticipada', desc: 'La DIAN impulsa declaración anticipada obligatoria. Ecosistema aduanero no está listo — debate de implementación.', type: 'reforma' },
  { year: '2026', title: '¿Qué sigue?', desc: 'Este foro. Esta sala. La narrativa del comercio exterior colombiano se escribe con las decisiones que se toman hoy.', type: 'futuro' },
]

export const SANCION: SancionComparison[] = [
  { asp: 'Prescripción sanciones', col: '3 años', chi: '3 años', mex: '5 años', w: 'mex' },
  { asp: 'Base cálculo multa', col: '% valor mercancía', chi: 'UTM (~USD 70)', mex: '% contribución', w: 'chi' },
  { asp: 'Multa máxima importador', col: '200% del valor', chi: '300 UTM', mex: '100% contribución', w: 'mex' },
  { asp: 'Instancia de apelación', col: 'DIAN interno', chi: 'Tribunal Aduanero', mex: 'TFJA independiente', w: 'chi' },
  { asp: 'Habilitación OEA', col: 'Sí (3 años)', chi: 'Sí (2 años)', mex: 'Sí (2 años)', w: 'tie' },
  { asp: 'Reforma más reciente', col: '2024 (Polémica)', chi: '2022 (Gradual)', mex: '2023 (Consenso)', w: 'chi' },
  { asp: 'Recurso preventivo importador', col: 'Limitado', chi: 'Medida cautelar', mex: 'Suspensión prov.', w: 'mex' },
]

export const PROYECTOS: ProyectoLey[] = [
  { cod: 'PL 234/2025', titulo: 'Simplificación de Trámites Aduaneros', estado: 'Segundo debate', impacto: 'Reduce tiempos de despacho de 12 a 5 días hábiles', alerta: false, comision: 'Comisión Tercera' },
  { cod: 'PL 156/2025', titulo: 'Zonas Francas — Nueva Generación', estado: 'Primer debate', impacto: 'Amplía beneficios a empresas de servicios digitales y e-commerce', alerta: false, comision: 'Comisión Sexta' },
  { cod: 'PL 089/2025', titulo: 'Modificación Régimen Sancionatorio', estado: 'En comisión', impacto: 'Busca reducir bases de multas para PYMEs importadoras', alerta: true, comision: 'Comisión Tercera' },
  { cod: 'PL 310/2025', titulo: 'Declaración Anticipada Obligatoria', estado: 'Radicado', impacto: 'Obliga declaración antes de arribo — debate por implementación', alerta: true, comision: 'Comisión Sexta' },
  { cod: 'PL 045/2026', titulo: 'Solvencia Económica Importadores', estado: 'En estudio', impacto: 'Nuevos requisitos de capital — PYMEs en riesgo de exclusión', alerta: true, comision: 'Comisión Tercera' },
  { cod: 'PL 078/2026', titulo: 'Acuerdo Asia-Pacífico', estado: 'Ponencia', impacto: 'Reducción arancelaria con Corea del Sur y Japón', alerta: false, comision: 'Comisión Segunda' },
]

export const INSIGHTS = [
  'China representa el 28.8% de las importaciones colombianas. En 2020 era el 22%. La dependencia crece cada año.',
  'Cada punto de devaluación del peso equivale a ~USD 700M en mayor valor de importaciones en COP.',
  'Colombia tiene 16 TLCs vigentes pero solo aprovecha activamente 4 de ellos para reducir aranceles reales.',
  'El déficit comercial 2025 de USD 16.377M es el más alto en 30 años. Colombia importa 40% más de lo que exporta.',
  'Las manufacturas crecieron 11.7% en importaciones 2025 — señal de reactivación industrial.',
  'Tasa política monetaria: 10.25% desde enero 2026. El costo financiero de importar nunca fue tan alto.',
  'Japón creció 80.2% en diciembre 2025 — el mercado asiático se diversifica más allá de China.',
  'Antioquia es la 2ª región importadora del país. Esta sala mueve miles de millones en comercio anual.',
]
