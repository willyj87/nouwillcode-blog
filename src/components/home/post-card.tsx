import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { formatDate } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AllPostsQueryResult } from "@/sanity/sanity.types";

type PostCardData = AllPostsQueryResult[number]

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full gap-0 py-0 hover:shadow-md transition-shadow duration-300">
      <Link href={`/posts/${post?.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(640).height(400).url()}
            alt={post.mainImage.alt || post.title || "post image"}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>
      <CardHeader className="flex-1 gap-2 p-4">
        {post?.categories?.[0] && (
          <div>
            <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              {post.categories[0].title}
            </Badge>
          </div>
        )}
        <CardTitle className="text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/posts/${post?.slug}`}>{post?.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-foreground/70">
          {post?.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto px-4 pb-4 text-xs text-muted-foreground">
        {post?.publishedAt && (
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        )}
      </CardContent>
    </Card>
  )
}
