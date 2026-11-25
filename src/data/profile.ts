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
  sub: 'Real-time ingestion, lakehouse ELT and AI on top of trusted data, with Apache NiFi, Spark/Databricks, Airflow, dbt and PostgreSQL. Currently at Freshtrack; recently FIREBRIDGE for NASA Space Apps 2026.',
};

/** Headline numbers. Every figure comes from a project's own code, docs or receipts. */
export const proof = [
  { value: '666.9M', label: 'satellite records archived and audited', source: 'FIREBRIDGE · 23.3 GiB Parquet' },
  { value: '25.5→4.7 s', label: 'analysis time-to-ready after regional indexing', source: 'FIREBRIDGE · PostGIS' },
  { value: '3+ yrs', label: 'building production data systems', source: 'Freshtrack · Brocoli Data · AGILISYS' },
  { value: '138', label: 'automated tests on a grounded LLM agent', source: 'FIREBRIDGE AI agent' },
];

export type Link = { label: string; href: string };
export type Step = { name: string; detail?: string };

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
      { name: 'Docker Compose', used: ['firebridge', 'docker'] },
      { name: 'GitHub Actions', used: ['firebridge'] },
    ],
  },
  {
    layer: 'Serve',
    tools: [
      { name: 'PostgreSQL', used: ['freshtrack', 'firebridge'] },
      { name: 'PostGIS', used: ['firebridge'] },
      { name: 'BigQuery', used: ['brocoli'] },
      { name: 'FastAPI · Flask', used: ['firebridge', 'agilisys'] },
      { name: 'Node.js · Fastify', used: ['firebridge', 'docker'] },
      { name: 'SQLite', used: ['firebridge', 'docker'] },
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
      { name: 'Dashboards', used: ['freshtrack'] },
      { name: 'Grafana', used: ['iot'] },
      { name: 'React · MapLibre', used: ['firebridge', 'docker'] },
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
    flow: ['carrier APIs · GPS', 'Apache NiFi', 'ADLS Gen2 · Parquet', 'Databricks · Spark', 'PostgreSQL', 'dashboards · alerts'],
    points: [
      'Designed the data-platform architecture and Apache NiFi pipelines, with failure handling, backpressure control and automated alerting.',
      'Built ELT on Azure ADLS Gen2 and Databricks (Spark) with Parquet storage, improving analytics performance and reducing cloud costs.',
      'Real-time maritime tracking that merges carrier feeds (Maersk, CMA CGM, MSC) into a single PostgreSQL source of truth with live alerts.',
      'Road-transport ETA prediction from historical GPS trajectory segmentation and real-time tracking.',
      'OCR document service for order workflows: classification, extraction, validation and mismatch alerts.',
      'Self-hosted n8n booking workflows, an AI analytics assistant, a vessel-tracking service and carrier-performance dashboards.',
    ],
    stack: ['Apache NiFi', 'Azure Databricks', 'ADLS Gen2', 'Spark', 'PostgreSQL', 'n8n', 'Python'],
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
    'I’m a data engineer based in Agadir, Morocco. Since 2023 I’ve been building the data platform at Freshtrack: Apache NiFi pipelines, ELT on Azure Databricks, real-time tracking of maritime carriers, and the ML services that sit on top, from ETA prediction to OCR.',
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
