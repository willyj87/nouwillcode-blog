import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Titre / Poste',
      description: 'Ex : Senior Software Engineer · Cloud & DevOps',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo de profil',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      description: 'Affichée dans la sidebar (personal branding).',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'socials',
      title: 'Liens sociaux',
      type: 'array',
      of: [
        defineField({
          name: 'social',
          title: 'Lien',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'X / Twitter', value: 'twitter'},
                  {title: 'Site web', value: 'website'},
                  {title: 'Email', value: 'email'},
                  {title: 'YouTube', value: 'youtube'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({allowRelative: false, scheme: ['http', 'https', 'mailto']}),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'headline', media: 'image'},
  },
})
