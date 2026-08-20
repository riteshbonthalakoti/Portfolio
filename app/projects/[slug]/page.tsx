import ProjectContent from "./ProjectContent";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectContent slug={slug} />;
}
