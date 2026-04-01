import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'y3eiyxtt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const USE_DEMO_DATA = process.env.NEXT_PUBLIC_USE_DEMO_DATA !== 'false';
