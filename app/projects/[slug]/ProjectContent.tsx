"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, useTime, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { Card, Chip } from "@heroui/react";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  Code2,
  Smartphone,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Cog,
  Server,
  Blocks,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

import { projects } from "@/data/projects";

export default function ProjectContent({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAllImages, setShowAllImages] = useState(false);

  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const time = useTime();

  const row1X = useTransform([smoothX, time], ([x, t]) => {
    const mouseShift = (Number(x) - 0.5) * 50;
    const autoShift = (Number(t) / 150) % 100;
    return `${-10 + mouseShift - autoShift}%`;
  });

  const row2X = useTransform([smoothX, time], ([x, t]) => {
    const mouseShift = (Number(x) - 0.5) * -50;
    const autoShift = (Number(t) / 200) % 100;
    return `${-20 + mouseShift + autoShift}%`;
  });

  const row3X = useTransform([smoothX, time], ([x, t]) => {
    const mouseShift = (Number(x) - 0.5) * 30;
    const autoShift = (Number(t) / 180) % 100;
    return `${-15 + mouseShift - autoShift}%`;
  });

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set((x - 0.5) * 2);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button color="primary" as={Link} href="/projects">
            View All Projects
          </Button>
        </div>
      </div>
    );
  }

  const imgs = project.screenshots.length > 0 ? project.screenshots : [project.image];
  const strip = [...imgs, ...imgs, ...imgs, ...imgs];

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <Link
          href="/projects"
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <div className="absolute inset-0 flex flex-col gap-3 opacity-60">
          <motion.div style={{ x: row1X }} className="flex gap-3 flex-shrink-0 h-[33%]">
            {strip.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-[360px] h-full rounded-xl overflow-hidden">
                <Image fill src={src} alt="" className="object-cover" />
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: row2X }} className="flex gap-3 flex-shrink-0 h-[33%]">
            {[...strip].reverse().map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-[360px] h-full rounded-xl overflow-hidden">
                <Image fill src={src} alt="" className="object-cover" />
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: row3X }} className="flex gap-3 flex-shrink-0 h-[33%]">
            {strip.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-[360px] h-full rounded-xl overflow-hidden">
                <Image fill src={src} alt="" className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-end pb-16 px-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 max-w-lg border border-white/10 pointer-events-auto"
          >
            <div className="flex items-center gap-2 text-sm text-white/40 font-mono mb-3">
              <span>{project.category}</span>
              <span className="text-white/20">·</span>
              <span>{project.title} Project</span>
            </div>

            <h1 className="text-5xl font-bold font-grotesk mb-3 text-white">
              {project.title}
            </h1>

            <p className="text-white/60 text-lg mb-5 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-white/40 font-mono mb-6">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Lead Developer
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {project.techStack.length} technologies
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2 bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-20">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-primary" />
                  </span>
                  <h2 className="text-2xl font-bold font-grotesk">Project Overview</h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {project.content.overview}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </span>
                  <h2 className="text-2xl font-bold font-grotesk">Development Process</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white/[0.03] border-white/10 p-6">
                    <h3 className="font-bold text-white mb-3">Challenges</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{project.content.challenges}</p>
                  </Card>
                  <Card className="bg-white/[0.03] border-white/10 p-6">
                    <h3 className="font-bold text-white mb-3">Solutions</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{project.content.solutions}</p>
                  </Card>
                </div>
                <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-white">Results & Impact</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{project.content.results}</p>
                </Card>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </span>
                  <h2 className="text-2xl font-bold font-grotesk">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:border-primary/20 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            <aside className="space-y-6">
              <div className="sticky top-8 space-y-6">
                <Card className="bg-white/[0.03] border-white/10 p-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Cog className="w-4 h-4 text-primary" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Chip
                        key={tech}
                        className="bg-white/5 text-white/70 border border-white/10 text-xs"
                      >
                        {tech}
                      </Chip>
                    ))}
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
