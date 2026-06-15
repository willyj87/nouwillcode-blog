import {client} from '@/sanity/lib/client'
import Link from 'next/link'
import {
  allCategoriesQuery,
  allPostsQuery,
  authorProfileQuery,
} from '@/sanity/lib/queries'
import type {Author, Category, PostCard as PostCardType} from '@/sanity/types'
import {PostCard} from '@/components/feed/post-card'
import {ProfileSidebar} from '@/components/layout/profile-sidebar'
import {TagList} from '@/components/layout/tag-list'

export const revalidate = 60

export default async function FeedPage() {
  const [posts, author, categories] = await Promise.all([
    client.fetch<PostCardType[]>(allPostsQuery),
    client.fetch<Author | null>(authorProfileQuery),
    client.fetch<Category[]>(allCategoriesQuery),
  ])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* Feed central */}
      <section className="flex flex-col gap-4 lg:max-w-2xl">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Aucun article pour le moment. Rends-toi sur{' '}
            <Link className="font-medium text-primary" href="/studio">
              /studio
            </Link>{' '}
            pour en publier un.
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </section>

      {/* Sidebar */}
      <aside className="hidden flex-col gap-4 lg:flex">
        <ProfileSidebar author={author} />
        <TagList categories={categories} />
      </aside>
    </div>
  )
}
