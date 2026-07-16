const BENEFITS = [
  {
    number: "01",
    title: "Zero Reprinting",
    body: "Update the destination URL of any QR code at any time — without changing the printed code. Your menus, packaging, and posters stay current forever.",
    detail: "Dynamic routing · Instant redirect updates",
  },
  {
    number: "02",
    title: "Brand-First Customization",
    body: "Choose from dozens of eye frame styles and dot patterns. Embed your logo at the center. Export pixel-perfect SVGs ready for print at any scale.",
    detail: "SVG & PNG export · Logo embedding",
  },
  {
    number: "03",
    title: "Comprehensive Analytics",
    body: "Track scans by device model, operating system, city, and time of day. Understand who your audience is and when they engage most.",
    detail: "Real-time dashboard · CSV export",
  },
]

export default function Benefits() {
  return (
    <section
      style={{
        backgroundColor: "#F7F5F0",
        padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)",
        borderBottom: "1px solid #D8D4C8",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            alignItems: "end",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "#1C1C1A",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Everything a modern brand needs.
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "#6F6F6A",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "52ch",
            }}
          >
            Thateasy_qr was built by designers and marketers who were tired of
            static, untrackable, ugly QR codes. Every feature exists to remove
            friction between your brand and your audience.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: "1px solid #D8D4C8",
          }}
        >
          {BENEFITS.map(({ number, title, body, detail }, i) => (
            <div
              key={number}
              style={{
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                borderRight:
                  i < BENEFITS.length - 1 ? "1px solid #D8D4C8" : "none",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#FDFCF8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent")
              }
            >
              <span
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#8E9C78",
                  letterSpacing: "0.06em",
                }}
              >
                {number}
              </span>
              <h3
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.375rem, 2vw, 1.625rem)",
                  color: "#1C1C1A",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "#6F6F6A",
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                }}
              >
                {body}
              </p>
              <div
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.6875rem",
                  color: "#8E9C78",
                  paddingTop: "1rem",
                  borderTop: "1px solid #EDE9E0",
                  letterSpacing: "0.04em",
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section > div > div:last-child > div {
            border-right: none !important;
            border-bottom: 1px solid #D8D4C8;
          }
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
