export default function Marquee() {
  const items = [
    "DYNAMIC REDIRECTS",
    "REALTIME METRICS",
    "BRANDED CUSTOMIZATION",
    "NO REPRINTS REQUIRED",
    "VCARD CONTACT SHARING",
    "PDF & FILE DISTRIBUTION",
    "100% VECTOR EXPORTS",
    "QUIET SAGE DESIGN SYSTEM",
  ]

  return (
    <div
      style={{
        backgroundColor: "#1C1C1A",
        borderTop: "1px solid #D8D4C8",
        borderBottom: "1px solid #D8D4C8",
        padding: "1rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        position: "relative",
      }}
    >
      <div className="marquee-track">
        {/* Repeat list to create infinite loop effect */}
        {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "#F7F5F0",
              marginRight: "4rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              style={{
                color: "#8E9C78",
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            >
              ✦
            </span>
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: inline-flex;
          animation: marquee-scroll 25s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            overflow-x: auto;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
