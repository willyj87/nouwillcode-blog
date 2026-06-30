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
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${post?.slug}`} className="block relative aspect-[16/9] overflow-hidden">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(800).height(450).url()}
            alt={post.mainImage.alt || post.title || "post image"}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>
      <CardHeader className="flex-1 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {post?.categories?.map((category) => (
            <Badge key={category._id} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              {category.title}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/posts/${post?.slug}`}>{post?.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3 mt-2 text-foreground/70">
          {post?.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0 text-sm text-muted-foreground flex items-center gap-3">
        {post?.author?.image && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src={urlFor(post.author.image).width(100).height(100).url()}
              alt={post.author.name || "author image"}
              fill
              className="object-cover"
            />
          </div>
        )}
        {post && (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{post?.author?.name}</span>
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
