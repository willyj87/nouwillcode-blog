import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'newsletter',
      title: 'Newsletter Section',
    },
  ],
  fields: [
    // Hero Group
    defineField({
      name: 'featuredPost',
      title: 'Featured post',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'hero',
      description:
        'The post shown in the hero. Leave empty to feature the most recent post automatically.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Empty-state title',
      description:
        'Only shown when there are no posts yet. The hero normally features the selected (or most recent) post.',
      type: 'string',
      group: 'hero',
      initialValue: 'nouwillcode',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Empty-state tagline',
      description:
        'Only shown when there are no posts yet, alongside the empty-state title.',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Empty-state background image',
      description:
        'Optional. Only used by the empty state when there are no posts to feature.',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for accessibility and SEO.',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined
              if (parent?.asset && !alt) return 'Alt text is required when an image is set.'
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA button text',
      description: 'Used for the "view all posts" button in the posts section.',
      type: 'string',
      group: 'hero',
      initialValue: 'View all posts',
    }),

    // Newsletter Group
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter title',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Stay informed',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter description',
      type: 'text',
      rows: 2,
      group: 'newsletter',
      initialValue: 'Get the latest posts delivered straight to your inbox.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Configuration' }
    },
  },
})
