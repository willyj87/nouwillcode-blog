import {type SchemaTypeDefinition} from 'sanity'

import {authorType} from './author'
import {categoryType} from './category'
import {blockContentType} from './blockContent'
import {postType} from './post'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [postType, authorType, categoryType, blockContentType],
}
