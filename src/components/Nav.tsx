import { useState } from "react"
import QRLogo from "./QRLogo"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(247,245,240,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #D8D4C8",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <QRLogo size={22} fontSize="1.5rem" />
        </a>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {["Features", "How It Works", "Pricing", "Blog"].map((item) => {
            const hash = "#" + item.toLowerCase().replace(/\s+/g, "-")
            return (
              <a
                key={item}
                href={hash}
                style={{
                  fontSize: "0.875rem",
                  color: "#6F6F6A",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#1C1C1A")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#6F6F6A")
                }
              >
                {item}
              </a>
            )
          })}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href="#login"
            style={{
              fontSize: "0.875rem",
              color: "#6F6F6A",
              textDecoration: "none",
              fontWeight: 500,
            }}
            className="hidden-mobile"
          >
            Sign in
          </a>
          <a
            href="#signup"
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#F7F5F0",
              backgroundColor: "#1C1C1A",
              padding: "0.5rem 1.25rem",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background-color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#3A3A38")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#1C1C1A")
            }
          >
            Get started free
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Menu"
          >
            <div
              style={{
                width: 22,
                height: 2,
                backgroundColor: "#1C1C1A",
                marginBottom: 5,
              }}
            />
            <div style={{ width: 22, height: 2, backgroundColor: "#1C1C1A" }} />
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            borderTop: "1px solid #D8D4C8",
            padding: "1rem 2rem",
            backgroundColor: "#F7F5F0",
          }}
        >
          {["Features", "How It Works", "Pricing", "Blog", "Sign in", "Sign up"].map(
            (item) => {
              let hash = "#" + item.toLowerCase().replace(/\s+/g, "-")
              if (item === "Sign in") hash = "#login"
              if (item === "Sign up") hash = "#signup"
              return (
                <a
                  key={item}
                  href={hash}
                  style={{
                    display: "block",
                    padding: "0.625rem 0",
                    fontSize: "1rem",
                    color: "#1C1C1A",
                    textDecoration: "none",
                    borderBottom: "1px solid #EDE9E0",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              )
            }
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  )
}
