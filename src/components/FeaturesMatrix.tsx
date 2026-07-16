const FEATURES = [
  { name: "Dynamic URL redirect", novaQR: true, free: false, legacy: false },
  { name: "Custom dot patterns", novaQR: true, free: false, legacy: false },
  { name: "Custom eye frame styles", novaQR: true, free: false, legacy: false },
  { name: "Center logo embedding", novaQR: true, free: false, legacy: true },
  { name: "SVG / vector export", novaQR: true, free: false, legacy: false },
  {
    name: "Real-time scan analytics",
    novaQR: true,
    free: false,
    legacy: false,
  },
  { name: "Geo & device breakdown", novaQR: true, free: false, legacy: false },
  { name: "CSV data export", novaQR: true, free: false, legacy: false },
  { name: "Custom landing pages", novaQR: true, free: false, legacy: false },
  { name: "No ads or watermarks", novaQR: true, free: false, legacy: true },
  { name: "API access", novaQR: true, free: false, legacy: false },
  { name: "QR code generation", novaQR: true, free: true, legacy: true },
]

function Check({ yes }: { yes: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        backgroundColor: yes ? "#8E9C78" : "transparent",
        border: yes ? "none" : "1.5px solid #D8D4C8",
        color: yes ? "#fff" : "#D8D4C8",
        fontSize: "0.7rem",
        fontWeight: 700,
      }}
    >
      {yes ? "✓" : "—"}
    </span>
  )
}

export default function FeaturesMatrix() {
  return (
    <section
      style={{
        backgroundColor: "#F7F5F0",
        padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)",
        borderTop: "1px solid #D8D4C8",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            alignItems: "end",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#1C1C1A",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            How we compare.
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
            Free generators give you a static code. Legacy platforms lock
            features behind opaque enterprise contracts. Thateasy_qr gives you
            everything, transparently.
          </p>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #D8D4C8",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "left",
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#6F6F6A",
                    borderBottom: "1px solid #D8D4C8",
                    backgroundColor: "#FAFAF8",
                    fontWeight: 500,
                  }}
                >
                  Feature
                </th>
                {[
                  { label: "Thateasy_qr", highlight: true },
                  { label: "Free Generators", highlight: false },
                  { label: "Legacy QR Platforms", highlight: false },
                ].map(({ label, highlight }) => (
                  <th
                    key={label}
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: highlight ? "#1C1C1A" : "#6F6F6A",
                      borderBottom: "1px solid #D8D4C8",
                      borderLeft: "1px solid #D8D4C8",
                      backgroundColor: highlight ? "#8E9C7818" : "#FAFAF8",
                      fontWeight: highlight ? 700 : 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                    {highlight && (
                      <span
                        style={{
                          display: "block",
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "0.6rem",
                          color: "#8E9C78",
                          marginTop: "0.2rem",
                          textTransform: "none",
                          letterSpacing: "0",
                          fontWeight: 600,
                        }}
                      >
                        ★ Recommended
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(({ name, novaQR, free, legacy }, i) => (
                <tr
                  key={name}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAF8",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                      "#F0EDE6")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                      i % 2 === 0 ? "#FFFFFF" : "#FAFAF8")
                  }
                >
                  <td
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.9375rem",
                      color: "#1C1C1A",
                      borderBottom: "1px solid #EDE9E0",
                    }}
                  >
                    {name}
                  </td>
                  {[novaQR, free, legacy].map((val, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "0.875rem 1.5rem",
                        textAlign: "center",
                        borderBottom: "1px solid #EDE9E0",
                        borderLeft: "1px solid #EDE9E0",
                        backgroundColor: j === 0 ? "#8E9C7808" : "transparent",
                      }}
                    >
                      <Check yes={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
