
import type { Metadata } from 'next';

export type SocialLink = {
  label: string;
  url: string;
  icon?: string;
};


export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export interface SiteConfig {
  siteName: string;
  domain: string;
  description: string;

  about: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  author: string;
  author_img: string;

  theme: {
    default: 'light' | 'dark';
    allowSystem: boolean;
  };
  links: {
    twitter: string;
    github: string;
    linkedin: string;
    email: string;
  };
  social: SocialLink[];
  navigation: NavItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
    image?: string;
    imageAlt?: string;
    locale?: string;
    type?: string;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    robots?: string;
    themeColor?: string;
  };

}

export const siteConfig: SiteConfig = {
  siteName: 'Pranav Gupta',
  domain: 'pranavgg.me',
  author: 'Pranav Gupta',
  description: 'Software Development Engineer creating robust backend architectures and seamless frontend experiences',
  about:
    'I engineer robust backend architectures and seamless frontend experiences, prioritizing performance and security over decorative elements. My focus is on shipping functional, scalable products using RESTful APIs and secure JWT authentication.',
  author_img: '/author.jpg',
  keywords: [
  "Pranav Gupta",
  "PranavGupta",
  "Pranav GG",
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Web Developer",
  "Portfolio",
  "Developer Portfolio",
  "Software Developer",
  "Computer Science Engineer",
  "Open Source",
  "Open Source Contributor",
  "GitHub",
  "GitHub Portfolio",
  "Git",
  "GitHub Projects",
  "Next.js",
  "React",
  "React.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "REST API",
  "API Development",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "SQL",
  "Tailwind CSS",
  "TailwindCSS",
  "shadcn/ui",
  "Framer Motion",
  "Responsive Design",
  "UI/UX",
  "Modern Web Development",
  "Web Applications",
  "Authentication",
  "OAuth",
  "Better Auth",
  "JWT",
  "System Design",
  "Data Structures",
  "Algorithms",
  "DSA",
  "LeetCode",
  "Competitive Programming",
  "Java",
  "Python",
  "C++",
  "Machine Learning",
  "Artificial Intelligence",
  "AI",
  "Generative AI",
  "LLMs",
  "Prompt Engineering",
  "Developer",
  "Tech Portfolio",
  "Programming",
  "Coding",
  "Cloud Computing",
  "AWS",
  "Vercel",
  "Docker",
  "Linux",
  "Software Development",
  "Full Stack Projects",
  "Next.js Portfolio",
  "React Portfolio",
  "Portfolio Website"
],
  ogImage: '/favicon.ico',
  twitterHandle: '@PranavGupta',

  theme: {
    default: 'dark',
    allowSystem: true,
  },
  links: {
    twitter: 'https://x.com/pranavvgg',
    github: 'https://github.com/PranavShadow',
    linkedin: 'https://www.linkedin.com/in/pranavgg',
    email: 'ompranav2003@gmail.com',
  },
  social: [
    { label: 'GitHub', url: 'https://github.com/PranavShadow', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pranavgg', icon: 'linkedin' },
    { label: 'Twitter', url: 'https://x.com/pranavvgg', icon: 'twitter' },
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Posts', href: '/posts' },
    { label: 'Contact', href: '/contact' }
  ],

  seo: {
    title: 'Pranav Gupta |  Software Development Engineer',
    description: 'Software Development Engineer creating robust backend architectures and seamless frontend experiences',
    keywords: [
      'PranavGupta',
      'Full Stack Developer',
      'Portfolio',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'shadcn/ui',
      'Framer Motion',
      'Machine Learning',
      'AI'
    ],
    canonical: 'https://pranavgg.me',
    image: '/favicon.ico',
    imageAlt: "Pranav Gupta -  Software Development Engineer",
    locale: 'en_US',
    type: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index,follow',
    themeColor: '#0f172a',
  },
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const { seo, siteName, domain } = siteConfig;

  const base: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    authors: [{ name: siteConfig.author, url: `https://${domain}` }],
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: seo.canonical ?? `https://${domain}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical ?? `https://${domain}`,
      siteName,
      type: (seo.type as "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "video.movie" | "video.episode" | "video.tv_show" | "video.other") ?? 'website',
      locale: seo.locale ?? 'en_US',
      images: seo.image
        ? [
          {
            url: seo.image,
            alt: seo.imageAlt || seo.title,
          },
        ]
        : [],
    },
    twitter: {
      card: (seo.twitterCard as "summary" | "summary_large_image" | "app" | "player") ?? 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
      site: `@${siteConfig.twitterHandle.replace('@', '')}`,
      creator: `@${siteConfig.twitterHandle.replace('@', '')}`,
    },
    other: {
      robots: seo.robots ?? 'index,follow',
      'theme-color': seo.themeColor ?? '#0f172a',
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };

  return { ...base, ...overrides };
}

export type { Metadata };
