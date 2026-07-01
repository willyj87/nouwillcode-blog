"use client"

import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function NewsletterSection({
  title,
  description,
}: {
  title?: string | null
  description?: string | null
}) {
  const heading = title || "Stay informed"
  const subheading =
    description || "Get the latest posts delivered straight to your inbox."
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Subscription endpoint would be wired here.
    setSubmitted(true)
    toast.success("You're subscribed!", {
      description: "New posts land in your inbox as they're published.",
    })
    setEmail("")
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="w-full scroll-mt-24"
    >
      <div className="rounded-2xl border bg-muted/40 p-7 md:p-10">
        {/* Editorial split on md+: copy left, form right */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          {/* Copy */}
          <div className="flex flex-col gap-2">
            <h2
              id="newsletter-heading"
              className="text-xl font-bold tracking-tight md:text-2xl"
            >
              {heading}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              {subheading}
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-sm shrink-0 md:w-auto">
            {submitted ? (
              <p className="text-sm font-medium text-primary">
                ✓ You&apos;re on the list.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={cn(
                    "h-10 flex-1 min-w-0 rounded-full border bg-background px-4 text-sm",
                    "placeholder:text-muted-foreground/60",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-5",
                    "bg-foreground text-background text-sm font-semibold",
                    "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                >
                  Subscribe
                </button>
              </form>
            )}
            {!submitted && (
              <p className="mt-2 text-[11px] text-muted-foreground/70">
                No spam. Unsubscribe any time.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
