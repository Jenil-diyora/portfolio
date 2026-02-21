import {
    Code2,
    Layout,
    FileType,
    Database,
    Server,
    Terminal,
    Cpu,
    Globe,
    Workflow,
    Layers,
    Wrench,
    Zap,
    Box,
    Smartphone
} from 'lucide-react';
import type { ElementType } from 'react';

interface Skill {
    name: string;
    icon: ElementType;
    description: string;
}

export const skillsData = {
    frontend: [
        { name: "HTML", icon: Layout, description: "Semantic page structure built for accessibility and clean SEO foundations." },
        { name: "CSS", icon: Layout, description: "Modern layouts, animations, and responsive systems for polished interfaces." },
        { name: "JavaScript", icon: FileType, description: "Interactive client-side behavior with performance-focused logic and state flow." },
        { name: "TypeScript", icon: Code2, description: "Strongly typed front-end architecture to reduce runtime bugs and scale faster." },
        { name: "React JS", icon: Code2, description: "Component-driven UI development with reusable patterns and clean state management." },
        { name: "React Native", icon: Smartphone, description: "Cross-platform mobile app interfaces with native-feel interactions and navigation." },
        { name: "Tailwind CSS", icon: Layout, description: "Utility-first design workflow for fast, consistent, and maintainable styling." },
        { name: "Redux", icon: Layers, description: "Predictable client state management for complex flows and real-time interactions." },
        { name: "Bootstrap", icon: Layout, description: "Rapid responsive UI composition for delivery-focused product interfaces." },
    ],
    backend: [
        { name: "C#", icon: Terminal, description: "Object-oriented service logic with clean domain modeling and robust error handling." },
        { name: ".NET Core", icon: Server, description: "Scalable backend services and APIs engineered for production-grade workloads." },
        { name: "Web API", icon: Globe, description: "RESTful endpoint design with secure contracts, versioning, and validation strategy." },
        { name: "FastAPI", icon: Zap, description: "High-performance Python APIs with clear schema definitions and quick iteration speed." },
        { name: "Python", icon: FileType, description: "Backend scripting, automation, and data processing for practical engineering needs." },
        { name: "Entity Framework", icon: Database, description: "ORM-driven data access with optimized queries and maintainable data layers." },
        { name: "Node.js", icon: Server, description: "JavaScript runtime used for building lightweight backend services and APIs." },
        { name: "API Versioning", icon: Globe, description: "Versioned endpoint strategy to support backward compatibility and stable integrations." },
    ],
    database: [
        { name: "MS SQL Server", icon: Database, description: "Relational database design, indexing, and query optimization for enterprise workloads." },
        { name: "PostgreSQL", icon: Database, description: "Reliable open-source relational systems with structured schema and analytics support." },
        { name: "Firebase", icon: Zap, description: "Realtime cloud-backed data and authentication integration for rapid product delivery." },
        { name: "Query Optimization", icon: Database, description: "Execution-plan aware query tuning to reduce latency and improve throughput." },
        { name: "Database Performance Tuning", icon: Cpu, description: "Indexing, schema refinement, and workload balancing for production stability." },
    ],
    core: [
        { name: "OOP", icon: Box, description: "Encapsulation, abstraction, and reusable architecture principles applied in real systems." },
        { name: "Collections", icon: Layers, description: "Efficient data structure selection to improve performance and code clarity." },
        { name: "Multithreading", icon: Cpu, description: "Concurrent processing design for responsive and high-throughput application behavior." },
        { name: "Clean Architecture", icon: Layers, description: "Layered architecture that keeps business logic isolated and maintainable at scale." },
        { name: "SDLC Practices", icon: Workflow, description: "Structured development lifecycle practices for consistent delivery and quality." },
    ],
    tools: [
        { name: "Swagger", icon: Workflow, description: "API contract documentation and testing workflows aligned with developer experience." },
        { name: "Postman", icon: Wrench, description: "Endpoint verification, collections, and collaboration for reliable integration testing." },
        { name: "Docker", icon: Box, description: "Containerized development and deployment for consistent environments across stages." },
        { name: "Azure", icon: Globe, description: "Cloud platform usage for hosting, scaling, and supporting production applications." },
    ]
} satisfies Record<string, Skill[]>;
