import type {StructureResolver} from 'sanity/structure'
import {DocumentTextIcon, TagIcon, UserIcon, CogIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('post').title('Articles').icon(DocumentTextIcon),
      S.documentTypeListItem('category').title('Tags').icon(TagIcon),
      S.documentTypeListItem('author').title('Auteurs').icon(UserIcon),
      S.divider(),
      S.listItem()
        .title('Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Navigation')
                .child(
                  S.document()
                    .schemaType('navbar')
                    .documentId('navbar')
                ),
              S.listItem()
                .title('Footer')
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footer')
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author', 'navbar', 'footer'].includes(item.getId()!),
      ),
    ])
