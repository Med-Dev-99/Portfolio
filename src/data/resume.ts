/**
 * Resume-only content: rendered into the PDF by `npm run resume`.
 * The website never imports this file, so the phone number stays out of the HTML.
 */

export const contact = {
  phone: '+212 652 923 251',
  website: 'mohamedelkorchi.com',
  linkedin: 'linkedin.com/in/mohamedelkorchi',
  github: 'github.com/Med-Dev-99',
  mobility: 'Open to remote or relocation',
};

/** The line under the name: the job title ATS and recruiters read first. */
export const headline = 'Data Engineer | Real-time Pipelines, Lakehouse & Applied AI';

export const summary =
  'Data Engineer with 3+ years turning messy, real-world data into reliable production platforms. Starts from the problem, designs the simplest system that solves it and ships it end to end: ingestion, data quality, modeling, orchestration and applied AI with Python, SQL, Spark, Kafka, Airflow and dbt. Aiming to build larger data platforms people trust and act on.';

export const projects = [
  {
    name: 'FIREBRIDGE: NASA Space Apps Challenge 2026',
    role: 'Data platform & AI agent, team of 4; data analyzed before the event, platform built during the hackathon',
    link: 'ogote.com',
    stack: 'Airflow 3, dbt, Parquet, DuckDB, PostgreSQL/PostGIS, FastAPI, Fastify, React, Docker, GitHub Actions',
    points: [
      'Built resumable acquisition and auditing of NASA FIRMS fire records from 5 MODIS/VIIRS satellites and Landsat: 666.9M rows in a 23.3 GiB Parquet lake, 4,202 download windows audited, orchestrated by 10 Airflow DAGs.',
      'Published immutable, versioned releases to PostgreSQL/PostGIS with dbt models and data tests; regional spatial indexes cut analysis time-to-ready from 25.5 s to 4.7 s.',
      'Built a grounded AI agent (FastAPI, Groq LLMs) whose evidence engine and number guard verify every figure, with fallback across 4 models, memory and prompt-injection screening in 7 languages; 138 tests.',
      'Built most of the React/MapLibre web app and the Fastify/BullMQ API; set up CI/CD on GitHub Actions (tests, secret and image scans, GHCR) deploying hardened Docker Compose stacks.',
    ],
  },
  {
    name: 'Predictive Maintenance: real-time streaming & MLOps platform',
    role: 'Sole author',
    link: 'github.com/Med-Dev-99/Predictive_maintenance',
    stack: 'Kafka, Spark Structured Streaming (PySpark), Delta Lake, S3, MLflow, LightGBM, Airflow 3, PostgreSQL, FastAPI, Grafana, Docker, GitHub Actions',
    points: [
      'Built a streaming lakehouse: telemetry from a simulated 20-machine fleet flows through Kafka and Spark Structured Streaming into Delta Lake (bronze/silver/gold) with a data contract, quarantine, watermark deduplication and exactly-once writes to PostgreSQL.',
      'Scored every production cycle with a LightGBM model served from the MLflow registry: alerts come a median of 8 cycles before failure and catch 67-76% of predictable failures (across three promoted model versions) at 98% precision.',
      'Automated retraining with Airflow (hourly champion/challenger, promoted only when PR-AUC improves) and data-quality checks every 15 minutes; CI runs Spark tests and a full-stack end-to-end check.',
    ],
  },
  {
    name: 'Smart Farming: IoT & analytics engineering platform',
    role: 'Sole author',
    link: 'github.com/Med-Dev-99/smart-farming',
    stack: 'MQTT, Python, TimescaleDB, dbt, Dagster, scikit-learn, Open-Meteo API, Grafana, Docker, GitHub Actions',
    points: [
      'Built an MQTT edge gateway for soil probes on 8 fields (simulated sensors, real farm locations): contract validation, deduplication, gap filling and spike flags.',
      'Modeled the data in TimescaleDB (hypertable, continuous aggregate) and 12 dbt models with 30 tests, joining real Open-Meteo weather into FAO-56 irrigation advice, crop suitability and sensor health; orchestrated with Dagster.',
      'Added a random-forest crop recommender, applied to each field\'s measured soil and climate.',
    ],
  },
];

/** Only skills the experience or projects above show in use. */
export const resumeSkills = [
  { group: 'Programming', items: 'Python, SQL, TypeScript, Go' },
  { group: 'Data engineering', items: 'Apache Spark (PySpark, Structured Streaming), Apache Kafka, Apache NiFi, Apache Airflow, Dagster, dbt, Delta Lake, Delta Live Tables, DuckDB, Parquet, pandas' },
  { group: 'Data practices', items: 'ETL/ELT, batch and streaming pipelines, data modeling, data warehousing, lakehouse (medallion architecture), data quality, data contracts, geospatial and IoT sensor data (MQTT, GPS, AIS)' },
  { group: 'Cloud', items: 'Azure (Databricks, ADLS Gen2), AWS (S3, Lambda), GCP (BigQuery, GCS, Cloud Functions)' },
  { group: 'Databases', items: 'PostgreSQL, PostGIS, TimescaleDB, Redis, SQLite' },
  { group: 'ML & AI', items: 'scikit-learn, LightGBM, PyTorch, MLflow, LLM agents, Hugging Face, NLP, OCR and document AI' },
  { group: 'DevOps & BI', items: 'Docker, GitHub Actions (CI/CD), Git, Linux, FastAPI, REST APIs, n8n, Apache Superset, Grafana' },
];

/**
 * Certifications as the resume lists them. The NASA Space Apps "Galactic Problem Solver"
 * certificate goes to every team that submits a project, so it is not listed as an award;
 * the FIREBRIDGE project already shows the participation.
 */
export const resumeCredentials = [
  { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI & Stanford Online' },
  { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI' },
  { name: 'Natural Language Processing Specialization', issuer: 'DeepLearning.AI' },
];

export const spokenLanguages = 'Arabic (native), French (professional working proficiency), English (professional working proficiency)';
