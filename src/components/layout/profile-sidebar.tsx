import Link from 'next/link'
import {Globe, Mail} from 'lucide-react'

import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/icons/brand-icons'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {urlFor} from '@/sanity/lib/image'
import type {Author, SocialLink} from '@/sanity/types'

const ICONS = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  twitter: XIcon,
  website: Globe,
  email: Mail,
  youtube: YoutubeIcon,
} as const

const LABELS: Record<SocialLink['platform'], string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'X',
  website: 'Site',
  email: 'Email',
  youtube: 'YouTube',
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function ProfileSidebar({author}: {author: Author | null}) {
  if (!author) return null

  return (
    <Card className="overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-primary to-sky-400" />
      <CardContent className="-mt-10 flex flex-col items-center pt-0 text-center">
        <Avatar className="size-20 border-4 border-card shadow-sm">
          {author.image ? (
            <AvatarImage
              src={urlFor(author.image).width(160).height(160).fit('crop').url()}
              alt={author.name}
            />
          ) : (
            <AvatarFallback>{initials(author.name)}</AvatarFallback>
          )}
        </Avatar>

        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          {author.name}
        </h2>
        {author.headline ? (
          <p className="mt-0.5 text-sm font-medium text-gray-600">
            {author.headline}
          </p>
        ) : null}

        {author.bio ? (
          <>
            <Separator className="my-4" />
            <p className="text-left text-sm leading-6 text-gray-600">
              {author.bio}
            </p>
          </>
        ) : null}

        {author.socials?.length ? (
          <>
            <Separator className="my-4" />
            <ul className="flex w-full flex-col gap-1">
              {author.socials.map((social) => {
                const Icon = ICONS[social.platform] ?? Globe
                return (
                  <li key={social.url}>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-muted"
                    >
                      <Icon className="size-4 text-primary" />
                      <span>{LABELS[social.platform]}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
