export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  img: string;
  imgAlt: string;
  tags: string[];
  category: string[];
  github?: string;
  githubLabel?: string;
  url?: string;
  urlLabel?: string;
  featured: boolean;
}

export interface Role {
  company: string;
  companyUrl?: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  kind: 'seo' | 'development';
  responsibilities: string[];
}

export interface ExpertiseGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface Platform {
  name: string;
  short: string;
  description: string;
}

export interface ClientSite {
  name: string;
  url?: string;
  status: 'current' | 'previous' | 'example';
}

export interface PlatformExperience {
  platform: string;
  heading: string;
  intro: string;
  sites: ClientSite[];
  othersNote?: string;
  work: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  context: string;
  problem?: string;
  work: string[];
  result?: string;
}
