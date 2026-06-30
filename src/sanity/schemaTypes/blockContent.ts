import {defineArrayMember, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

/**
 * Post body as Portable Text: rich text + code blocks
 * (via @sanity/code-input) + images. The author chooses in Sanity
 * to insert text or a code block as needed.
 */
export const blockContentType = defineType({
  title: 'Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading H2', value: 'h2'},
        {title: 'Heading H3', value: 'h3'},
        {title: 'Heading H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Inline code', value: 'code'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          {
            title: 'Link',
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
          title: 'Alt text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Code block',
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
          {title: 'Plain text', value: 'text'},
        ],
      },
    }),
  ],
})
