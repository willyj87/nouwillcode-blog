import {RocketIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Rich-text description shown on the detail page. Keep it concise — 1 to 3 short paragraphs.',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for accessibility and SEO.',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as {asset?: unknown} | undefined
              if (parent?.asset && !alt) return 'Alt text is required when an image is set.'
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech stack',
      description: 'Technologies used, e.g. TypeScript, Next.js, PostgreSQL.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live demo URL',
      description: 'Link to the deployed project (optional).',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source code URL',
      description: 'Link to the repository, e.g. GitHub (optional).',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      description: 'Year the project was built or shipped. Used for ordering and labelling.',
      type: 'number',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Highlight this project (reserved for future homepage use).',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Year, newest first',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      year: 'year',
      stack: 'techStack',
    },
    prepare({title, media, year, stack}) {
      const stackLabel = Array.isArray(stack) ? stack.slice(0, 3).join(' · ') : undefined
      return {
        title,
        subtitle: [year, stackLabel].filter(Boolean).join(' — '),
        media,
      }
    },
  },
})
