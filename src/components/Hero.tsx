import QRCustomizer from "./QRCustomizer"

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Left — editorial text column */}
      <div className="hero-left">
        {/* Background QR decoration */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            color: "rgba(247, 245, 240, 0.05)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        >
          <rect x="10" y="10" width="80" height="80" rx="6" />
          <rect x="25" y="25" width="50" height="50" rx="3" fill="none" strokeWidth="3" />
          <rect x="37" y="37" width="26" height="26" rx="2" fill="currentColor" stroke="none" />
        </svg>

        {/* Foreground Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#F7F5F0",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#F7F5F0", display: "inline-block", opacity: 0.9 }} />
            Dynamic QR Platform
          </div>

          <h1 className="hero-heading">
            Thateasy_qr bridges the gap between physical touchpoints{" "}
            <em style={{ fontStyle: "italic", color: "rgba(247,245,240,0.78)" }}>
              and digital identity.
            </em>
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "rgba(247,245,240,0.82)",
              maxWidth: "38ch",
              margin: 0,
            }}
          >
            Design branded QR codes, route users dynamically, and track every
            scan — all from one elegant dashboard. No reprinting, ever.
          </p>

          <div className="hero-buttons">
            <a
              href="#signup"
              className="hero-btn-primary"
              onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#EDE9E0")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#F7F5F0")}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Get Started for Free
            </a>
            <a
              href="#how-it-works"
              className="hero-btn-outline"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(247,245,240,0.8)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(247,245,240,0.4)")}
            >
              See how it works →
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            {[
              { value: "14M+", label: "Scans tracked" },
              { value: "98k", label: "Active QR codes" },
              { value: "4.9★", label: "Average rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Crimson Text', Georgia, serif", fontWeight: 600, fontSize: "1.75rem", color: "#F7F5F0", lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6875rem", color: "rgba(247,245,240,0.65)", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — live QR customizer (hidden on mobile) */}
      <div className="hero-right">
        <QRCustomizer />
      </div>

      <style>{`
        .hero-section {
          background-color: #8E9C78;
          min-height: calc(100vh - 64px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 0;
          overflow: hidden;
        }

        .hero-left {
          padding: clamp(3rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem);
          position: relative;
          overflow: hidden;
        }

        .hero-heading {
          font-family: 'Crimson Text', Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.25rem, 5.5vw, 5rem);
          line-height: 1.05;
          color: #F7F5F0;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .hero-buttons {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          align-items: center;
        }

        .hero-btn-primary {
          font-weight: 600;
          font-size: 0.9375rem;
          color: #1C1C1A;
          background-color: #F7F5F0;
          padding: 0.8125rem 1.75rem;
          border-radius: 2px;
          text-decoration: none;
          display: inline-block;
          transition: background-color 0.2s;
          white-space: nowrap;
        }

        .hero-btn-outline {
          font-weight: 500;
          font-size: 0.9375rem;
          color: #F7F5F0;
          background-color: transparent;
          padding: 0.8125rem 1.75rem;
          border-radius: 2px;
          text-decoration: none;
          display: inline-block;
          border: 1px solid rgba(247,245,240,0.4);
          transition: border-color 0.2s;
          white-space: nowrap;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(247,245,240,0.2);
        }

        .hero-right {
          background-color: #F7F5F0;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 5vw, 4rem);
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            min-height: auto;
          }
          .hero-left {
            padding: 3rem 1.5rem 2rem;
          }
          .hero-heading {
            font-size: clamp(2rem, 8vw, 2.75rem) !important;
          }
          .hero-right {
            display: none !important;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-btn-primary,
          .hero-btn-outline {
            width: 100%;
            text-align: center;
          }
          .hero-stats {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
