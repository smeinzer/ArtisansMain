import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Artisans On Main',
    short_name: 'Artisans',
    description: 'Curated art consignment gallery in Weaverville, NC',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#2C2C2C',
  }
}
