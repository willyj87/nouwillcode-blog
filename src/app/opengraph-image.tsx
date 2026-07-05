import { ImageResponse } from "next/og"

// Hex values below are DESIGN.md's dark-theme tokens (dark-background, brand-indigo,
// dark-foreground, dark-muted-foreground), converted from oklch to sRGB — ImageResponse
// (Satori) cannot render the oklch() color function directly.
const COLORS = {
  darkBackground: "#0a0a0a",
  darkCard: "#171717",
  brandIndigo: "#5756e4",
  brandIndigoDark: "#8792ff",
  darkForeground: "#fafafa",
  darkMutedForeground: "#a2a4ac",
}

export const alt = "nouwillcode — The Engineer's Notebook"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        background: `linear-gradient(135deg, ${COLORS.darkBackground} 0%, ${COLORS.darkCard} 100%)`,
        color: COLORS.darkForeground,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            background: COLORS.brandIndigo,
          }}
        />
        <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.brandIndigoDark }}>
          nouwillcode
        </span>
      </div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
        The Engineer&apos;s Notebook
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: COLORS.darkMutedForeground,
          marginTop: 24,
        }}
      >
        Tech articles, lessons learned, and software engineering notes.
      </div>
    </div>,
    { ...size },
  )
}
