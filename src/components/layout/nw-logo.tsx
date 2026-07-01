import type { SVGProps } from "react"

/**
 * nouwillcode_ wordmark — theme-aware, two variants.
 *
 * variant="wordmark" (default) — full "nouwillcode_" for the navbar.
 * variant="mark"              — compact "nw_" for tight spaces / favicons.
 *
 * All glyphs are outlined from JetBrains Mono Bold 700 (upem=1000, advance=600/glyph).
 * No external font dependency — renders identically everywhere.
 *
 * "nouwillcode" glyphs render in currentColor; "_" renders in var(--brand) (indigo).
 *
 * Usage:
 *   <NwLogo height={26} />                    — full wordmark at 26px tall
 *   <NwLogo variant="mark" height={24} />     — compact nw_ mark
 */

// Outlined glyph path data (JetBrains Mono Bold 700, upem=1000, advance=600 each)
const GLYPHS: Record<string, string> = {
  n: "M77 0V550H199V445H233L199 416Q199 484 238.5 522.0Q278 560 347 560Q428 560 476.5 506.0Q525 452 525 361V0H400V348Q400 398 374.0 425.0Q348 452 301 452Q255 452 228.5 424.0Q202 396 202 344V0Z",
  o: "M300 -9Q230 -9 178.5 17.5Q127 44 98.5 92.5Q70 141 70 207V343Q70 409 98.5 457.5Q127 506 178.5 532.5Q230 559 300 559Q371 559 422.0 532.5Q473 506 501.5 457.5Q530 409 530 344V207Q530 141 501.5 92.5Q473 44 422.0 17.5Q371 -9 300 -9ZM300 100Q350 100 377.5 127.5Q405 155 405 207V343Q405 396 377.5 423.0Q350 450 300 450Q251 450 223.0 423.0Q195 396 195 343V207Q195 155 223.0 127.5Q251 100 300 100Z",
  u: "M300 -10Q195 -10 135.0 48.5Q75 107 75 208V550H200V209Q200 156 226.0 127.5Q252 99 300 99Q347 99 373.5 127.5Q400 156 400 209V550H525V208Q525 107 464.0 48.5Q403 -10 300 -10Z",
  w: "M104 0 20 550H124L170 213Q174 184 177.5 149.0Q181 114 183 91Q186 114 191.0 149.0Q196 184 200 213L252 550H349L400 213Q404 184 409.0 148.5Q414 113 417 90Q419 114 423.5 149.5Q428 185 431 213L480 550H580L494 0H365L317 339Q313 367 308.0 401.5Q303 436 300 458Q297 436 292.5 401.5Q288 367 283 339L233 0Z",
  i: "M76 0V114H268V437H101V550H388V114H558V0ZM318 642Q280 642 258.0 661.5Q236 681 236 714Q236 747 258.0 766.5Q280 786 318 786Q356 786 378.0 766.5Q400 747 400 714Q400 681 378.0 661.5Q356 642 318 642Z",
  l: "M384 0Q330 0 289.5 22.0Q249 44 226.0 84.5Q203 125 203 178V617H27V730H328V178Q328 148 345.5 130.5Q363 113 393 113H559V0Z",
  c: "M303 -10Q233 -10 180.5 16.5Q128 43 99.0 91.5Q70 140 70 206V344Q70 411 99.0 459.0Q128 507 180.5 533.5Q233 560 303 560Q407 560 469.0 506.5Q531 453 534 361H409Q406 404 378.5 427.5Q351 451 303 451Q253 451 224.0 423.5Q195 396 195 345V206Q195 155 224.0 127.0Q253 99 303 99Q351 99 378.5 122.5Q406 146 409 189H534Q531 97 469.0 43.5Q407 -10 303 -10Z",
  d: "M253 -10Q171 -10 120.5 47.0Q70 104 70 200V349Q70 446 120.0 503.0Q170 560 253 560Q321 560 361.0 521.5Q401 483 401 416L373 445H402L398 576V730H523V0H401V105H373L401 134Q401 67 361.0 28.5Q321 -10 253 -10ZM297 98Q345 98 371.5 126.5Q398 155 398 206V344Q398 395 371.5 423.5Q345 452 297 452Q249 452 222.0 424.0Q195 396 195 344V206Q195 154 222.0 126.0Q249 98 297 98Z",
  e: "M301 -10Q231 -10 179.0 17.0Q127 44 98.5 92.5Q70 141 70 206V344Q70 409 98.5 457.5Q127 506 179.0 533.0Q231 560 301 560Q370 560 421.5 533.0Q473 506 501.5 457.5Q530 409 530 344V245H191V206Q191 148 219.0 118.5Q247 89 302 89Q344 89 370.0 103.5Q396 118 403 146H526Q512 75 450.5 32.5Q389 -10 301 -10ZM409 315V345Q409 402 382.0 432.5Q355 463 301 463Q247 463 219.0 432.0Q191 401 191 344V323L418 325Z",
  _: "M60 -138V-25H540V-138Z",
}

// Character sequences per variant
const VARIANTS = {
  wordmark: ["n", "o", "u", "w", "i", "l", "l", "c", "o", "d", "e", "_"] as const,
  mark: ["n", "w", "_"] as const,
}

type Variant = keyof typeof VARIANTS

interface NwLogoProps extends Omit<SVGProps<SVGSVGElement>, "height"> {
  variant?: Variant
  height?: number
}

export function NwLogo({ variant = "wordmark", height = 26, ...props }: NwLogoProps) {
  const chars = VARIANTS[variant]
  // upem=1000; each glyph advance=600; "l" has a dot that goes to 786upem above baseline
  // We use full font ascender (730 for most glyphs; "i" dot reaches 786, "l" cap reaches 730)
  // For "i" the dot peaks at 786upem — use 800 for safe clearance.
  const ascender = 800  // upem above baseline (safe for all glyphs incl. i-dot)
  const descender = 138 // upem below baseline (underscore bottom)
  const viewH = ascender + descender  // 938 upem total
  const viewW = chars.length * 600    // 600 upem per glyph

  const svgWidth = (viewW / viewH) * height

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewW} ${viewH}`}
      width={svgWidth}
      height={height}
      aria-label="nouwillcode"
      role="img"
      {...props}
    >
      {/*
        Font y=0 is baseline, positive upward.
        SVG y=0 is top, positive downward.
        Transform: translate(0, ascender) scale(1,-1) maps font→SVG:
          baseline → svg-y=ascender
          cap-top  → svg-y=0
          descender bottom → svg-y=ascender+descender=viewH
      */}
      <g transform={`translate(0,${ascender}) scale(1,-1)`}>
        {chars.map((ch, i) => (
          <path
            key={`${ch}-${i}`}
            fill={ch === "_" ? "var(--brand)" : "currentColor"}
            transform={`translate(${i * 600},0)`}
            d={GLYPHS[ch]}
          />
        ))}
      </g>
    </svg>
  )
}
