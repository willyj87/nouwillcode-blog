import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { SanityLive } from '@/sanity/lib/live'

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'nouwillcode — Tech blog',
    template: '%s · nouwillcode',
  },
  description:
    'Tech articles, lessons learned, and software engineering notes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetBrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans bg-background text-foreground">
        <Navbar />
        {/* main container centered for all content */}
        <main className="container mx-auto flex-1 px-4 py-8 md:px-8 md:py-12">
          {children}
        </main>
        <Footer />
        <Toaster />
        <SanityLive />
      </body>
    </html>
  )
}
