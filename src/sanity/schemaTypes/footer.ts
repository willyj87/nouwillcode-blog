import { defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Copyright Text / Message',
      type: 'string',
      initialValue: 'Built by nouwillcode. The source code is available on GitHub.',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer Configuration' }
    },
  },
})
