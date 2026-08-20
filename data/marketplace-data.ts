export interface MarketplaceItem {
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  tags: string[];
  seller: {
    name: string;
    image: string;
    rating: number;
  };
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    slug: "premium-wordpress-theme",
    title: "Premium WordPress Theme",
    description:
      "A modern and responsive WordPress theme perfect for business websites.",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    category: "WordPress",
    tags: ["WordPress", "Theme", "Business"],
    seller: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      rating: 4.8,
    },
  },
];
