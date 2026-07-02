import type { CSSProperties, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type Variant = "wordmark" | "mark"

interface NwLogoProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
  height?: number
}

const VARIANTS: Record<Variant, { label: string; tracking: string }> = {
  wordmark: {
    label: "nouwillcode",
    tracking: "-0.03em",
  },
  mark: {
    label: "nw",
    tracking: "-0.02em",
  },
}

export function NwLogo({ variant = "wordmark", height = 26, className, style, ...props }: NwLogoProps) {
  const config = VARIANTS[variant]

  const logoStyle: CSSProperties = {
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: `${height}px`,
    fontWeight: 600,
    letterSpacing: config.tracking,
    lineHeight: 1,
    ...style,
  }

  return (
    <span
      role="img"
      aria-label="nouwillcode"
      className={cn("inline-flex items-baseline whitespace-nowrap", className)}
      style={logoStyle}
      {...props}
    >
      <span>{config.label}</span>
      <span className="ml-[0.02em] text-[color:var(--brand)]">_</span>
    </span>
  )
}
