export interface DocSection {
  title: string;
  content: string;
  code?: {
    language: string;
    content: string;
  }[];
}

export interface DocPageData {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: DocSection[];
  lastUpdated: string;
  contributors: {
    name: string;
    image: string;
    github: string;
  }[];
  githubUrl: string;
  stars: number;
}

export const docPages: DocPageData[] = [
  {
    slug: "getting-started",
    title: "Getting Started with Hero UI",
    description:
      "Learn how to install and set up Hero UI in your Next.js project.",
    category: "Introduction",
    sections: [
      {
        title: "Installation",
        content: "Install Hero UI using your preferred package manager:",
        code: [
          {
            language: "bash",
            content: "npm install @heroui/react",
          },
          {
            language: "bash",
            content: "yarn add @heroui/react",
          },
          {
            language: "bash",
            content: "pnpm add @heroui/react",
          },
        ],
      },
      {
        title: "Configuration",
        content:
          "Configure Hero UI in your project by adding the following to your tailwind.config.js:",
        code: [
          {
            language: "javascript",
            content: `module.exports = {
  content: [
    './node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
      },
    },
  },
  plugins: [
    require('@heroui/plugin'),
  ],
}`,
          },
        ],
      },
      {
        title: "Basic Usage",
        content: "Import and use Hero UI components in your React components:",
        code: [
          {
            language: "typescript",
            content: `import { Button } from '@heroui/button';
import { Card } from '@heroui/react';

export default function Example() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to Hero UI
      </h2>
      <Button color="primary">
        Get Started
      </Button>
    </Card>
  );
}`,
          },
        ],
      },
    ],
    lastUpdated: "2024-03-15",
    contributors: [
      {
        name: "Andrew Paulson",
        image: "https://github.com/andrewpaulson.png",
        github: "https://github.com/andrewpaulson",
      },
    ],
    githubUrl: "https://github.com/heroui/react",
    stars: 1234,
  },
];
