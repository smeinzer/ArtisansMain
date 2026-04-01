import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepageConfig',
  title: 'Homepage Config',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Hero Subline',
      type: 'string',
    }),
    defineField({
      name: 'featuredCollectionHandle',
      title: 'Featured Collection Handle',
      type: 'string',
      description: 'Shopify collection handle for featured products',
    }),
  ],
});
