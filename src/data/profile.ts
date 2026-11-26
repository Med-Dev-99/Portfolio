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
    'AI & Data Engineer designing data platforms end to end: real-time pipelines, data quality, lakehouse ELT and grounded LLM agents. Apache NiFi, Spark/Databricks, Airflow, dbt, PostgreSQL/PostGIS.',
};

export const hero = {
  status: 'AI & Data Engineer at Freshtrack',
  kicker: 'raw data in → trusted answers out',
  statement: ['I design data platforms that make messy, real-world data ', 'trustworthy', ', and put AI on top of it.'],
  sub: 'Streaming and batch pipelines, data quality, lakehouse ELT and grounded LLM agents, built end to end and run in production.',
};

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

/* ---------- Architecture maps (drawn by ArchMap.astro) ---------- */

export type ArchTone = 'cyan' | 'primary' | 'violet' | 'amber' | 'green';
export type ArchGlyph =
  | 'ship' | 'signal' | 'pin' | 'mail' | 'globe' | 'merge' | 'workflow' | 'browser' | 'layers' | 'geofence'
  | 'columns' | 'scan' | 'shuffle' | 'database' | 'bolt' | 'bell' | 'chart' | 'code' | 'satellite'
  | 'download' | 'server' | 'spark' | 'monitor' | 'gear' | 'cloud' | 'drop';
export type ArchNode = {
  id: string;
  /** Column (0 = sources) and row (fractions allowed) in the diagram. */
  layer: number;
  row: number;
  icon: ArchGlyph;
  label: string;
  sub: string;
  /** Shown on hover/focus. */
  detail: string;
};
export type ArchFlow = { id: string; name: string; summary: string; facts: string[]; edges: string[]; link?: Link };
export type ArchMap = {
  id: string;
  title: string;
  intro: string;
  layers: { name: string; tone: ArchTone }[];
  nodes: ArchNode[];
  /** A cross-cutting concern drawn as a band under the diagram (orchestration, observability…). */
  lane?: { label: string; text: string; from: number; to: number };
  flows: ArchFlow[];
};

/** Freshtrack (private repositories): described in general terms, no client data. */
export const freshtrack = {
  badge: 'Freshtrack · since Dec 2023',
  name: 'A real-time data platform for freight',
  summary:
    'Freshtrack lets exporters book and follow shipments by sea, road and air. I designed and run its data and AI: six production systems on one platform, from raw feeds to risk alerts.',
  site: 'https://www.freshtrack.ma/en/',
  map: {
    id: 'freshtrack',
    title: 'Freshtrack data platform architecture',
    intro: 'Six production systems on one platform. Pick one to trace its data path, or hover any component to see what it does.',
    layers: [
      { name: 'Sources', tone: 'cyan' },
      { name: 'Ingest', tone: 'primary' },
      { name: 'Process', tone: 'violet' },
      { name: 'Store', tone: 'amber' },
      { name: 'Serve', tone: 'green' },
    ],
    nodes: [
      { id: 'carriers', layer: 0, row: 0, icon: 'ship', label: 'Carrier APIs', sub: 'Maersk · CMA · MSC…', detail: 'Container events from shipping lines (Maersk, CMA CGM, MSC, Samskip, DP World…), each in its own format and timing.' },
      { id: 'ais', layer: 0, row: 1, icon: 'signal', label: 'AIS feeds', sub: 'vessel milestones', detail: 'Vessel milestones derived from AIS: useful, but often late, duplicated or simply wrong.' },
      { id: 'iot', layer: 0, row: 2, icon: 'pin', label: 'IoT trackers', sub: 'GPS · temp · light', detail: 'Position, temperature, humidity and light from 3 tracker providers, every 15 to 20 minutes, with no events.' },
      { id: 'emails', layer: 0, row: 3, icon: 'mail', label: 'Emails & files', sub: 'CSV · Excel · PDF', detail: 'Bookings, confirmations, cancellations, schedules and invoices from partners that have no API.' },
      { id: 'web', layer: 0, row: 4, icon: 'globe', label: 'Carrier websites', sub: '24 carriers, no API', detail: '24 carriers that publish schedules, tariffs and tracking on their websites only.' },
      { id: 'nifi', layer: 1, row: 1, icon: 'merge', label: 'Apache NiFi', sub: 'streams · retries', detail: 'One entry point for every stream: routing, backpressure, retries and failure alerts.' },
      { id: 'n8n', layer: 1, row: 3, icon: 'workflow', label: 'n8n workflows', sub: 'IMAP · file triggers', detail: 'Email and file triggers; each message is routed by sender and subject to the right parser.' },
      { id: 'collect', layer: 1, row: 4, icon: 'browser', label: 'Web collectors', sub: 'HTTP · browsers', detail: 'HTTP and browser collectors with a proxy pool and bounded concurrency.' },
      { id: 'unify', layer: 2, row: 0, icon: 'layers', label: 'Event unifier', sub: 'dedup · chronology', detail: 'One event model for every source: chronology guard over 11 ranked milestones, source priority, deduplication, propagation to sibling containers.' },
      { id: 'geo', layer: 2, row: 1, icon: 'geofence', label: 'Geofencing', sub: 'zones · cold chain', detail: '12 Tanger Med zones (gate, passport, customs, scanner, ferry…) turn GPS into enter/exit milestones; light and temperature rules detect door openings and cold-chain risks.' },
      { id: 'lake', layer: 2, row: 2, icon: 'columns', label: 'Lakehouse', sub: 'Databricks · Parquet', detail: 'Raw history landed as Parquet on ADLS Gen2 and processed with Spark on Azure Databricks.' },
      { id: 'docai', layer: 2, row: 3, icon: 'scan', label: 'Document AI', sub: 'parse · OCR · LLM', detail: 'CSV and Excel parsers, a self-hosted OCR service and LLM extraction, validated against one schema per document type.' },
      { id: 'normalise', layer: 2, row: 4, icon: 'shuffle', label: 'DCSA normaliser', sub: 'schedules · tracking', detail: 'Schedules, tariffs, tracking events and vessel positions mapped to the DCSA standard.' },
      { id: 'pg', layer: 3, row: 1, icon: 'database', label: 'PostgreSQL', sub: 'PostGIS · audit', detail: 'Unified events, shipment state and an audit trail of every alert sent, also used to never send one twice.' },
      { id: 'cache', layer: 3, row: 4, icon: 'bolt', label: 'Result cache', sub: '6-week windows', detail: 'Six-week schedule windows: repeated searches answer in milliseconds and never hit a carrier.' },
      { id: 'alerts', layer: 4, row: 1, icon: 'bell', label: 'Alerts & risks', sub: '14 alert types', detail: 'ETA/ETD risk, demurrage, missing containers, temperature and door alerts: deduplicated, retried and audited.' },
      { id: 'bi', layer: 4, row: 2, icon: 'chart', label: 'Dashboards', sub: 'Superset · LLM', detail: 'Carrier scorecards, port-stage and trajectory durations, client delay analysis, and briefings written by an LLM from the computed metrics.' },
      { id: 'api', layer: 4, row: 3.3, icon: 'code', label: 'Platform APIs', sub: 'DCSA · booking', detail: 'DCSA booking, schedule and tracking APIs consumed by the Freshtrack platform.' },
    ],
    lane: { label: 'Observability', text: 'every run logged · failure and stuck-alert emails · end-to-end traceability', from: 1, to: 4 },
    flows: [
      {
        id: 'maritime',
        name: 'Maritime track & trace',
        summary: 'Carrier APIs and AIS feeds merged into one container timeline; impossible or stale events are rejected before they reach a customer.',
        facts: ['11-stage chronology guard', '14 alert types', 'ETA/ETD risk · demurrage'],
        edges: ['carriers>nifi', 'ais>nifi', 'nifi>unify', 'unify>pg', 'pg>alerts'],
      },
      {
        id: 'truck',
        name: 'Truck IoT & cold chain',
        summary: 'GPS and sensor readings become port milestones, door-opening alerts and cold-chain risks, with ETAs from historical route segments.',
        facts: ['12 geofenced zones', 'risk predicted at 16 h', '3 IoT providers'],
        edges: ['iot>nifi', 'nifi>geo', 'geo>pg', 'pg>alerts'],
      },
      {
        id: 'booking',
        name: 'Email-to-API bookings',
        summary: 'Partners without an API book by email; each request, confirmation or cancellation becomes validated DCSA JSON in the platform.',
        facts: ['request · confirm · cancel', 'DCSA JSON', 'every step traced'],
        edges: ['emails>n8n', 'n8n>docai', 'docai>api'],
      },
      {
        id: 'documents',
        name: 'Document AI',
        summary: 'Invoices and shipping documents read by OCR and an LLM, validated, linked to their order, and flagged when they disagree.',
        facts: ['self-hosted OCR', 'LLM extraction', 'mismatch alerts'],
        edges: ['emails>n8n', 'n8n>docai', 'docai>pg', 'pg>alerts'],
      },
      {
        id: 'provider',
        name: 'Carrier data provider',
        summary: 'Schedules, tariffs, tracking and vessel positions collected from 24 carriers that have no API, normalised to DCSA and cached.',
        facts: ['24 carriers', '300 users in ~5 s (warm)', 'DCSA API'],
        edges: ['web>collect', 'collect>normalise', 'normalise>cache', 'cache>api'],
        link: { label: 'Case study', href: '/work/tracking-platform/' },
      },
      {
        id: 'analytics',
        name: 'Analytics & AI',
        summary: 'A Parquet lakehouse on ADLS and Databricks, carrier scorecards, port-stage durations and briefings written by an LLM from the metrics.',
        facts: ['Spark · Databricks', 'Superset', 'LLM briefings'],
        edges: ['nifi>lake', 'lake>bi', 'pg>bi'],
      },
    ],
  } satisfies ArchMap,
};

export const firebridge = {
  badge: 'NASA Space Apps Challenge 2026',
  name: 'FIREBRIDGE',
  summary:
    '26 years of NASA satellite fire records, archived, audited and served in seconds, then explained by an AI agent that cannot invent a number. I built the data platform and the agent (team of 4).',
  links: {
    caseStudy: '/work/firebridge/',
    live: 'https://ogote.com',
    repos: [
      { label: 'Data platform', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-DataPlatform' },
      { label: 'Web app', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-App' },
      { label: 'AI agent', href: 'https://github.com/Nasa-hackathon-FIREBRIDGE/FireBridge-AI' },
    ] as Link[],
  },
  map: {
    id: 'firebridge',
    title: 'FIREBRIDGE architecture',
    intro: 'Three paths from one source of truth. Pick one, or hover any component.',
    layers: [
      { name: 'Source', tone: 'cyan' },
      { name: 'Ingest', tone: 'primary' },
      { name: 'Lake', tone: 'amber' },
      { name: 'Warehouse', tone: 'amber' },
      { name: 'Serve', tone: 'green' },
      { name: 'Apps', tone: 'violet' },
    ],
    nodes: [
      { id: 'firms', layer: 0, row: 0.5, icon: 'satellite', label: 'NASA FIRMS', sub: 'MODIS · VIIRS', detail: 'Active-fire detections from 5 MODIS and VIIRS satellites plus Landsat, November 2000 to today.' },
      { id: 'acquire', layer: 1, row: 0.5, icon: 'download', label: 'Acquisition', sub: 'resumable windows', detail: 'Resumable, checkpointed downloads; 4,202 download windows audited.' },
      { id: 'parquet', layer: 2, row: 0.5, icon: 'columns', label: 'Parquet lake', sub: '666.9M rows', detail: '666.9M records in a 23.3 GiB Parquet lake, audited with DuckDB.' },
      { id: 'postgis', layer: 3, row: 0.5, icon: 'database', label: 'PostGIS', sub: 'dbt · releases', detail: 'dbt models and data tests; immutable, versioned releases with regional spatial indexes (25.5 s → 4.7 s).' },
      { id: 'api', layer: 4, row: 0, icon: 'server', label: 'Fastify API', sub: 'BullMQ workers', detail: 'Fastify API with BullMQ workers for heavy queries and exports.' },
      { id: 'agent', layer: 4, row: 1, icon: 'spark', label: 'AI agent', sub: 'FastAPI · Groq', detail: 'Answers from numbered facts only: evidence engine, a guard on every figure, fallback across 4 LLMs, prompt-injection screening.' },
      { id: 'web', layer: 5, row: 0.5, icon: 'monitor', label: 'Web app', sub: 'React · MapLibre', detail: 'Map, calendar, exports and the AI copilot, live at ogote.com.' },
    ],
    lane: { label: 'Orchestration', text: 'Airflow 3 · 10 DAGs · resumable and audited', from: 1, to: 3 },
    flows: [
      {
        id: 'data',
        name: 'Data platform',
        summary: 'Every NASA FIRMS record since 2000, acquired resumably, audited, and published as immutable PostGIS releases.',
        facts: ['666.9M records', '10 Airflow DAGs', 'query 25.5 s → 4.7 s'],
        edges: ['firms>acquire', 'acquire>parquet', 'parquet>postgis'],
      },
      {
        id: 'agent',
        name: 'AI agent',
        summary: 'An LLM agent that answers from numbered facts only; a guard checks every figure it writes.',
        facts: ['number guard', '4-model fallback', '138 tests'],
        edges: ['postgis>agent', 'agent>web'],
      },
      {
        id: 'app',
        name: 'Web app',
        summary: 'Map, calendar and exports for any area and period, served by a Fastify API with BullMQ workers.',
        facts: ['React · MapLibre', 'Fastify · BullMQ', 'live at ogote.com'],
        edges: ['postgis>api', 'api>web'],
      },
    ],
  } satisfies ArchMap,
};

/** Open-source platforms rebuilt from Master's coursework (2023) into end-to-end projects (2026). */
export const predictiveMaintenance = {
  badge: 'Streaming · MLOps',
  name: 'Predictive Maintenance Platform',
  summary:
    'A simulated fleet of 20 machines streams telemetry; the platform validates it, keeps a Delta lakehouse, scores failure risk on every cycle and alerts before failures happen, then grades its own alerts and retrains itself.',
  repo: 'https://github.com/Med-Dev-99/Predictive_maintenance',
  map: {
    id: 'predmaint',
    title: 'Predictive maintenance platform architecture',
    intro: 'A streaming lakehouse with live ML on top. Pick a path, or hover any component.',
    layers: [
      { name: 'Source', tone: 'cyan' },
      { name: 'Ingest', tone: 'primary' },
      { name: 'Bronze', tone: 'amber' },
      { name: 'Silver', tone: 'amber' },
      { name: 'Gold · ML', tone: 'violet' },
      { name: 'Serve', tone: 'green' },
    ],
    nodes: [
      { id: 'sim', layer: 0, row: 1, icon: 'gear', label: 'Machine fleet', sub: 'AI4I physics', detail: '20 machines simulated from the AI4I 2020 failure rules, with duplicates, late and malformed events injected.' },
      { id: 'kafka', layer: 1, row: 1, icon: 'merge', label: 'Kafka', sub: 'KRaft · keyed', detail: 'Kafka 4.4 in KRaft mode, 6 partitions; telemetry keyed by machine, idempotent producer.' },
      { id: 'bronze', layer: 2, row: 1, icon: 'columns', label: 'Bronze', sub: 'raw · replayable', detail: 'Every Kafka record as received, on Delta Lake (S3), written by Spark Structured Streaming.' },
      { id: 'silver', layer: 3, row: 0.4, icon: 'layers', label: 'Silver', sub: 'contract · dedup', detail: 'Validated against the data contract and deduplicated within a 2-minute watermark.' },
      { id: 'quarantine', layer: 3, row: 1.6, icon: 'scan', label: 'Quarantine', sub: 'rejects + reasons', detail: 'Every rejected record with the rules it broke: malformed JSON, out-of-range values, wrong units.' },
      { id: 'score', layer: 4, row: 0.4, icon: 'spark', label: 'Live scoring', sub: 'LightGBM · alerts', detail: 'Champion model hot-reloaded from MLflow; alerts graded as confirmed, false alarm or preempted. 98 % precision.' },
      { id: 'gold', layer: 4, row: 1.6, icon: 'columns', label: 'Gold', sub: 'minute aggregates', detail: '1-minute aggregates per machine, MERGEd as late data arrives.' },
      { id: 'grafana', layer: 5, row: 0, icon: 'chart', label: 'Grafana', sub: 'live fleet', detail: 'Risk, alerts, caught vs missed failures, throughput and data quality.' },
      { id: 'api', layer: 5, row: 1, icon: 'code', label: 'FastAPI', sub: 'REST · SSE alerts', detail: 'Fleet state and a live alert stream pushed by Postgres NOTIFY.' },
      { id: 'alerts', layer: 5, row: 2, icon: 'bell', label: 'Alert topic', sub: 'Kafka', detail: 'Alerts with the closest failure rule in numbers, e.g. overstrain 10,440 of 11,000 min·Nm.' },
    ],
    lane: { label: 'MLOps', text: 'Airflow · hourly retrain · MLflow champion/challenger', from: 2, to: 4 },
    flows: [
      {
        id: 'lakehouse',
        name: 'Medallion lakehouse',
        summary: 'Kafka into Delta Lake on S3: raw Bronze, contract-valid deduplicated Silver, rejects with reasons, per-minute Gold.',
        facts: ['0 duplicates in Silver', 'exactly-once into Postgres', '~22 events/s'],
        edges: ['sim>kafka', 'kafka>bronze', 'bronze>silver', 'bronze>quarantine', 'silver>gold', 'gold>grafana'],
      },
      {
        id: 'scoring',
        name: 'Live scoring & alerts',
        summary: 'Every production cycle scored by the champion model; alerts raised before failures and graded against what happened.',
        facts: ['67–76 % recall', '98 % precision', '8-cycle median warning'],
        edges: ['sim>kafka', 'kafka>bronze', 'bronze>silver', 'silver>score', 'score>grafana', 'score>api', 'score>alerts'],
      },
    ],
  } satisfies ArchMap,
};

export const smartFarming = {
  badge: 'IoT · analytics engineering',
  name: 'Smart Farming Platform',
  summary:
    'Simulated soil probes on eight fields around Agadir report over MQTT; an edge gateway makes the data trustworthy, real weather adds the climate, and dbt turns it into irrigation advice and crop recommendations.',
  repo: 'https://github.com/Med-Dev-99/smart-farming',
  map: {
    id: 'farm',
    title: 'Smart farming platform architecture',
    intro: 'Real weather and farm locations, simulated probes. Pick a path, or hover any component.',
    layers: [
      { name: 'Field', tone: 'cyan' },
      { name: 'Edge', tone: 'primary' },
      { name: 'Raw', tone: 'amber' },
      { name: 'Transform', tone: 'violet' },
      { name: 'Serve', tone: 'green' },
    ],
    nodes: [
      { id: 'probes', layer: 0, row: 0.5, icon: 'signal', label: 'Soil probes', sub: '8 fields · MQTT', detail: 'Moisture, temperature, EC, N-P-K and pH, with dropouts, stuck sensors, spikes and broken messages.' },
      { id: 'meteo', layer: 0, row: 1.8, icon: 'cloud', label: 'Open-Meteo', sub: 'observed + forecast', detail: 'Real hourly weather and FAO-56 ET0 for each farm, including the 7-day forecast.' },
      { id: 'gateway', layer: 1, row: 0.5, icon: 'merge', label: 'Edge gateway', sub: 'gap filling', detail: 'Contract validation, deduplication, short gaps interpolated, long gaps recorded, spikes flagged, store and forward.' },
      { id: 'readings', layer: 2, row: 0.5, icon: 'database', label: 'TimescaleDB', sub: 'hypertable · rollups', detail: 'Hypertable compressed after 7 days, hourly continuous aggregate (real-time).' },
      { id: 'weather', layer: 2, row: 1.8, icon: 'database', label: 'Weather', sub: 'hourly per farm', detail: 'Observed and forecast hours, upserted hourly by Dagster.' },
      { id: 'dbt', layer: 3, row: 0.8, icon: 'layers', label: 'dbt models', sub: 'staging → marts', detail: '12 models and 30 tests, including agronomic rules; lineage in Dagster and dbt docs.' },
      { id: 'model', layer: 3, row: 2.1, icon: 'spark', label: 'Crop model', sub: 'random forest', detail: '22 crops, 99.6 % cross-validated accuracy, applied to each field’s measured conditions.' },
      { id: 'advice', layer: 4, row: 0, icon: 'drop', label: 'Irrigation', sub: 'FAO-56 advice', detail: 'Irrigate when depletion + 48 h of crop use − forecast rain passes the allowed depletion.' },
      { id: 'recs', layer: 4, row: 1.2, icon: 'chart', label: 'Crop advice', sub: 'top 3 per field', detail: 'Model probabilities next to a profile-fit ranking of every crop.' },
      { id: 'health', layer: 4, row: 2.4, icon: 'monitor', label: 'Probe health', sub: 'gaps · stuck', detail: 'Offline probes, gaps, imputed share and stuck sensors found as flat-line hours.' },
    ],
    lane: { label: 'Dagster', text: 'assets · schedules · dbt tests and live-feed checks', from: 2, to: 4 },
    flows: [
      {
        id: 'irrigation',
        name: 'Irrigation advice',
        summary: 'Probe moisture and real weather combined into today’s advice: how many millimetres, which field, and why.',
        facts: ['FAO-56 water balance', '48 h rain forecast', '30 dbt tests'],
        edges: ['probes>gateway', 'gateway>readings', 'readings>dbt', 'meteo>weather', 'weather>dbt', 'dbt>advice'],
      },
      {
        id: 'crops',
        name: 'Crop recommendation',
        summary: 'Each field’s measured soil and climate scored against 22 crops by a model and by profile fit.',
        facts: ['99.6 % CV accuracy', 'current crop first on 6/8 fields'],
        edges: ['readings>dbt', 'weather>dbt', 'dbt>recs', 'model>recs'],
      },
      {
        id: 'health',
        name: 'Probe health',
        summary: 'Dropouts, stuck sensors and spikes caught at the edge and in the models, before anyone trusts the data.',
        facts: ['gaps recorded, not invented', 'stuck sensors detected'],
        edges: ['probes>gateway', 'gateway>readings', 'readings>dbt', 'dbt>health'],
      },
    ],
  } satisfies ArchMap,
};

export const moreProjects: { name: string; flow: string[]; note: string; href?: string; internal?: boolean }[] = [
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
    name: 'Docker Inspector',
    flow: ['Docker Engine API', 'SQLite history', 'crash analyser', 'desktop UI'],
    note: 'Open-source flight recorder for containers: crash diagnosis and 7-day history.',
    href: '/work/docker-inspector/',
    internal: true,
  },
];

/** Grouped like the layers of a data platform. */
export const toolbox = [
  { layer: 'Ingest', tools: ['Apache NiFi', 'Kafka', 'MQTT', 'n8n', 'REST & carrier APIs', 'Playwright'] },
  { layer: 'Process', tools: ['Spark', 'Azure Databricks', 'dbt', 'DuckDB', 'pandas', 'Delta Live Tables'] },
  { layer: 'Store', tools: ['PostgreSQL', 'PostGIS', 'TimescaleDB', 'Delta Lake', 'ADLS Gen2', 'Parquet', 'BigQuery'] },
  { layer: 'Orchestrate', tools: ['Airflow', 'Dagster', 'Docker', 'GitHub Actions'] },
  { layer: 'Serve', tools: ['FastAPI', 'Node.js · Fastify', 'Superset', 'Grafana'] },
  { layer: 'AI & ML', tools: ['LLM agents', 'LangGraph', 'MLflow', 'LightGBM', 'scikit-learn', 'PyTorch', 'OCR'] },
  { layer: 'Languages', tools: ['Python', 'SQL', 'TypeScript', 'Go'] },
];

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
      'Designed and run the data and AI platform of a sea, road and air freight product: ingestion with Apache NiFi and n8n, Python pipelines, PostgreSQL/PostGIS, ADLS Gen2 and Databricks.',
      'Six production systems on it, from real-time track & trace and cold-chain risk to document AI and analytics (see the architecture above).',
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
    'I’m an AI & data engineer in Agadir, Morocco. I design data platforms end to end: ingestion, data quality, storage, orchestration and serving, then AI that explains what the data says, using numbers the pipeline has already verified.',
    'Since December 2023 I have built and run the data and AI side of Freshtrack, a freight platform for sea, road and air. Before that: data engineering at Brocoli Data, ML at AGILISYS, and a Master’s in Big Data & AI.',
  ],
  facts: [
    { label: 'Based in', value: 'Agadir, Morocco' },
    { label: 'Focus', value: 'Data platforms · pipelines · applied AI' },
    { label: 'Education', value: 'MSc Big Data & AI, Ibn Zohr University' },
    { label: 'Recognition', value: 'NASA Space Apps 2026: Galactic Problem Solver' },
  ],
};

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
