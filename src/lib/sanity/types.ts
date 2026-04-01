export interface SanityImage {
  asset: { _ref: string };
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  businessName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: { day: string; open: string; close: string }[];
  socialLinks?: { platform: string; url: string }[];
  logo?: SanityImage;
}

export interface SanityArtist {
  _id: string;
  _type: 'artist';
  name: string;
  slug?: { current: string };
  headshot?: SanityImage;
  bio?: any[];
  shopifyVendorTag?: string;
  website?: string;
  instagram?: string;
}

export interface SanityAnnouncement {
  _id: string;
  _type: 'announcement';
  title: string;
  body?: any[];
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export interface SanityHomepageConfig {
  _id: string;
  _type: 'homepageConfig';
  heroImage?: SanityImage;
  heroHeadline?: string;
  heroSubline?: string;
  featuredCollectionHandle?: string;
}

export interface SanityPage {
  _id: string;
  _type: 'page';
  title: string;
  slug?: { current: string };
  content?: any[];
}
