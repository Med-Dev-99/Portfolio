/**
 * Every piece of text on the site lives in this file.
 * Edit here, then `npm run deploy` (and `npm run resume` to rebuild the PDF).
 */

export const site = {
  name: 'Mohamed El Korchi',
  role: 'AI & Data Engineer',
  url: 'https://mohamedelkorchi.com',
  location: 'Agadir, Morocco',
  email: 'elkorchimohameddev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamedelkorchi',
  github: 'https://github.com/Med-Dev-99',
  resume: '/resume/Mohamed-El-Korchi-Resume.pdf',
  title: 'Mohamed El Korchi, AI & Data Engineer',
  description:
    'AI & Data Engineer in logistics: real-time pipelines that turn carrier feeds, AIS, IoT sensors and documents into trusted shipment events, risk alerts and ETA predictions. Apache NiFi, n8n, Python, PostgreSQL/PostGIS, Databricks, LLMs.',
};

export const hero = {
  status: 'AI & Data Engineer at Freshtrack',
  kicker: 'raw signals in → trusted events out',
  statement: ['I turn raw logistics signals into ', 'trusted events, risk alerts and predictions', '.'],
  sub: 'At Freshtrack I own data and AI end to end: carrier feeds, AIS, truck IoT sensors and partner emails become one clean shipment timeline, with delay, cold-chain and demurrage risks on top.',
};

/** Headline numbers. Every figure comes from a project's own code, docs or receipts. */
export const proof = [
  { value: '24', label: 'shipping carriers collected into one event language', source: 'Freshtrack · carrier data provider' },
  { value: '14', label: 'alert and risk types from one validated event model', source: 'Freshtrack · maritime track & trace' },
  { value: '12', label: 'geofenced port zones turning GPS into milestones', source: 'Freshtrack · truck IoT' },
  { value: '666.9M', label: 'satellite records archived and audited', source: 'FIREBRIDGE · NASA Space Apps 2026' },
];

export type Link = { label: string; href: string };
export type Step = { name: string; detail?: string };

/** Flagship production project at Freshtrack. Figures come from the project's README and load-test reports. */
export const platform = {
  slug: 'tracking-platform',
  badge: 'Freshtrack · production platform',
  name: 'Container Tracking & Schedules Platform',
  tagline: 'One real-time API over 24 shipping carriers and IoT trackers.',
  summary:
    'Every carrier publishes sailing schedules and container events differently: different APIs, websites, formats and limits. I built the service that collects them on demand, normalises every event into one language with a DCSA-standard API, adds truck and cold-chain IoT trackers, caches aggressively and records every request, carrier call and processing step in its own monitoring console.',
  role: 'Designed and built it end to end; author of 1,412 of its 1,421 commits.',
  metrics: [
    { value: '24', label: 'carriers' },
    { value: '3', label: 'IoT tracker providers' },
    { value: '~5 s', label: '300 users, warm cache' },
    { value: '2,000+', label: 'test functions' },
  ],
  carriers: [
    'Maersk', 'MSC', 'CMA CGM', 'Hapag-Lloyd', 'ONE', 'COSCO', 'Evergreen', 'HMM', 'Yang Ming', 'ZIM', 'OOCL', 'Wan Hai',
    'PIL', 'X-Press Feeders', 'SITC', 'KMTC', 'Grimaldi', 'Arkas', 'Tailwind', 'BOLUDA', 'Samskip', 'WEC Lines', 'Akkon', 'China United Lines',
  ],
  architecture: [
    { name: '24 carriers + IoT trackers', detail: 'APIs · websites · devices' },
    { name: 'Collectors', detail: 'HTTP · warm browser sessions' },
    { name: 'Normalise', detail: 'one event language · DCSA' },
    { name: 'Cache & guards', detail: '8 h results · bounded waits' },
    { name: 'FastAPI', detail: 'REST · SSE stream · DCSA' },
    { name: 'Monitor', detail: 'every request & carrier call' },
  ] as Step[],
  decisions: [
    {
      title: 'Cache first, carriers last',
      body: 'Results are cached for 8 hours and “lane not served” answers for 4. Repeat searches cost milliseconds and never touch a carrier, so latency stays flat as users grow.',
    },
    {
      title: 'Every wait has a bound',
      body: 'Live fan-outs share an admission gate. Overload gets an instant 429 with Retry-After instead of hanging, and results stream in carrier by carrier over SSE.',
    },
    {
      title: 'See every exchange',
      body: 'A monitoring console records each request, step and carrier call for about 35 µs per request, masks secrets and sends email alerts when something degrades.',
    },
  ],
  stack: ['Python', 'FastAPI', 'Pydantic', 'Playwright', 'curl_cffi', 'SSE', 'SQLite', 'Docker Compose', 'Nginx'],
  links: { caseStudy: '/work/tracking-platform/' },
};

/* ---------- Freshtrack: the systems I own (private repositories, described generically) ---------- */

export type SampleLine = { k: 'in' | 'out' | 'drop' | 'alert' | 'ai'; tag: string; text: string };
export type System = {
  id: string;
  icon: 'ship' | 'mail' | 'scan' | 'truck' | 'globe' | 'chart';
  name: string;
  tag: string;
  value: string;
  body: string;
  hard: string[];
  facts: string[];
  stack: string[];
  sample: SampleLine[];
  link?: Link;
};

export const freshtrack = {
  site: 'https://www.freshtrack.ma/en/',
  intro:
    'Freshtrack helps exporters book and follow freight by sea, road and air, and warns them before a delay, a temperature excursion or demurrage costs money. I own its data and AI: every signal that comes in, and every event, alert and prediction that goes out.',
  systems: [
    {
      id: 'maritime',
      icon: 'ship',
      name: 'Maritime track & trace',
      tag: 'sea · carrier APIs + AIS',
      value: 'One container timeline customers can trust, built from sources that disagree.',
      body: 'Carrier APIs and AIS-based milestone feeds reach Apache NiFi in different formats, often late, duplicated or simply wrong. My pipelines map them to one event model, keep only what is physically possible and trigger the alerts customers act on.',
      hard: [
        'A chronology guard ranks 11 milestones, so an arrival can never come before its departure',
        'Carrier data outranks aggregators; actual-time corrections over 4 days apart are rejected, not served',
        'Ports matched by UN/LOCODE, then city, country and a 20–30 km radius',
      ],
      facts: ['14 alert types', 'ETA risk · demurrage', '749 commits'],
      stack: ['Apache NiFi', 'Python', 'PostgreSQL', 'Docker', 'GitHub Actions'],
      sample: [
        { k: 'in', tag: 'carrier', text: 'Loaded · MAPTM · 02 Nov 09:14' },
        { k: 'in', tag: 'AIS', text: 'Departed · MAPTM · 01 Nov 22:40' },
        { k: 'drop', tag: 'guard', text: 'before loading → rejected' },
        { k: 'in', tag: 'AIS', text: 'Departed · MAPTM · 02 Nov 18:05' },
        { k: 'out', tag: 'event', text: 'Vessel departure · actual' },
        { k: 'out', tag: 'sync', text: 'copied to 3 sibling containers' },
        { k: 'alert', tag: 'risk', text: 'ETA Rotterdam +31 h → alert sent' },
      ],
    },
    {
      id: 'booking',
      icon: 'mail',
      name: 'Email-to-API booking automation',
      tag: 'n8n · email → DCSA JSON',
      value: 'Partners without an API now book through ours, without changing a thing.',
      body: 'Some carriers and partners still run bookings by email: requests, confirmations, cancellations, schedules and status sheets. n8n workflows and Python pipelines read each message, parse its attachment (CSV, Excel, or PDF through OCR), convert it to standard DCSA JSON and call our internal APIs.',
      hard: [
        'Routed by sender and subject, with a parser per partner and document format',
        'Every step validated; a failure is held, retried or reported, never silently lost',
        'Full traceability: each email linked to the payload sent and the response received',
      ],
      facts: ['request · confirm · cancel', 'DCSA JSON', 'every run traced'],
      stack: ['n8n', 'Python', 'OCR', 'DCSA', 'REST APIs'],
      sample: [
        { k: 'in', tag: 'email', text: 'Booking confirmation + PDF' },
        { k: 'out', tag: 'route', text: 'sender + subject → confirm flow' },
        { k: 'out', tag: 'OCR', text: 'booking · vessel · voyage · ETD' },
        { k: 'out', tag: 'DCSA', text: 'booking JSON · schema valid' },
        { k: 'out', tag: 'API', text: 'confirmed in platform · 200' },
        { k: 'in', tag: 'email', text: 'Cancellation · no attachment' },
        { k: 'drop', tag: 'check', text: 'unknown booking → held, alerted' },
      ],
    },
    {
      id: 'documents',
      icon: 'scan',
      name: 'Document AI',
      tag: 'n8n · OCR · LLM extraction',
      value: 'Invoices and shipping documents read by machines and checked against the order.',
      body: 'n8n workflows collect invoices and shipment documents and send them to a self-hosted OCR service. An LLM extraction layer classifies bills of lading, customs declarations and invoices, extracts their fields and flags anything that disagrees with the order.',
      hard: [
        'One extraction schema per document type, validated before anything is saved',
        'Mismatch alerts when a document disagrees with its order: BL, containers, amounts',
        'A processing log per document, for audit and reprocessing',
      ],
      facts: ['BL · customs · invoices', 'self-hosted OCR', 'mismatch alerts'],
      stack: ['n8n', 'OCR', 'Gemini', 'FastAPI', 'Python', 'Docker'],
      sample: [
        { k: 'in', tag: 'email', text: 'invoice_0412.pdf · 3 pages' },
        { k: 'out', tag: 'OCR', text: 'text + layout · self-hosted' },
        { k: 'out', tag: 'class', text: 'carrier invoice' },
        { k: 'out', tag: 'fields', text: 'invoice no. · BL · total' },
        { k: 'drop', tag: 'check', text: 'BL ≠ order → mismatch flagged' },
        { k: 'out', tag: 'save', text: 'linked to shipment · logged' },
      ],
    },
    {
      id: 'truck',
      icon: 'truck',
      name: 'Truck IoT track & trace · cold chain',
      tag: 'road · GPS + sensors',
      value: 'Raw GPS and sensor readings turned into port milestones, risks and ETAs.',
      body: 'Trackers from 3 IoT providers report position, temperature, humidity and light every 15 to 20 minutes, with no events at all. I built the engine that turns those readings into milestones, from departure through each Tanger Med checkpoint (gate, passport control, customs, scanner, ferry) to arrival, plus cold-chain risks.',
      hard: [
        '12 geofenced port zones with ordered sub-stages; each enter and exit fires once, even when readings arrive out of order',
        'Door openings from light spikes; temperature risk predicted at 16 h, confirmed at 24 h, costed per commodity',
        'ETA from past trips split into route segments, each with its median duration',
      ],
      facts: ['3 IoT providers', '12 port zones', 'USDA cold treatment'],
      stack: ['Python', 'Apache NiFi', 'PostgreSQL', 'SQLite state', 'GeoJSON'],
      sample: [
        { k: 'in', tag: 'tracker', text: '35.886,−5.501 · 4.2 °C · 0 lux' },
        { k: 'out', tag: 'zone', text: 'entered Tanger Med port gate' },
        { k: 'out', tag: 'zone', text: 'exited scanner · 15:12' },
        { k: 'out', tag: 'zone', text: 'boarded ferry · 17:30' },
        { k: 'alert', tag: 'cold', text: '9.1 °C for 16 h → predicted risk' },
        { k: 'alert', tag: 'light', text: 'light spike → door opened' },
        { k: 'out', tag: 'ETA', text: '3 segments left · median 19 h' },
      ],
    },
    {
      id: 'provider',
      icon: 'globe',
      name: 'Carrier data provider',
      tag: '24 carriers · DCSA',
      value: 'Schedules, tariffs, tracking and vessel positions from carriers with no integration.',
      body: 'Many carriers give us no API, only public websites. I built the service that collects their schedules, tariffs, container tracking and vessel positions on demand, normalises everything to DCSA and serves it to Freshtrack like any other data provider.',
      hard: [
        '24 carriers, each with its own website, format and rate limits',
        'Cache first: six-week schedule windows, so repeated searches answer in milliseconds',
        'Every request, carrier call and step monitored, with email alerts when quality drops',
      ],
      facts: ['24 carriers', '300 users · ~5 s warm', '1,412 of 1,421 commits'],
      stack: ['Python', 'FastAPI', 'Playwright', 'SSE', 'DCSA', 'Docker'],
      link: { label: 'Read the case study', href: '/work/tracking-platform/' },
      sample: [
        { k: 'in', tag: 'search', text: 'CNSHA → MAPTM · 6 weeks' },
        { k: 'out', tag: 'cache', text: 'hit · 11 ms' },
        { k: 'in', tag: 'search', text: 'NLRTM → MACAS · not cached' },
        { k: 'out', tag: 'fan-out', text: '12 carriers · streamed live' },
        { k: 'out', tag: 'tariff', text: '20′ / 40′ quotes · USD' },
        { k: 'out', tag: 'vessel', text: 'IMO 9897028 → AIS sync' },
        { k: 'out', tag: 'DCSA', text: 'one standard event language' },
      ],
    },
    {
      id: 'analytics',
      icon: 'chart',
      name: 'Analytics & AI insights',
      tag: 'Superset · ML · LLM',
      value: 'Where shipments lose time, and which carriers and routes cause it.',
      body: 'On top of the event data: carrier performance, the duration of every port stage and trajectory, and per-client delay analysis that gives each customer a global view of their orders. An LLM assistant turns the dashboards into a short written briefing.',
      hard: [
        'Reception latency per carrier: how late each event reaches us',
        'Port-stage and trajectory durations, with anomaly detection on transit times',
        'LLM briefings written from computed metrics, never from guesses',
      ],
      facts: ['carrier scorecards', 'road SLA dashboard', 'LLM briefings'],
      stack: ['Python', 'PostgreSQL', 'Apache Superset', 'scikit-learn', 'LangGraph', 'React'],
      sample: [
        { k: 'in', tag: 'events', text: 'carrier milestones · 12 months' },
        { k: 'out', tag: 'metric', text: 'reception latency by carrier' },
        { k: 'out', tag: 'metric', text: 'gate-in → loading by port' },
        { k: 'alert', tag: 'outlier', text: '61 d on a 34 d lane → flagged' },
        { k: 'out', tag: 'client', text: 'where shipments lose time' },
        { k: 'ai', tag: 'LLM', text: 'briefing from the dashboard' },
      ],
    },
  ] as System[],
};

export const featured = {
  slug: 'firebridge',
  badge: 'NASA Space Apps Challenge 2026',
  name: 'FIREBRIDGE',
  tagline: 'One comparable fire history from 26 years of changing NASA satellites.',
  summary:
    'Archives every NASA FIRMS fire record from 5 satellites, serves any area and period in seconds, and explains it with an AI agent that cannot invent a number. I built the data platform and the AI agent.',
  role: 'Built the data platform and the AI agent; main contributor to the web app (team of 4).',
  metrics: [
    { value: '666.9M', label: 'records' },
    { value: '4.7 s', label: 'time-to-ready' },
    { value: '10', label: 'Airflow DAGs' },
    { value: '138', label: 'agent tests' },
  ],
  architecture: [
    { name: 'NASA FIRMS', detail: '5 satellites' },
    { name: 'Airflow', detail: '10 DAGs' },
    { name: 'Parquet lake', detail: 'DuckDB audits' },
    { name: 'PostGIS', detail: 'versioned releases · dbt' },
    { name: 'Fastify API', detail: 'BullMQ workers' },
    { name: 'React + AI agent', detail: 'MapLibre · FastAPI' },
  ] as Step[],
  decisions: [
    {
      title: 'Lake + bounded cache, not one giant table',
      body: '666.9M rows stay in Parquet. Regional indexes narrow reads and only the requested history is published to PostGIS: 25.5 s → 4.7 s.',
    },
    {
      title: 'Immutable, versioned releases',
      body: 'A failed load never replaces what is serving. Map, calendar, exports and AI all read the same pinned release.',
    },
    {
      title: 'Code computes, the LLM explains',
      body: 'The agent gets numbered facts, and a guard checks every number in its answer. When models hit rate limits, it falls back across 4 of them.',
    },
  ],
  stack: ['Airflow 3', 'dbt', 'Parquet', 'DuckDB', 'PostGIS', 'FastAPI', 'Groq', 'Fastify', 'React', 'Docker', 'GitHub Actions'],
  links: {
    caseStudy: '/work/firebridge/',
    live: 'https://ogote.com',
    repos: [
      { label: 'Data platform', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-DataPlatform' },
      { label: 'Web app', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-App' },
      { label: 'AI agent', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-AI' },
    ] as Link[],
  },
};

export const dockerInspector = {
  slug: 'docker-inspector',
  badge: 'Open source · MIT',
  name: 'Docker Inspector',
  tagline: 'A flight recorder for your containers.',
  summary:
    'A Linux desktop app that records containers in the background, explains crashes in plain English with the metrics from just before, rewinds 7 days of history and audits configuration with one-click fixes.',
  architecture: [
    { name: 'Docker socket', detail: 'Engine API, no SDK' },
    { name: 'Node backend', detail: 'stats · events · exec' },
    { name: 'SQLite history', detail: '7 days, local only' },
    { name: 'Crash analyser · Doctor', detail: 'verdict · evidence · fix' },
    { name: 'React UI', detail: 'Electron or browser' },
  ] as Step[],
  highlights: [
    'Explains crashes in plain English, from exit codes, log patterns and pre-crash metrics',
    'Doctor flags ports that bypass UFW, secrets in env vars and missing limits',
    'Hardened: loopback only, per-launch token, Host/Origin checks, read-only image',
  ],
  stack: ['Electron', 'React 19', 'TypeScript', 'Node.js', 'SQLite', 'WebSocket', 'xterm.js'],
  links: { caseStudy: '/work/docker-inspector/', repo: 'https://github.com/Med-Dev-99/Docker-inspector' },
};

export const moreProjects: { name: string; flow: string[]; note: string; href?: string; internal?: boolean }[] = [
  {
    name: 'Docker Inspector',
    flow: ['Docker Engine API', 'SQLite history', 'crash analyser', 'desktop UI'],
    note: 'Open-source flight recorder for containers: crash diagnosis and 7-day history.',
    href: '/work/docker-inspector/',
    internal: true,
  },
  {
    name: 'IoT sensor streaming',
    flow: ['sensors', 'Kafka', 'MongoDB Atlas', 'Spark', 'Grafana'],
    note: 'Real-time ingestion and analytics on simulated sensor streams.',
  },
  {
    name: 'Twitter ETL & analytics',
    flow: ['Twitter API', 'Pentaho PDI', 'PostgreSQL', 'reports'],
    note: 'Classic ETL into a relational model, with analytical reporting.',
    href: 'https://github.com/Med-Dev-99/Twitter-ETL-project',
  },
  {
    name: 'Document OCR pipeline',
    flow: ['scans', 'OpenCV', 'PaddleOCR', 'NER', 'REST API'],
    note: 'Zonal extraction, custom NER and table parsing.',
    href: 'https://github.com/Med-Dev-99/OCR_Pipeline',
  },
  {
    name: 'Session-based recommender',
    flow: ['click sessions', 'GAT + GCN', 'attention', 'ranking'],
    note: 'Master’s research, 4% better than state-of-the-art baselines.',
  },
  {
    name: 'Transformer summarizer',
    flow: ['articles', 'encoder', 'decoder', 'summary'],
    note: 'Abstractive summarisation with an encoder–decoder Transformer.',
    href: 'https://github.com/Med-Dev-99/transformer-summarizer',
  },
];

/* ---------- Stack lineage: which tools were used where ---------- */

export const contexts = [
  { id: 'freshtrack', name: 'Freshtrack', kind: 'AI & Data Engineer', period: '2023–now' },
  { id: 'firebridge', name: 'FIREBRIDGE', kind: 'NASA Space Apps', period: '2026' },
  { id: 'docker', name: 'Docker Inspector', kind: 'Open source', period: '2026' },
  { id: 'brocoli', name: 'Brocoli Data', kind: 'Data engineering intern', period: '2023' },
  { id: 'agilisys', name: 'AGILISYS', kind: 'ML & Python intern', period: '2023' },
  { id: 'iot', name: 'IoT streaming', kind: 'Project', period: '' },
  { id: 'research', name: 'Master’s research', kind: 'Ibn Zohr University', period: '2023' },
] as const;

export type ContextId = (typeof contexts)[number]['id'];

export const stackLayers: { layer: string; tools: { name: string; used: ContextId[] }[] }[] = [
  {
    layer: 'Ingest',
    tools: [
      { name: 'Apache NiFi', used: ['freshtrack'] },
      { name: 'n8n', used: ['freshtrack'] },
      { name: 'AIS · IoT feeds', used: ['freshtrack'] },
      { name: 'Apache Kafka', used: ['iot'] },
      { name: 'Cloud Functions · Lambda', used: ['brocoli'] },
      { name: 'REST & carrier APIs', used: ['freshtrack', 'firebridge'] },
      { name: 'Playwright · curl_cffi', used: ['freshtrack'] },
    ],
  },
  {
    layer: 'Store',
    tools: [
      { name: 'ADLS Gen2', used: ['freshtrack'] },
      { name: 'Parquet · Arrow', used: ['freshtrack', 'firebridge'] },
      { name: 'S3 · GCS', used: ['brocoli'] },
      { name: 'MongoDB', used: ['iot'] },
    ],
  },
  {
    layer: 'Process',
    tools: [
      { name: 'Spark · Databricks', used: ['freshtrack', 'iot'] },
      { name: 'Delta Live Tables', used: ['brocoli'] },
      { name: 'dbt', used: ['firebridge'] },
      { name: 'DuckDB', used: ['firebridge'] },
      { name: 'Geofencing · GeoJSON', used: ['freshtrack'] },
    ],
  },
  {
    layer: 'Orchestrate',
    tools: [
      { name: 'Apache Airflow', used: ['firebridge'] },
      { name: 'Docker Compose', used: ['freshtrack', 'firebridge', 'docker'] },
      { name: 'GitHub Actions', used: ['freshtrack', 'firebridge'] },
    ],
  },
  {
    layer: 'Serve',
    tools: [
      { name: 'PostgreSQL', used: ['freshtrack', 'firebridge'] },
      { name: 'PostGIS', used: ['freshtrack', 'firebridge'] },
      { name: 'BigQuery', used: ['brocoli'] },
      { name: 'FastAPI · Flask', used: ['freshtrack', 'firebridge', 'agilisys'] },
      { name: 'Go', used: ['freshtrack'] },
      { name: 'Node.js · Fastify', used: ['firebridge', 'docker'] },
      { name: 'SQLite', used: ['freshtrack', 'firebridge', 'docker'] },
    ],
  },
  {
    layer: 'AI & ML',
    tools: [
      { name: 'LLM agents', used: ['firebridge', 'freshtrack'] },
      { name: 'OCR · document AI', used: ['freshtrack', 'agilisys'] },
      { name: 'ETA models', used: ['freshtrack'] },
      { name: 'Anomaly detection', used: ['freshtrack'] },
      { name: 'PyTorch · GNNs', used: ['research'] },
    ],
  },
  {
    layer: 'Visualise',
    tools: [
      { name: 'Superset · dashboards', used: ['freshtrack'] },
      { name: 'Streamlit', used: ['freshtrack'] },
      { name: 'Grafana', used: ['iot'] },
      { name: 'React', used: ['freshtrack', 'firebridge', 'docker'] },
    ],
  },
];

export const alsoKnow =
  'Also: TensorFlow, scikit-learn, HuggingFace, LangChain/LangGraph, Cassandra, Tableau. Languages: Python, SQL, TypeScript, Java, Go, C/C#.';

/* ---------- Experience ---------- */

export const experience = [
  {
    company: 'Freshtrack',
    role: 'AI & Data Engineer',
    period: 'Dec 2023 – Present',
    place: 'Agadir · On-site',
    current: true,
    /** Shown on the website, where the Work section already details each system. */
    site: [
      'Own every data and AI topic of a sea, road and air logistics platform, from ingestion (Apache NiFi, n8n) to events, alerts, ETAs, documents and analytics.',
      'Built its real-time track & trace for sea and road, cold-chain monitoring, document AI and carrier analytics.',
      'Turned email-only partners into API integrations, and 24 non-integrated carriers into one data feed.',
    ],
    /** Full version, used in the resume PDF. */
    points: [
      'Own all data and AI topics of a sea, road and air logistics platform: Apache NiFi ingestion, Python pipelines, PostgreSQL/PostGIS, ADLS Gen2 and Azure Databricks.',
      'Maritime track & trace: carrier APIs and AIS milestone feeds unified into one validated event model (chronology guard, source priority, anomaly rejection) driving 14 alert types, including ETA/ETD risk, demurrage and missing containers.',
      'Truck IoT track & trace and cold chain: 12 geofenced Tanger Med zones turn GPS readings into enter/exit milestones; light and temperature rules detect door openings and cold-chain risks; segment-based ETA from historical trips.',
      'Carrier data provider for non-integrated carriers: schedules, tariffs, container tracking and vessel positions from 24 carriers behind one cached, monitored DCSA API.',
      'Automation and document AI: n8n email-to-API booking flows (requests, confirmations, cancellations) with full error handling and traceability; self-hosted OCR and LLM extraction for invoices and shipping documents.',
      'Analytics: carrier performance, port-stage and trajectory durations and client delay analysis in Superset and React, plus an LLM assistant that writes the briefing.',
    ],
    stack: ['Apache NiFi', 'Python', 'PostgreSQL/PostGIS', 'Azure Databricks', 'n8n', 'OCR · LLMs', 'FastAPI', 'Superset'],
  },
  {
    company: 'Brocoli Data',
    role: 'Data Engineering Intern',
    period: 'Aug 2023 – Dec 2023',
    place: 'Remote',
    points: [
      'Built scalable extraction and loading pipelines with Delta Live Tables.',
      'Serverless data workflows on Google Cloud Functions and AWS Lambda across S3, GCS and BigQuery.',
    ],
    stack: ['Delta Live Tables', 'BigQuery', 'AWS Lambda', 'GCP'],
  },
  {
    company: 'AGILISYS',
    role: 'ML & Python Developer Intern',
    period: 'Jul 2023 – Nov 2023',
    place: 'Remote',
    points: [
      'Document extraction with PaddleOCR, zonal extraction, NER and table parsing; OpenCV preprocessing and a custom-trained NER model.',
      'REST API in Flask to automate extraction and integration workflows.',
    ],
    stack: ['PaddleOCR', 'OpenCV', 'NER', 'Flask'],
  },
  {
    company: 'Ibn Zohr University',
    role: 'Master’s Research, Big Data & AI',
    period: 'Feb 2023 – Jul 2023',
    place: 'Agadir',
    points: ['Session-based recommendation with hybrid GAT, GCN and attention, 4% better than state-of-the-art models.'],
    stack: ['PyTorch', 'GNN'],
  },
];

export const earlier =
  'Before data: Flutter mobile developer at Jeebli (multi-app food-delivery platform) and NEXTCONCEPT, 2020–2021.';

/* ---------- About ---------- */

export const about = {
  paragraphs: [
    'I’m an AI & data engineer in Agadir, Morocco. At Freshtrack I own data and AI for a logistics platform that moves goods by sea, road and air: every carrier feed, AIS message, IoT reading and partner email goes through pipelines I built, and comes out as events, risks and predictions people act on.',
    'Before that: data engineering at Brocoli Data, ML at AGILISYS, and a Master’s in Big Data & AI. My rule for AI on data: code computes and verifies the numbers, the model explains them.',
  ],
  facts: [
    { label: 'Based in', value: 'Agadir, Morocco' },
    { label: 'Focus', value: 'Real-time pipelines · event data · applied AI' },
    { label: 'Education', value: 'MSc Big Data & AI, Ibn Zohr University' },
    { label: 'Recognition', value: 'NASA Space Apps 2026: Galactic Problem Solver' },
  ],
};

export const principles = [
  { title: 'Never serve a wrong event', body: 'Chronology guards, source priority and anomaly windows decide what reaches a customer.' },
  { title: 'Every alert is accountable', body: 'Deduplicated, retried and audited; an alert that fails to reach a customer raises an urgent email.' },
  { title: 'Store for the query', body: 'Parquet on ADLS to cut cost; regional indexes took a query from 25.5 s to 4.7 s.' },
  { title: 'Code computes, AI explains', body: 'LLMs explain numbers that pipelines computed, and a guard checks every figure they write.' },
];

/* ---------- Education & credentials ---------- */

export const education = [
  { degree: 'Master’s, Big Data & Artificial Intelligence', school: 'Ibn Zohr University, FPT', period: '2021 – 2023' },
  { degree: 'Licence, Computer Engineering', school: 'Ibn Zohr University, FPT', period: '2020 – 2021' },
  { degree: 'IT Development Technician Diploma', school: 'ISGI Laayoune', period: '2017 – 2019' },
];

export const credentials = [
  { name: 'NASA Space Apps Challenge 2026: Galactic Problem Solver', issuer: 'NASA · Nov 2026' },
  { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI & Stanford Online' },
  { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI' },
  { name: 'Natural Language Processing Specialization', issuer: 'DeepLearning.AI' },
];
