import type {StructureResolver} from 'sanity/structure'
import {DocumentTextIcon, TagIcon, UserIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('post').title('Articles').icon(DocumentTextIcon),
      S.documentTypeListItem('category').title('Tags').icon(TagIcon),
      S.documentTypeListItem('author').title('Auteurs').icon(UserIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author'].includes(item.getId()!),
      ),
    ])
