const getLinkHref = (link: string) => {
  switch (link.toLowerCase()) {
    case "features":
      return "#features"
    case "analytics":
      return "#login"
    case "integrations":
      return "#features"
    case "api docs":
      return "#blog"
    case "changelog":
      return "#blog"
    case "restaurant menus":
      return "#usecase-restaurant-menus"
    case "event tickets":
      return "#usecase-event-tickets"
    case "product packaging":
      return "#usecase-product-packaging"
    case "business cards":
      return "#usecase-business-cards"
    case "about":
      return "#about"
    case "careers":
      return "#blog"
    case "press kit":
      return "#usecase-press-kit"
    case "contact":
      return "#contact"
    case "blog":
      return "#blog"
    default:
      return "#"
  }
}

export default function CtaFooter() {
  return (
    <>
      {/* CTA band */}
      <section
        style={{
          backgroundColor: "#EDE9E0",
          borderTop: "1px solid #D8D4C8",
          padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#8E9C78",
          }}
        >
          Start today — no credit card required
        </div>
        <h2
          style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
            color: "#1C1C1A",
            margin: 0,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            maxWidth: "18ch",
          }}
        >
          Your first QR code is{" "}
          <em style={{ color: "#8E9C78", fontStyle: "italic" }}>
            ready in 60 seconds.
          </em>
        </h2>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "#6F6F6A",
            lineHeight: 1.6,
            maxWidth: "46ch",
            margin: 0,
          }}
        >
          Join 14,000+ brands, restaurants, and creators who switched from
          static, single-use codes to living, trackable ones.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.875rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#signup"
            style={{
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "#F7F5F0",
              backgroundColor: "#1C1C1A",
              padding: "0.875rem 2.5rem",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-block",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#3A3A38")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#1C1C1A")
            }
          >
            Create your first QR code →
          </a>
          <a
            href="#pricing"
            style={{
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#1C1C1A",
              backgroundColor: "transparent",
              padding: "0.875rem 2.5rem",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-block",
              border: "1px solid #D8D4C8",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#1C1C1A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#D8D4C8")
            }
          >
            View pricing
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1C1C1A",
          padding: "clamp(2.5rem, 4vw, 3.5rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(247,245,240,0.1)",
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}
            >
              <span
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "1.375rem",
                  color: "#F7F5F0",
                }}
              >
                Thateasy
              </span>
              <span
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.375rem",
                  color: "#8E9C78",
                }}
              >
                _qr
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(247,245,240,0.5)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "28ch",
              }}
            >
              Dynamic QR codes that move as fast as your brand.
            </p>
          </div>

          {/* Nav columns */}
          {[
            {
              heading: "Product",
              links: [
                "Features",
                "Analytics",
              ],
            },
            {
              heading: "Use Cases",
              links: [
                "Restaurant Menus",
                "Event Tickets",
                "Product Packaging",
                "Business Cards",
              ],
            },
            {
              heading: "Company",
              links: ["About", "Blog", "Contact"],
            },
          ].map(({ heading, links }) => (
            <div
              key={heading}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(247,245,240,0.35)",
                  marginBottom: "0.25rem",
                }}
              >
                {heading}
              </div>
              {links.map((link) => (
                <a
                  key={link}
                  href={getLinkHref(link)}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(247,245,240,0.55)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(247,245,240,0.9)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(247,245,240,0.55)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(247,245,240,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Thateasy_qr Inc. ·{" "}
            <a
              href="#privacy"
              style={{
                color: "rgba(247,245,240,0.45)",
                textDecoration: "underline",
              }}
            >
              Privacy
            </a>{" "}
            ·{" "}
            <a
              href="#terms"
              style={{
                color: "rgba(247,245,240,0.45)",
                textDecoration: "underline",
              }}
            >
              Terms
            </a>{" "}
            · Status
          </span>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(247,245,240,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            GDPR compliant · SOC 2 Type II
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
