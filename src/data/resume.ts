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
  'Data Engineer with 3+ years building scalable data platforms, ELT pipelines and real-time systems in production with Apache NiFi, Azure Databricks (Spark), ADLS Gen2, Airflow, dbt and PostgreSQL/PostGIS. Recently built the data platform and grounded AI agent of FIREBRIDGE for the NASA Space Apps Challenge 2026: 666.9M satellite records acquired, audited and served through versioned releases. Strong foundation in machine learning, NLP and LLM agents.';

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
    name: 'Docker Inspector: open-source Linux desktop app',
    meta: 'Sole author · github.com/Med-Dev-99/Docker-inspector',
    stack: 'Electron · React 19 · TypeScript · Node.js · SQLite · WebSocket · Docker Engine API',
    points: [
      'Records container metrics and events locally; diagnoses crashes in plain English with evidence, last logs and pre-crash metrics; 7-day time-machine history.',
      'Configuration auditor flags UFW-bypassing ports, secrets in environment variables and missing limits, with one-click fixes; hardened image (read-only, no capabilities, token and Host/Origin checks).',
    ],
  },
  {
    name: 'IoT Sensor Streaming Platform',
    meta: '',
    stack: 'Kafka · Spark · MongoDB Atlas · Grafana',
    points: ['Ingested simulated sensor streams with Kafka, stored them in MongoDB Atlas, analysed at scale with Spark and built Grafana dashboards.'],
  },
  {
    name: 'Twitter ETL & Analytics',
    meta: '',
    stack: 'Python · Pentaho PDI · PostgreSQL',
    points: ['ETL pipeline from the Twitter API into PostgreSQL with analytical reporting.'],
  },
];

export const resumeSkills = [
  { group: 'Data engineering', items: 'Apache Spark, Kafka, NiFi, Airflow, dbt, Delta Live Tables, Parquet/Arrow, DuckDB, ELT, streaming' },
  { group: 'Cloud', items: 'Azure Databricks, ADLS Gen2, BigQuery, AWS S3 & Lambda, Google Cloud Storage & Functions' },
  { group: 'Databases', items: 'PostgreSQL, PostGIS, MongoDB, Cassandra, SQLite, Redis' },
  { group: 'AI / ML', items: 'PyTorch, TensorFlow, scikit-learn, HuggingFace, LangChain/LangGraph, LLM agents, OCR, NLP' },
  { group: 'Backend & DevOps', items: 'FastAPI, Flask, Node.js/Fastify, Docker, GitHub Actions, Linux, n8n, REST APIs' },
  { group: 'Languages', items: 'Python, SQL, TypeScript, Java, Go, C/C#, Dart' },
];
