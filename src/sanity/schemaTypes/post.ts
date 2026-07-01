import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const ARTICLE_LAYOUT_OPTIONS = [
  {title: 'Standard (Notebook)', value: 'standard'},
  {title: 'Deep-dive', value: 'deepDive'},
  {title: 'Visual', value: 'visual'},
] as const

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary shown in the feed (1 to 2 sentences).',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'mainImage',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description:
        'Additional categories used for taxonomy and filtering. They do not select the article layout.',
    }),
    defineField({
      name: 'primaryCategory',
      title: 'Primary category',
      description:
        'Main category used as the editorial primary label for this post.',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'layout',
      title: 'Article layout',
      description:
        'Choose the article layout style. If empty, the Standard layout is used.',
      type: 'string',
      options: {
        list: ARTICLE_LAYOUT_OPTIONS.map((layout) => ({
          title: layout.title,
          value: layout.value,
        })),
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== 'object') return true
      const post = value as {
        layout?: string
        mainImage?: {asset?: unknown}
      }
      if (post.layout === 'visual' && !post.mainImage?.asset) {
        return 'A cover image is required when the Visual layout is selected.'
      }
      return true
    }),
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
      layout: 'layout',
    },
    prepare({title, author, media, date, layout}) {
      const formatted = date
        ? new Date(date).toLocaleDateString('en-US')
        : 'Draft'
      const layoutTitle =
        ARTICLE_LAYOUT_OPTIONS.find((option) => option.value === layout)?.title ??
        'Standard (Notebook)'
      return {
        title,
        subtitle: [author, formatted, layoutTitle].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
