import { Product, Industry, StatItem } from './types';

export const HERO_SLIDES = [
  {
    image: '/src/assets/images/molten_copper_hero_1779552936229.png',
    tagline: 'BUILT ON TRUST.',
    titleLine1: 'DRIVEN BY',
    titleLine2: 'EXCELLENCE.',
    subtext: 'Midland Cable Manufacture is a globally recognized manufacturer of premium copper products and cables, delivering quality, reliability and performance across the world.',
  },
  {
    image: '/src/assets/images/factory_hq_1779552956267.png',
    tagline: 'STATE-OF-THE-ART MANUFACTURING.',
    titleLine1: 'ENGINEERED',
    titleLine2: 'FOR FUTURE.',
    subtext: 'Operating ultra-modern production plants designed to process electrolytic copper into highest conductivity cables and rods representing world-class quality thresholds.',
  },
  {
    image: '/src/assets/images/copper_rods_1779552976090.png',
    tagline: 'GLOBAL DISTRIBUTION READY.',
    titleLine1: 'PRECISION',
    titleLine2: 'COMMITTED.',
    subtext: 'From bespoke custom specifications to rapid high-volume international distributions, Midland serves forty-plus countries with verified certifications compliance.',
  }
];

export const TRUST_ITEMS = [
  {
    id: 'premium-quality',
    iconName: 'Shield',
    title: 'Premium Quality',
    description: 'Made with high grade copper for superior performance.'
  },
  {
    id: 'advanced-tech',
    iconName: 'Cpu',
    title: 'Advanced Technology',
    description: 'State-of-the-art manufacturing facilities and modern infrastructure.'
  },
  {
    id: 'global-presence',
    iconName: 'Globe',
    title: 'Global Presence',
    description: 'Serving customers in 40+ countries worldwide.'
  },
  {
    id: 'trust-reliability',
    iconName: 'Award',
    title: 'Trust & Reliability',
    description: 'Built on trust, ensuring long-term value and satisfaction.'
  }
];

export const STATS: StatItem[] = [
  {
    id: 'exp',
    iconName: 'Trophy',
    number: '25+',
    label: 'Years of Experience',
    description: 'A legacy of perfection and heavy industrial mastery since 2001.'
  },
  {
    id: 'clients',
    iconName: 'Users',
    number: '500+',
    label: 'Happy Clients',
    description: 'Trusted partner for global power grids and automotive suppliers.'
  },
  {
    id: 'countries',
    iconName: 'Globe',
    number: '40+',
    label: 'Countries Served',
    description: 'Robust supply chains connecting primary industrial zones.'
  },
  {
    id: 'quality',
    iconName: 'Award',
    number: '100%',
    label: 'Quality Assurance',
    description: 'Zero-defect process philosophy with rigorous ultrasound testing.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'copper-rods',
    name: 'COPPER RODS',
    tagline: 'Ultra-pure continuous cast copper rods.',
    description: 'High conductivity copper rods for electrical and industrial applications.',
    longDescription: 'Midland continuous cast copper rods are manufactured using Grade A electrolytic copper cathode. Possessing high electrical conductivity and outstanding mechanical drawing characteristics, they form the cornerstone of premium wire drawing operations.',
    image: '/src/assets/images/copper_rods_1779552976090.png',
    features: [
      'Conductivity exceeding 101% IACS',
      'Extremely low hydrogen and oxygen levels',
      'Smooth, scale-free surface conditioning',
      'High mechanical drawability down to fine gauges'
    ],
    specs: [
      { label: 'Standard Diameter', value: '8.0mm, 12.5mm, 15.0mm' },
      { label: 'Oxygen Content', value: '< 10 ppm' },
      { label: 'Tensile Strength', value: '220 - 250 MPa' },
      { label: 'Compliance', value: 'ASTM B49, BS EN 1977' }
    ],
    alloyGrades: ['C10100 (OFE)', 'C10200 (OF)', 'C11000 (ETP)'],
    applications: ['Wire Drawing', 'Telecom Cables', 'Railway Electrification', 'Automotive Harnesses']
  },
  {
    id: 'copper-wires',
    name: 'COPPER WIRES',
    tagline: 'Flexible, high-tensile wire reels.',
    description: 'Flexible and durable copper wires for electrical and electronic use.',
    longDescription: 'Our drawing mills manufacture single-end and multi-end copper wires down to ultra-fine gauges. Available in bare, tinned, or silver-plated finishes to offer maximum oxidation resistance and premium electrical performance.',
    image: '/src/assets/images/copper_coils_1779552995494.png', // Reusing generated high quality coil wire style
    features: [
      'Precision gauge consistency tolerance within 0.002mm',
      'Superb flexibility and fatigue resistance',
      'Uniform annealing for soft and semi-hard grades',
      'Tarnish-preventing packaging systems'
    ],
    specs: [
      { label: 'Wire Diameters', value: '0.05mm - 4.5mm' },
      { label: 'Elongation', value: '≥ 30% (soft tempered)' },
      { label: 'Electrical Resistivity', value: '≤ 0.01724 Ω·mm²/m' },
      { label: 'Finishes', value: 'Bare, Tinned, Silver-Plated' }
    ],
    alloyGrades: ['C11000 (ETP)', 'C10100 (Oxygen-Free Electrolytic)'],
    applications: ['Electronic Components', 'Power Transmission', 'Flexible Braids', 'Transformers']
  },
  {
    id: 'copper-sheets',
    name: 'COPPER SHEETS',
    tagline: 'Precision rolled plates & architectural sheets.',
    description: 'Premium quality copper sheets for roofing, electrical and decorative use.',
    longDescription: 'Specially cold-rolled and warm-rolled copper plates. These sheets boast impeccable surface uniformity, great thermal dissipation, and corrosion-resistant profiles suitable for industrial heat exchangers, busbars, and architectural cladding.',
    image: 'https://images.unsplash.com/photo-1543088924-f187320b9fac?q=80&w=800', // Unsplash copper metal stock of outstanding aesthetic value
    features: [
      'Superior flat tolerances across heavy dimensions',
      'Excellent weldability and brazing performance',
      'Deep drawing and metal spin formabilities',
      'Exceptional oxidation resistance qualities'
    ],
    specs: [
      { label: 'Thickness Range', value: '0.3mm to 50.0mm' },
      { label: 'Width Options', value: '600mm, 1000mm, 1250mm' },
      { label: 'Hardness Temper', value: 'O, H01, H02, H04' },
      { label: 'Surface Finish', value: 'Mill finish, Polished, Brushed' }
    ],
    alloyGrades: ['C11000', 'C12200 (DHP Phosphorized)', 'C10200'],
    applications: ['Busbars & Switchgear', 'Industrial Boiler Gaskets', 'Architectural Facades', 'Grounding Systems']
  },
  {
    id: 'copper-tubes',
    name: 'COPPER TUBES',
    tagline: 'Seamless architectural & HVAC tubes.',
    description: 'Seamless copper tubes for plumbing, HVAC and industrial applications.',
    longDescription: 'Deoxidized high-phosphorus (DHP) copper tubes designed for heat exchange, HVAC, medical gas, and premium plumbing networks. Features perfectly circular concentric interiors to avoid liquid stagnation and secure leak-free longevity.',
    image: '/src/assets/images/copper_tubes_1779553017346.png',
    features: [
      'Guaranteed seamless draw profile',
      'Ultra clean dry inner surfaces to ASTM standards',
      'High pressure thresholds and burst reliability',
      'Excellent flaring and bending performance'
    ],
    specs: [
      { label: 'Outer Diameter', value: '4.00mm - 108.00mm' },
      { label: 'Wall Thickness', value: '0.35mm - 3.50mm' },
      { label: 'Form factor', value: 'Straight lengths & Pancake coils' },
      { label: 'Standard Rating', value: 'ASTM B88, EN 1057, ASTM B280' }
    ],
    alloyGrades: ['C12200 (DHP)', 'C10200 (Oxygen Free)'],
    applications: ['Refrigeration & AC', 'Plumbing Infrastructure', 'Medical Gas Lines', 'Geothermal Heating']
  },
  {
    id: 'copper-coils',
    name: 'COPPER COILS',
    tagline: 'High speed winding electromagnetic coils.',
    description: 'High grade copper coils for various industrial applications.',
    longDescription: 'High precision strip and heavy wire coils intended for large-scale electrical transformations, industrial magnetic windings, choke coils, and telecommunication inductive cores. Packaged to protect against moisture.',
    image: '/src/assets/images/copper_coils_1779552995494.png',
    features: [
      'High speed winding suitability',
      'Zero insulation defect compatibility',
      'Continuous joint-free long coil formats',
      'Impeccable micro-structural grain consistency'
    ],
    specs: [
      { label: 'Width range', value: '10mm - 400mm' },
      { label: 'Strip Thickness', value: '0.10mm - 3.00mm' },
      { label: 'Inside Diameter', value: '300mm, 400mm, 500mm' },
      { label: 'Elongation', value: '≥ 35%' }
    ],
    alloyGrades: ['C11000 (ETP)', 'C10100 (OFE)', 'C10200'],
    applications: ['Motor Windings', 'High-Frequency Inductors', 'Power Grid Transformers', 'Electric Vehicle Stators']
  },
  {
    id: 'copper-components',
    name: 'COPPER COMPONENTS',
    tagline: 'Machined terminals & precision fittings.',
    description: 'Precision engineered copper components for specialized applications.',
    longDescription: 'Sleek, bespoke CNC-milled and hot-stamped copper components, connecting rods, switchgear connectors, and architectural plumbing couplings designed to operate in high vibration or heat intensive environments.',
    image: '/src/assets/images/copper_components_1779553037569.png',
    features: [
      'Micrometer scaling precision accuracy',
      'Advanced electroplating options (Tin, Silver, Nickel)',
      'Optimized mechanical stress-bearing geometry',
      'Strict quality validation via Coordinate Measuring Machines'
    ],
    specs: [
      { label: 'Tolerance Limit', value: '± 0.01 mm' },
      { label: 'Process', value: 'Forging, CNC Milling, Cold Stamping' },
      { label: 'Plating Thickness', value: '3µm - 15µm' },
      { label: 'Hardness Options', value: '65 - 110 HV' }
    ],
    alloyGrades: ['C11000 ETP', 'C14500 (Tellurium Copper for high machinability)'],
    applications: ['Power Converters', 'Electrical Switchboard Rails', 'Automotive Braking Terminals', 'Renewable Energy Inverters']
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'electrical',
    name: 'Electrical',
    iconName: 'Zap',
    description: 'Premium busbars and wiring harnesses running overhead and underground power transmission networks with maximum conductivity.',
    stats: 'IACS Conductivity: >101%'
  },
  {
    id: 'construction',
    name: 'Construction',
    iconName: 'Hammer',
    description: 'Ultra-durable, corrosion-resistant copper pipes, plumbing solutions, and roofing panels designed for generational architectural lifespans.',
    stats: 'Service Life: 100+ Years'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    iconName: 'Car',
    description: 'High-purity wire harnesses, electric vehicle stator coils, and battery link connectors facilitating modern electromobility standards.',
    stats: 'EV Demand Increase: +350%'
  },
  {
    id: 'energy',
    name: 'Energy',
    iconName: 'BatteryCharging',
    description: 'Sub-station winding coils and photovoltaic connection plates transferring wind and solar power seamlessly into regional central grids.',
    stats: 'Grid Integrity Metric: 99.99%'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    iconName: 'Building',
    description: 'Heavy duty continuous cast grounding rods and signal cables underpinning rapid rail systems, ports, and high-speed highway conduits.',
    stats: 'Approved Systems: Class A'
  },
  {
    id: 'hvac',
    name: 'HVAC',
    iconName: 'Snowflake',
    description: 'Clean inner surface seamless copper tubes facilitating optimized ozone-safe high-pressure thermal exchange media flow.',
    stats: 'Leak Threshold: Zero Tolerance'
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    iconName: 'Radio',
    description: 'Bespoke shielded communication wires and coaxial cores safeguarding lossless high frequency data dissemination.',
    stats: 'Attenuation: Ultra-Low'
  }
];
