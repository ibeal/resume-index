// Canonical skill/tool/role terms tuned to Ian Beal's stack and domain
export const taxonomy: string[] = [
  // Languages
  "C#", "Rust", "TypeScript", "JavaScript", "Elixir", "Python", "SQL",
  "HTML", "CSS", "Bash", "Shell",

  // Open source / AI tooling
  "MCP", "Model Context Protocol", "open source", "GitHub Actions", "theming",

  // Runtimes & Frameworks — Backend
  ".NET", ".NET Framework", ".NET 8", "ASP.NET", "Phoenix", "OTP",
  "Bun.js", "Node.js", "Express", "FastAPI", "Django",

  // Frontend
  "React", "Angular", "Vue", "Next.js", "Vite",

  // API & Protocol
  "REST", "GraphQL", "gRPC", "WebSocket", "tRPC",

  // Databases
  "SQL Server", "PostgreSQL", "Postgres", "MySQL", "SQLite",
  "MongoDB", "DynamoDB", "Redis", "Redshift",

  // ORM / Query
  "Drizzle ORM", "Entity Framework", "Dapper",

  // Messaging & Streaming
  "RabbitMQ", "Kafka", "SQS", "NATS", "dead-letter queue", "DLQ",

  // Cloud — Azure
  "Azure", "Azure App Service", "Azure Functions", "Azure SQL",
  "Azure VM", "Azure DevOps", "Azure Database Migration Service", "DMS",
  "Managed Identity", "Azure Repos", "Azure Boards", "Azure Pipelines",

  // Cloud — AWS
  "AWS", "AWS SES", "AWS S3", "S3", "SES", "Cognito", "Lambda",
  "AWS Lambda", "CloudWatch",

  // Infrastructure & DevOps
  "Docker", "Kubernetes", "Terraform", "Helm",
  "CI/CD", "GitHub Actions", "CircleCI", "Jenkins",
  "LaunchDarkly", "feature flags",

  // Monitoring & Observability
  "Datadog", "Grafana", "Prometheus", "OpenTelemetry",
  "alerting", "telemetry", "monitoring",

  // Testing
  "Cypress", "Jest", "Vitest", "Playwright", "RSpec", "ExUnit",
  "end-to-end testing", "unit testing", "integration testing", "TDD",

  // Version Control & PM
  "Git", "GitHub", "Azure DevOps Repos", "Jira", "Linear", "ServiceNow",

  // Enterprise / Domain-specific
  "D365", "Dynamics 365", "ILMT", "BFI", "ILS",
  "IBM licensing", "IBM ILMT", "IBM BFI", "ILMT API", "BFI API",
  "SAM", "software asset management", "FHIR", "HIPAA", "SOC2",

  // Security
  "CSP", "content security policy", "OAuth", "JWT", "SAML",
  "secret management", "credential rotation", "security remediation",
  "nonce", "Managed Identity",

  // Certifications
  "Azure Associate Developer", "GitHub Foundations",
  "AZ-204", "certification",

  // Patterns & Paradigms
  "microservices", "monolith", "serverless", "event-driven",
  "provider abstraction", "dependency injection", "dependency inversion",
  "async", "concurrent", "distributed systems",
  "domain-driven design", "DDD", "CQRS", "SOLID",

  // Roles & Seniority
  "software engineer", "staff engineer", "senior engineer",
  "tech lead", "engineering manager", "full-stack", "backend",
  "frontend", "platform engineer", "SRE", "DevOps",
  "QA engineer", "quality assurance", "IT analyst",

  // Domain Tags & Soft Skills
  "leadership", "mentorship", "hiring", "code review",
  "incident response", "on-call", "RCA", "root cause analysis",
  "agile", "scrum", "kanban",
  "API design", "system design", "architecture",
  "performance", "latency", "scalability", "reliability",
  "database migration", "ETL", "data pipeline",
  "automation", "catalog", "catalog automation",
  "notifications", "notification microservice",
  "knowledge sharing", "guild", "documentation",
  "greenfield", "migration", "legacy modernization",
];
