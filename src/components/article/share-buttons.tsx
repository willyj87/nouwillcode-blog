"use client"

import {Check, Link2, Share2} from "lucide-react"
import {useCallback, useState} from "react"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {track} from "@/lib/analytics"
import {cn} from "@/lib/utils"

interface ShareButtonsProps {
  slug: string
  title: string
  className?: string
}

/** X (formerly Twitter) glyph — lucide has no first-party X icon. */
function XIcon({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", className)} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

/** LinkedIn glyph — lucide has no first-party LinkedIn icon in this version. */
function LinkedInIcon({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", className)} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  )
}

/** Current page URL, read at interaction time (client only). */
function currentUrl() {
  return typeof window === "undefined" ? "" : window.location.href
}

export function ShareButtons({slug, title, className}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handlePrimaryShare = useCallback(async () => {
    const url = currentUrl()
    // Prefer the native share sheet where available; otherwise fall back to
    // copying the link so the button is always useful.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({title, url})
        track("article_share", {slug, method: "native"})
      } catch {
        // User dismissed the share sheet — not an error worth surfacing.
      }
      return
    }
    await copyLink(url, slug, setCopied)
  }, [slug, title])

  const handleCopy = useCallback(async () => {
    await copyLink(currentUrl(), slug, setCopied)
  }, [slug])

  const shareToX = useCallback(() => {
    const url = currentUrl()
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title,
    )}&url=${encodeURIComponent(url)}`
    window.open(intent, "_blank", "noopener,noreferrer")
    track("article_share", {slug, method: "x"})
  }, [slug, title])

  const shareToLinkedIn = useCallback(() => {
    const url = currentUrl()
    const intent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(intent, "_blank", "noopener,noreferrer")
    track("article_share", {slug, method: "linkedin"})
  }, [slug])

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-medium text-foreground/80">Share</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={handlePrimaryShare}
          aria-label="Share this article"
        >
          <Share2 />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? <Check className="text-emerald-500" /> : <Link2 />}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={shareToX}
          aria-label="Share on X"
        >
          <XIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={shareToLinkedIn}
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon />
        </Button>
      </div>
    </div>
  )
}

async function copyLink(
  url: string,
  slug: string,
  setCopied: (value: boolean) => void,
) {
  try {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
    toast.success("Link copied to clipboard")
    track("article_share", {slug, method: "clipboard"})
  } catch {
    toast.error("Couldn't copy the link")
  }
}
