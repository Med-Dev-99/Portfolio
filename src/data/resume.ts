/**
 * Resume-only content: rendered into the PDF by `npm run resume`.
 * The website never imports this file, so the phone number stays out of the HTML.
 */

export const contact = {
  phone: '+212 652 923 251',
  website: 'mohamedelkorchi.com',
  linkedin: 'linkedin.com/in/mohamedelkorchi',
  github: 'github.com/Med-Dev-99',
};

export const summary =
  'AI & Data Engineer with 3+ years building real-time data platforms in production. At Freshtrack I own data and AI for a sea, road and air logistics platform: carrier APIs, AIS feeds, truck IoT sensors and partner emails flow through Apache NiFi, n8n and Python pipelines into one validated event model that drives track & trace, cold-chain and demurrage risk alerts, ETA models, document AI and carrier analytics. Recently built the data platform and grounded AI agent of FIREBRIDGE for the NASA Space Apps Challenge 2026 (666.9M satellite records), and open-source streaming lakehouse, MLOps and IoT analytics platforms. Strong foundation in machine learning, NLP and LLM agents.';

export const projects = [
  {
    name: 'FIREBRIDGE: NASA Space Apps Challenge 2026',
    meta: 'Data platform & AI agent · team of 4 · ogote.com',
    stack: 'Airflow 3 · dbt · Parquet · DuckDB · PostgreSQL/PostGIS · FastAPI · Fastify · React · Docker · GitHub Actions',
    points: [
      'Built resumable acquisition and audit of NASA FIRMS fire records for 5 satellites (MODIS, VIIRS) and Landsat: 666.9M rows in a 23.3 GiB Parquet lake, 4,202 download windows audited, orchestrated by 10 Airflow DAGs.',
      'Published immutable, versioned releases to PostgreSQL/PostGIS with dbt models and data tests; regional spatial indexes cut analysis time-to-ready from 25.5 s to 4.7 s.',
      'Built a grounded AI agent (FastAPI, Groq LLMs): evidence engine and number guard that verify every figure, rate-limit-aware fallback across 4 models, short/long-term memory, prompt-injection screening in 7 languages; 138 tests.',
      'Main contributor to the React/MapLibre web app and Fastify/BullMQ API; CI/CD on GitHub Actions (tests, secret and image scans, GHCR) deploying hardened Docker Compose stacks.',
    ],
  },
  {
    name: 'Predictive Maintenance: real-time streaming & MLOps platform',
    meta: 'Sole author · github.com/Med-Dev-99/Predictive_maintenance',
    stack: 'Kafka (KRaft) · Spark Structured Streaming · Delta Lake on S3 · MLflow · LightGBM · Airflow 3 · PostgreSQL · FastAPI · Grafana · Docker · GitHub Actions',
    points: [
      'Streams telemetry from a simulated 20-machine fleet (AI4I 2020 failure physics) through Kafka into a Delta Lake medallion lakehouse: data contract with a quarantine that keeps every rejection reason, watermark deduplication (0 duplicates in Silver), late-data MERGE, and exactly-once writes into PostgreSQL through a transactional batch ledger.',
      'Scores every production cycle with a LightGBM champion hot-reloaded from the MLflow registry and alerts before failures, naming the failure rule in numbers: 67–76 % recall on predictable failures at 98 % precision, with a median of 8 cycles’ warning; every alert is graded automatically as confirmed, false alarm or preempted.',
      'Airflow retrains hourly on SQL-labelled Silver data and promotes a challenger only when its PR-AUC improves (v2 → v5 promoted, v6–v7 kept as challengers); a 15-minute data-quality DAG caught a real outage. CI runs Spark tests and a full-stack end-to-end check.',
    ],
  },
  {
    name: 'Smart Farming: IoT & analytics engineering platform',
    meta: 'Sole author · github.com/Med-Dev-99/smart-farming',
    stack: 'MQTT · Python · TimescaleDB · dbt · Dagster · scikit-learn · Open-Meteo API · Grafana · Docker · GitHub Actions',
    points: [
      'Simulated soil probes on 8 fields at real Souss-Massa farm locations report over MQTT; an edge gateway validates each message against a contract, deduplicates, interpolates short gaps, records long ones and flags spikes.',
      'TimescaleDB hypertable with compression and a continuous aggregate; 12 dbt models and 30 tests turn probe data and real Open-Meteo weather into FAO-56 irrigation advice, crop suitability and probe health, orchestrated as Dagster assets with asset checks.',
      'Random-forest crop recommender (22 crops, 99.6 % cross-validated accuracy) applied to each field’s measured soil and climate; CI runs dbt build against a TimescaleDB service container.',
    ],
  },
  {
    name: 'Docker Inspector: open-source Linux desktop app',
    meta: 'Sole author · github.com/Med-Dev-99/Docker-inspector',
    stack: 'Electron · React 19 · TypeScript · Node.js · SQLite · WebSocket · Docker Engine API',
    points: [
      'Records container metrics and events locally; diagnoses crashes in plain English with evidence, last logs and pre-crash metrics; 7-day time-machine history.',
      'Configuration auditor flags UFW-bypassing ports, secrets in environment variables and missing limits, with one-click fixes; hardened image (read-only, no capabilities, token and Host/Origin checks).',
    ],
  },
];

export const resumeSkills = [
  { group: 'Data engineering', items: 'Apache NiFi, Kafka, Spark (Structured Streaming), Delta Lake, Airflow, Dagster, dbt, Delta Live Tables, Parquet/Arrow, DuckDB, ELT, data contracts, event modelling (DCSA)' },
  { group: 'Geo & IoT data', items: 'PostGIS, GeoJSON geofencing, AIS vessel data, MQTT, TimescaleDB, GPS / temperature / soil sensor streams' },
  { group: 'Cloud', items: 'Azure Databricks, ADLS Gen2, BigQuery, AWS S3 & Lambda, Google Cloud Storage & Functions' },
  { group: 'Databases', items: 'PostgreSQL, PostGIS, TimescaleDB, MongoDB, Cassandra, SQLite, Redis' },
  { group: 'AI / ML', items: 'LLM agents, MLOps (MLflow registry, champion/challenger), predictive maintenance, OCR & document AI, ETA modelling, LightGBM, PyTorch, scikit-learn, HuggingFace, LangChain/LangGraph' },
  { group: 'Automation & DevOps', items: 'n8n, FastAPI, Flask, Node.js/Fastify, Docker, GitHub Actions, Linux, REST APIs, Superset' },
  { group: 'Languages', items: 'Python, SQL, TypeScript, Java, Go, C/C#, Dart' },
];
