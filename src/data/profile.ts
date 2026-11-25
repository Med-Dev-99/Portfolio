/**
 * Every piece of text on the site lives in this file.
 * Edit here, then `npm run deploy` (and `npm run resume` to rebuild the PDF).
 */

export const site = {
  name: 'Mohamed El Korchi',
  role: 'Data Engineer',
  url: 'https://mohamedelkorchi.com',
  location: 'Agadir, Morocco',
  email: 'elkorchimohameddev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamedelkorchi',
  github: 'https://github.com/Med-Dev-99',
  resume: '/resume/Mohamed-El-Korchi-Resume.pdf',
  title: 'Mohamed El Korchi, Data Engineer',
  description:
    'Data Engineer building real-time pipelines, lakehouse platforms and grounded AI. Apache NiFi, Spark/Databricks, Airflow, dbt, PostgreSQL/PostGIS. NASA Space Apps Challenge 2026.',
};

export const hero = {
  status: 'AI & Data Engineer at Freshtrack',
  kicker: 'raw data in → reliable answers out',
  statement: ['I build the pipelines and platforms that turn raw, messy data into ', 'reliable answers', '.'],
  sub: 'Real-time ingestion, lakehouse ELT and AI on top of trusted data, with Apache NiFi, Spark/Databricks, Airflow, dbt, FastAPI and PostgreSQL. At Freshtrack I built the platform that tracks containers across 24 shipping carriers; recently FIREBRIDGE for NASA Space Apps 2026.',
};

/** Headline numbers. Every figure comes from a project's own code, docs or receipts. */
export const proof = [
  { value: '24', label: 'shipping carriers unified behind one real-time API', source: 'Freshtrack tracking platform' },
  { value: '300 users', label: 'served in ~5 s from cache on a 4-CPU box', source: 'Freshtrack load test' },
  { value: '666.9M', label: 'satellite records archived and audited', source: 'FIREBRIDGE · 23.3 GiB Parquet' },
  { value: '3+ yrs', label: 'building production data systems', source: 'Freshtrack · Brocoli Data · AGILISYS' },
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

/** More production work at Freshtrack (private repositories). */
export const freshtrackProjects = [
  {
    name: 'Real-time container tracking & alerting',
    meta: '2025 – now · 749 commits',
    body: 'Ingests container events from tracking aggregators and carrier APIs (Maersk, CMA CGM, MSC, Samskip…), merges them into one event model and dispatches 14 alert types to the Freshtrack dashboard.',
    points: ['ETA/ETD risk, discharge and gate-out (demurrage), transshipment, voyage changes, predicted missing containers', 'Carrier sources win over aggregators; chronology guard; events propagated across a booking’s containers', 'Deduplicated, retried and fully audited alert delivery'],
    flow: ['carrier & tracking APIs', 'unified events', 'PostgreSQL', 'alerts'],
    stack: ['Python', 'PostgreSQL', 'Apache NiFi', 'Docker', 'GitHub Actions'],
    icon: 'activity',
  },
  {
    name: 'IntelliDocs: AI document extraction',
    meta: '2025 – 2026 · 176 commits',
    body: 'Replaces manual data entry for logistics documents (bills of lading, customs declarations, multi-carrier invoices) with LLM extraction, validation and mismatch alerts in order workflows.',
    points: ['Classification, field extraction and validation per document type', 'Mismatch alerts when documents disagree with the order'],
    flow: ['PDFs & scans', 'classify', 'Gemini extraction', 'validate'],
    stack: ['Python', 'FastAPI', 'Gemini', 'Streamlit', 'Docker'],
    icon: 'file',
  },
  {
    name: 'Truck ETA engine',
    meta: 'Road transport',
    body: 'Predicts road-transport arrival times from historical GPS trajectories split into route segments, combined with live tracking.',
    points: ['Segment matching and per-segment coefficients learned from past trips', 'ETA service and maps gateway as Go microservices'],
    flow: ['GPS history', 'route segments', 'coefficients', 'ETA API'],
    stack: ['Python', 'Go', 'Docker'],
    icon: 'map-pin',
  },
  {
    name: 'Carrier performance analytics',
    meta: 'Weekly ETL · dashboards',
    body: 'Measures how late carrier events reach us and how long containers spend at each port stage, then surfaces it in Superset and a React analytics app.',
    points: ['Reception latency and five port-stage durations per carrier', 'Subscription health and duplicate detection views'],
    flow: ['carrier events', 'weekly ETL', 'PostgreSQL', 'Superset · React'],
    stack: ['Python', 'PostgreSQL', 'Apache Superset', 'React', 'Recharts'],
    icon: 'chart',
  },
  {
    name: 'Data platform & ELT',
    meta: 'Since Dec 2023',
    body: 'The platform under it all: NiFi pipelines with failure handling, backpressure and alerting, and ELT on Azure Databricks with Parquet storage.',
    points: ['Faster analytics and lower cloud cost with Parquet on ADLS Gen2', 'Automated alerting on pipeline failures'],
    flow: ['sources', 'Apache NiFi', 'ADLS · Parquet', 'Databricks'],
    stack: ['Apache NiFi', 'Azure Databricks', 'ADLS Gen2', 'Spark', 'Parquet'],
    icon: 'database',
  },
  {
    name: 'Automation & AI assistant',
    meta: 'n8n · LLM',
    body: 'Self-hosted n8n booking workflows that handle carrier emails, backend integration and container updates, plus an AI assistant that turns dashboard metrics into insights.',
    points: ['Booking management without manual copy-paste', 'Streaming, actionable insights from analytics'],
    flow: ['emails & bookings', 'n8n', 'backend', 'AI insights'],
    stack: ['n8n', 'LLMs', 'Python'],
    icon: 'sparkles',
  },
] as const;

export const featured = {
  slug: 'firebridge',
  badge: 'NASA Space Apps Challenge 2026',
  name: 'FIREBRIDGE',
  tagline: 'One comparable fire history from 26 years of changing NASA satellites.',
  summary:
    'MODIS and VIIRS see the same fires through different pixels at different hours, so raw counts can’t be compared across years. FIREBRIDGE archives every NASA FIRMS record, serves any area and period in seconds, and explains the results with an AI agent that cannot invent a number.',
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

export const moreProjects = [
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
  {
    name: 'Plant growth monitoring',
    flow: ['images', 'OpenCV', 'measurements', '3D model'],
    note: 'Computer vision that tracks plant characteristics daily.',
    href: 'https://github.com/Med-Dev-99/Plant-Caracteristics',
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
      { name: 'Apache Kafka', used: ['iot'] },
      { name: 'n8n', used: ['freshtrack'] },
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
      { name: 'PostGIS', used: ['firebridge'] },
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
      { name: 'OCR · NER', used: ['freshtrack', 'agilisys'] },
      { name: 'ETA prediction', used: ['freshtrack'] },
      { name: 'PyTorch · GNNs', used: ['research'] },
    ],
  },
  {
    layer: 'Visualise',
    tools: [
      { name: 'Superset · dashboards', used: ['freshtrack'] },
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
    flow: ['24 carriers · IoT trackers', 'collectors · NiFi', 'normalise · validate', 'PostgreSQL · ADLS', 'APIs · alerts · dashboards'],
    points: [
      'Built the container tracking & sailing schedules platform: 24 carriers and 3 IoT tracker providers behind one real-time API (REST, SSE, DCSA), with caching, bounded concurrency and a console that monitors every request and carrier call.',
      'Real-time container tracking & alerting: unified event model from carrier and aggregator APIs, deduplication and chronology guards, 14 alert types including ETA/ETD risk, demurrage and missing containers.',
      'Designed the data-platform architecture and Apache NiFi pipelines with failure handling, backpressure control and automated alerting; ELT on ADLS Gen2 and Databricks (Spark) with Parquet to cut cloud costs.',
      'AI document platform (Gemini) extracting and validating bills of lading, customs declarations and invoices, with mismatch alerts.',
      'Road-transport ETA prediction from GPS trajectory segmentation (Python engine, Go services) and real-time tracking.',
      'Carrier-performance analytics (weekly ETL, PostgreSQL, Superset, React), self-hosted n8n booking automation, an AI analytics assistant and a vessel-tracking service.',
    ],
    stack: ['Python', 'FastAPI', 'Apache NiFi', 'Azure Databricks', 'PostgreSQL', 'Playwright', 'Go', 'n8n'],
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
    'I’m a data engineer based in Agadir, Morocco. Since 2023 I’ve been building the data side of Freshtrack: Apache NiFi pipelines and ELT on Azure Databricks, a platform that tracks containers and schedules across 24 shipping carriers in real time, alerting on every shipment milestone, and the ML services on top, from ETA prediction to AI document extraction.',
    'Before that I interned in data engineering at Brocoli Data and in ML at AGILISYS, after a Master’s in Big Data & AI. Lately I’ve been putting LLMs on top of data pipelines, with one rule: the model explains numbers that code has already computed and verified.',
  ],
  facts: [
    { label: 'Based in', value: 'Agadir, Morocco' },
    { label: 'Focus', value: 'Data platforms · pipelines · applied AI' },
    { label: 'Education', value: 'MSc Big Data & AI, Ibn Zohr University' },
    { label: 'Recognition', value: 'NASA Space Apps 2026: Galactic Problem Solver' },
  ],
};

export const principles = [
  { title: 'Design for failure', body: 'Backpressure, retries and alerting in NiFi; resumable, checkpointed downloads in Airflow.' },
  { title: 'Test data like code', body: 'Schema audits and dbt tests run before anything is published.' },
  { title: 'Store for the query', body: 'Parquet on ADLS to cut cost; regional indexes took a query from 25.5 s to 4.7 s.' },
  { title: 'Ground the AI', body: 'LLMs explain numbers that code computed, and a guard checks every figure they write.' },
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
