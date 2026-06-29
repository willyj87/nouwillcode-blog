import { defineQuery } from "next-sanity"

export const navbarQuery = defineQuery(`
  *[_type == "navbar"][0] {
    brandLogo {
      asset->{
        url
      },
      alt
    },
    brandName,
    links[] {
      label,
      href
    },
    githubUrl
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footer"][0] {
    text,
    githubUrl
  }
`)
