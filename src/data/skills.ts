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
    Binary,
    Layers,
    Wrench,
    Zap,
    Box
} from 'lucide-react';
import type { ElementType } from 'react';

interface Skill {
    name: string;
    icon: ElementType;
}

export const skillsData: Record<string, Skill[]> = {
    frontend: [
        { name: "HTML", icon: Layout },
        { name: "CSS", icon: Layout },
        { name: "JavaScript", icon: FileType },
        { name: "TypeScript", icon: Code2 },
        { name: "React.js", icon: Code2 },
        { name: "Tailwind CSS", icon: Layout },
    ],
    backend: [
        { name: "C#", icon: Terminal },
        { name: ".NET Core", icon: Server },
        { name: "Web API", icon: Globe },
        { name: "FastAPI", icon: Zap },
        { name: "Python", icon: FileType },
        { name: "Entity Framework", icon: Database },
    ],
    database: [
        { name: "MS SQL Server", icon: Database },
        { name: "PostgreSQL", icon: Database },
    ],
    core: [
        { name: "OOP", icon: Box },
        { name: "Collections", icon: Layers },
        { name: "Multithreading", icon: Cpu },
    ],
    tools: [
        { name: "Swagger", icon: Workflow },
        { name: "Postman", icon: Wrench },
    ]
};
