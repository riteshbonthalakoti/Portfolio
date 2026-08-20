import MarketplaceContent from "./MarketplaceContent";
import { marketplaceItems } from "@/data/marketplace-data";

export function generateStaticParams() {
  return marketplaceItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MarketplaceContent slug={slug} />;
}
