import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';
import { SectionWrapper } from './SectionWrapper';

const skills = skillsData;

interface Skill {
    name: string;
    icon: React.ElementType;
}

const SkillCategory = ({ title, items }: { title: string, items: Skill[] }) => (
    <div className="mb-12">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
            <span className="w-1 h-6 rounded-full bg-accent-primary" />
            {title}
        </h3>
        <div className="flex flex-wrap gap-4">
            {items.map((skill, idx) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-4 rounded-xl flex items-center gap-3 group cursor-default border border-white/5 hover:border-accent-primary/30 flex-grow md:flex-grow-0 bg-rich-surface/30 hover:bg-rich-surface/50"
                >
                    <div className="p-2 rounded-lg bg-white/5 text-accent-primary-muted group-hover:text-white transition-colors">
                        <skill.icon className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-rich-text-muted font-medium group-hover:text-white transition-colors whitespace-nowrap">
                        {skill.name}
                    </span>
                </motion.div>
            ))}
        </div>
    </div>
);

export const Skills = () => {
    return (
        <SectionWrapper id="skills" className="bg-rich-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Technical Arsenal
                    </motion.h2>
                    <motion.div
                        className="h-1 w-20 bg-accent-primary mx-auto rounded-full opacity-50"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                    />
                </div>

                <div className="max-w-6xl mx-auto">
                    <SkillCategory title="Frontend Development" items={skills.frontend} />
                    <SkillCategory title="Backend Engineering" items={skills.backend} />
                    <div className="grid md:grid-cols-2 gap-8">
                        <SkillCategory title="Database Architecture" items={skills.database} />
                        <SkillCategory title="Core Concepts" items={skills.core} />
                    </div>
                    <SkillCategory title="DevOps & Tools" items={skills.tools} />
                </div>
            </div>
        </SectionWrapper>
    );
};
