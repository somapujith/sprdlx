import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'BlueCell Bio',
    category: 'Brand & Website',
    image: 'https://picsum.photos/seed/bluecell/1600/900'
  },
  {
    id: 2,
    title: 'Framer',
    category: 'Templates & Assets',
    image: 'https://picsum.photos/seed/framer/1600/900'
  },
  {
    id: 3,
    title: 'Y Combinator',
    category: 'Digital Product',
    image: 'https://picsum.photos/seed/yc/1600/900'
  }
];

export default function Projects() {
  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const ProjectCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="group flex flex-col gap-6 cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-zinc-900">
        <motion.img 
          style={{ y, scale: 1.15 }}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white text-black px-6 py-3 rounded-full font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            View Project
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <h3 className="text-2xl md:text-3xl font-medium">{project.title}</h3>
        <p className="text-zinc-400 text-sm md:text-base">{project.category}</p>
      </div>
    </div>
  );
}
