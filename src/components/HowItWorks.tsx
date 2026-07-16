const STEPS = [
  {
    step: "01",
    title: "Choose your content",
    desc: "Paste a URL, upload a PDF menu, link a vCard, or connect a landing page. Thateasy_qr supports any destination — and you can change it later.",
    tag: "URL · PDF · vCard · Landing page",
  },
  {
    step: "02",
    title: "Style your QR code",
    desc: "Pick a dot pattern, choose your eye frame style, select your brand color, and embed your logo. Preview updates live as you design.",
    tag: "Dot patterns · Eye frames · Logo upload",
  },
  {
    step: "03",
    title: "Deploy & track scans",
    desc: "Download as print-ready SVG or PNG. Share it anywhere. Then watch your analytics dashboard populate with every scan — by city, device, and time.",
    tag: "SVG export · Real-time analytics",
  },
]

export default function HowItWorks() {
  return (
    <section
      style={{
        backgroundColor: "#1C1C1A",
        padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background QR decoration */}
      <svg
        width="400"
        height="400"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          color: "rgba(247, 245, 240, 0.03)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <rect x="10" y="10" width="80" height="80" rx="8" />
        <rect
          x="25"
          y="25"
          width="50"
          height="50"
          rx="4"
          fill="none"
          strokeWidth="2.5"
        />
        <rect
          x="38"
          y="38"
          width="24"
          height="24"
          rx="2"
          fill="currentColor"
          stroke="none"
        />
      </svg>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#F7F5F0",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Live in three steps.
            </h2>
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: "0.75rem",
                color: "#6F6F6A",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              No card required
            </span>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
            }}
          >
            {STEPS.map(({ step, title, desc, tag }, i) => (
              <div
                key={step}
                style={{
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  borderRight:
                    i < STEPS.length - 1
                      ? "1px solid rgba(247,245,240,0.1)"
                      : "none",
                  borderTop: "1px solid rgba(247,245,240,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    color: "rgba(247,245,240,0.07)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    marginBottom: "-0.5rem",
                  }}
                >
                  {step}
                </div>
                <h3
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                    color: "#F7F5F0",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(247,245,240,0.6)",
                    lineHeight: 1.65,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {desc}
                </p>
                <div
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.6875rem",
                    color: "#8E9C78",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(247,245,240,0.08)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section > div > div > div:last-child > div {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  )
}
