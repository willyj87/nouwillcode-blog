import { defineField, defineType } from "sanity"

export const navbarType = defineType({
  name: "navbar",
  title: "Navigation Bar",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL/Path",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation Configuration" }
    },
  },
})
