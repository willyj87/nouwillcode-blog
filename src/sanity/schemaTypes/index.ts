import {type SchemaTypeDefinition} from 'sanity'

import {authorType} from './author'
import {categoryType} from './category'
import {blockContentType} from './blockContent'
import {postType} from './post'
import {projectType} from './project'
import {navbarType} from './navbar'
import {footerType} from './footer'
import {homepageType} from './homepage'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [postType, projectType, authorType, categoryType, blockContentType, navbarType, footerType, homepageType],
}
