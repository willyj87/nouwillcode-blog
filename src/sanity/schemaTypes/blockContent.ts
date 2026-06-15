import {defineArrayMember, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

/**
 * Corps d'article en Portable Text : texte riche + blocs de code
 * (via @sanity/code-input) + images. L'auteur choisit dans Sanity
 * d'insérer du texte ou un bloc de code selon le besoin.
 */
export const blockContentType = defineType({
  title: 'Contenu',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Titre H2', value: 'h2'},
        {title: 'Titre H3', value: 'h3'},
        {title: 'Titre H4', value: 'h4'},
        {title: 'Citation', value: 'blockquote'},
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Code inline', value: 'code'},
          {title: 'Souligné', value: 'underline'},
        ],
        annotations: [
          {
            title: 'Lien',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende',
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Bloc de code',
      options: {
        withFilename: true,
        languageAlternatives: [
          {title: 'TypeScript', value: 'typescript'},
          {title: 'TSX', value: 'tsx'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'JSX', value: 'jsx'},
          {title: 'JSON', value: 'json'},
          {title: 'Bash / Shell', value: 'bash'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'Python', value: 'python'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'SQL', value: 'sql'},
          {title: 'YAML', value: 'yaml'},
          {title: 'Dockerfile', value: 'docker'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'Texte brut', value: 'text'},
        ],
      },
    }),
  ],
})
