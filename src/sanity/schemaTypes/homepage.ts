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
      name: 'heroTitle',
      title: 'Main title',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
      initialValue: 'nouwillcode',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline / Short description',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
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
      name: 'featuredPost',
      title: 'Featured post',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'hero',
      description: 'Select the post to feature in the Hero section.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA button text',
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
