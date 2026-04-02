import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepageConfig',
  title: 'Homepage Config',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label for this configuration (e.g. "Main Homepage")',
      initialValue: 'Main Homepage',
    }),
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Homepage',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
