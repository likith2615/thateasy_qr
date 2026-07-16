import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface TestimonialData {
  quote: string
  emText: string
  quoteAuthor: string
  authorInit: string
  authorRole: string
  metrics: {
    metric: string
    label: string
    detail: string
  }[]
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "We replaced our printed flyers overnight. ",
    emText:
      "Updating the promo URL ourselves saved us thousands in reprint costs.",
    quoteAuthor: "Marta Linares",
    authorInit: "M",
    authorRole: "Digital Marketing Lead · Café Brûlot",
    metrics: [
      {
        metric: "4,280",
        label: "Total scans",
        detail: "Across 6 table QR codes",
      },
      {
        metric: "62%",
        label: "Mobile conversion",
        detail: "Orders placed after scan",
      },
      {
        metric: "$1,840",
        label: "Reprint cost saved",
        detail: "vs. static QR flyers",
      },
    ],
  },
  {
    quote:
      "Our agents share digital property details instantly via dynamic vCards on their signs. ",
    emText:
      "Clients love the tactile print quality and the seamless digital connection.",
    quoteAuthor: "Adrian Sterling",
    authorInit: "A",
    authorRole: "Founder · Sterling Estate Group",
    metrics: [
      {
        metric: "12,450",
        label: "Total scans",
        detail: "Across 50 active listings",
      },
      {
        metric: "84%",
        label: "Direct inquiries",
        detail: "Sent via digital vCard links",
      },
      {
        metric: "$3,200",
        label: "Annual sign savings",
        detail: "No need to reprint details",
      },
    ],
  },
  {
    quote:
      "Being able to redirect a QR code from a PDF file to a live storefront without changing the physical gallery display is a total game-changer. ",
    emText: "It gives physical art pieces a dynamic digital voice.",
    quoteAuthor: "Clara Vance",
    authorInit: "C",
    authorRole: "Creative Director · Vanguard Studio",
    metrics: [
      {
        metric: "8,920",
        label: "Scan events",
        detail: "During our summer opening",
      },
      {
        metric: "95%",
        label: "Mobile engagement",
        detail: "Direct portfolio views",
      },
      {
        metric: "Instant",
        label: "Redirect latency",
        detail: "Under 150ms globally",
      },
    ],
  },
]

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const handleNext = () => {
    setFade(false)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
      setFade(true)
    }, 200)
  }

  const handlePrev = () => {
    setFade(false)
    setTimeout(() => {
      setActiveIndex(
        (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
      )
      setFade(true)
    }, 200)
  }

  const active = TESTIMONIALS[activeIndex]

  return (
    <section
      style={{
        backgroundColor: "#8E9C78",
        padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}
      >
        {/* Quote Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            minHeight: "280px",
            justifyContent: "space-between",
          }}
        >
          {/* Main Quote Box */}
          <div
            style={{
              opacity: fade ? 1 : 0,
              transform: fade ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            className="testimonial-fade-container"
          >
            <div
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "#F7F5F0",
                letterSpacing: "-0.02em",
                marginBottom: "2rem",
              }}
            >
              "{active.quote}
              <em
                style={{ color: "rgba(247,245,240,0.72)", fontStyle: "italic" }}
              >
                {active.emText}
              </em>
              "
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#1C1C1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: "#F7F5F0",
                  }}
                >
                  {active.authorInit}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "#F7F5F0",
                  }}
                >
                  {active.quoteAuthor}
                </div>
                <div
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(247,245,240,0.65)",
                    letterSpacing: "0.04em",
                    marginTop: "0.125rem",
                  }}
                >
                  {active.authorRole}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(247,245,240,0.3)",
                  backgroundColor: "transparent",
                  color: "#F7F5F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(247,245,240,0.1)"
                  e.currentTarget.style.borderColor = "#F7F5F0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "rgba(247,245,240,0.3)"
                }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(247,245,240,0.3)",
                  backgroundColor: "transparent",
                  color: "#F7F5F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(247,245,240,0.1)"
                  e.currentTarget.style.borderColor = "#F7F5F0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "rgba(247,245,240,0.3)"
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx !== activeIndex) {
                      setFade(false)
                      setTimeout(() => {
                        setActiveIndex(idx)
                        setFade(true)
                      }, 200)
                    }
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    padding: 0,
                    border: "none",
                    backgroundColor:
                      activeIndex === idx ? "#F7F5F0" : "rgba(247,245,240,0.3)",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Case study metrics Column */}
        <div
          style={{
            backgroundColor: "#F7F5F0",
            padding: "clamp(2rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            border: "1px solid #D8D4C8",
            opacity: fade ? 1 : 0.8,
            transition: "opacity 0.2s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#8E9C78",
              marginBottom: "0.5rem",
            }}
          >
            Case study · 3-month results
          </div>

          {active.metrics.map(({ metric, label, detail }) => (
            <div
              key={label}
              style={{
                paddingBottom: "1.5rem",
                borderBottom: "1px solid #D8D4C8",
              }}
            >
              <div
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "#1C1C1A",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {metric}
              </div>
              <div
                style={{
                  fontSize: "0.9375rem",
                  color: "#1C1C1A",
                  fontWeight: 600,
                  marginTop: "0.25rem",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#6F6F6A",
                  marginTop: "0.25rem",
                  letterSpacing: "0.02em",
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
          section > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-fade-container {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
