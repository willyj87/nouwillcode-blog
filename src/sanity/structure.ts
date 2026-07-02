import type {StructureResolver} from 'sanity/structure'
import {DocumentTextIcon, TagIcon, UserIcon, CogIcon, RocketIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts').icon(DocumentTextIcon),
      S.documentTypeListItem('project').title('Projects').icon(RocketIcon),
      S.documentTypeListItem('category').title('Tags').icon(TagIcon),
      S.documentTypeListItem('author').title('Authors').icon(UserIcon),
      S.divider(),
      S.listItem()
        .title('Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Homepage')
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
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
          !['post', 'project', 'category', 'author', 'navbar', 'footer', 'homepage'].includes(item.getId()!),
      ),
    ])
