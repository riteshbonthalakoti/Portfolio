import DocContent from "./DocContent";
import { docPages } from "@/data/docs-data";

export function generateStaticParams() {
  return docPages.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DocContent slug={slug} />;
}
