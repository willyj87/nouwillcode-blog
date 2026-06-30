"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SendIcon } from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Subscription successful!", {
        description: "Thanks for subscribing to the newsletter.",
      })
      setEmail("")
    }, 1000)
  }

  return (
    <section id="newsletter" className="w-full py-20 px-4 scroll-mt-24">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-background to-secondary rounded-3xl p-8 md:p-16 border shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>
            <p className="text-lg text-muted-foreground">{subheading}</p>
          </div>
          
          <form 
            onSubmit={handleSubmit} 
            className="flex w-full max-w-md flex-col sm:flex-row gap-3 mt-4"
          >
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full px-6 h-12 bg-background/80 backdrop-blur-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="rounded-full h-12 px-8 min-w-[140px] shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <SendIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-2">
            No spam. Promise. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
