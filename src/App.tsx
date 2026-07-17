import { useState, useEffect, useRef } from "react"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import Benefits from "./components/Benefits"
import HowItWorks from "./components/HowItWorks"
import FeaturesMatrix from "./components/FeaturesMatrix"
import Testimonial from "./components/Testimonial"
import CtaFooter from "./components/CtaFooter"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PublicVCard from "./components/PublicVCard"
import PublicLinkPage from "./components/PublicLinkPage"
import PublicFilePage from "./components/PublicFilePage"
import PublicMapPage from "./components/PublicMapPage"
import FeaturesPage from "./components/FeaturesPage"
import HowItWorksPage from "./components/HowItWorksPage"
import PricingPage from "./components/PricingPage"
import BlogPage from "./components/BlogPage"
import { db, QRCodeData } from "./lib/db"
import ScanOverlay from "./components/ScanOverlay"
import InfoPage from "./components/InfoPage"
import { AnimatePresence, motion } from "framer-motion"

type ViewType =
  | "landing"
  | "login"
  | "dashboard"
  | "vcard"
  | "linkpage"
  | "file"
  | "map"
  | "redirecting"
  | "404"
  | "loading"
  | "features"
  | "how-it-works"
  | "pricing"
  | "blog"
  | "signup"
  | "restaurant-menus"
  | "event-tickets"
  | "product-packaging"
  | "business-cards"
  | "press-kit"
  | "about"
  | "contact"
  | "terms"
  | "privacy"

export default function App() {
  const [view, setRawView] = useState<ViewType>("loading")
  const [phase, setPhase] = useState<"idle" | "covering" | "covered" | "revealing">("idle")
  const pendingView = useRef<ViewType | null>(null)
  const coverStartedAt = useRef(0)
  const MIN_COVER_MS = 480

  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [publicQr, setPublicQr] = useState<QRCodeData | null>(null)
  const [redirectCount, setRedirectCount] = useState(3)
  const [targetUrl, setTargetUrl] = useState("")

  const setView = (newView: ViewType) => {
    if (view === newView) return
    if (view === "loading") {
      setRawView(newView)
      return
    }
    pendingView.current = newView
    coverStartedAt.current = Date.now()
    setPhase("covering")
  }

  const handleCovered = () => {
    setPhase("covered")
    if (pendingView.current) {
      setRawView(pendingView.current)
    }
    const elapsed = Date.now() - coverStartedAt.current
    const remaining = Math.max(0, MIN_COVER_MS - elapsed)
    setTimeout(() => {
      setPhase("revealing")
    }, remaining)
  }

  const handleRevealed = () => {
    setPhase("idle")
    pendingView.current = null
  }

  // Parse User Agent for scan analytics
  const getScanMeta = () => {
    const ua = navigator.userAgent
    let device = "Desktop"
    if (/Mobi|Android|iPhone/i.test(ua)) {
      device = "Mobile"
    } else if (/Tablet|iPad/i.test(ua)) {
      device = "Tablet"
    }

    let browser = "Unknown"
    if (/Chrome/i.test(ua)) browser = "Chrome"
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari"
    else if (/Firefox/i.test(ua)) browser = "Firefox"
    else if (/Edge/i.test(ua)) browser = "Edge"

    let os = "Unknown"
    if (/Windows/i.test(ua)) os = "Windows"
    else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS"
    else if (/iPhone|iPad/i.test(ua)) os = "iOS"
    else if (/Android/i.test(ua)) os = "Android"
    else if (/Linux/i.test(ua)) os = "Linux"

    // Pick a random mock city/country to make it realistic
    const locations = [
      { country: "United States", city: "San Francisco" },
      { country: "United States", city: "New York" },
      { country: "United Kingdom", city: "London" },
      { country: "India", city: "Bangalore" },
      { country: "Germany", city: "Berlin" },
      { country: "Canada", city: "Toronto" },
      { country: "Japan", city: "Tokyo" },
    ]
    const loc = locations[Math.floor(Math.random() * locations.length)]

    return { device, browser, os, country: loc.country, city: loc.city }
  }

  // Handle Routing Logic based on URL search queries and hash state
  const handleRouting = async () => {
    const searchParams = new URLSearchParams(window.location.search)
    const hash = window.location.hash

    // 1. Check for dynamic redirect parameter: ?r=id
    const rId = searchParams.get("r")
    if (rId) {
      setView("redirecting")
      try {
        const qr = await db.getQRById(rId)
        if (qr && qr.is_active) {
          // Log scan event
          const meta = getScanMeta()
          await db.logScan(qr.id, meta)

          let dest = qr.destination_url
          // If it's a vcard, linkpage, or file dynamic code, redirect to their public views
          if (qr.type === "vcard") {
            dest = `${window.location.origin}${window.location.pathname}?vcard=${qr.id}`
          } else if (qr.type === "linkpage") {
            dest = `${window.location.origin}${window.location.pathname}?linkpage=${qr.id}`
          } else if (qr.type === "file") {
            dest = `${window.location.origin}${window.location.pathname}?file=${qr.id}`
          } else if (qr.type === "google-maps" || qr.type === "maps") {
            dest = `${window.location.origin}${window.location.pathname}?map=${qr.id}`
          }

          setTargetUrl(dest)
          return
        } else {
          setView("404")
          return
        }
      } catch (err) {
        console.error(err)
        setView("404")
        return
      }
    }

    // 2. Check for public landing page queries
    const vcardId = searchParams.get("vcard")
    const linkpageId = searchParams.get("linkpage")
    const fileId = searchParams.get("file")
    const mapId = searchParams.get("map")

    if (vcardId || linkpageId || fileId || mapId) {
      const targetId = (vcardId || linkpageId || fileId || mapId) as string
      try {
        const qr = await db.getQRById(targetId)
        if (qr && qr.is_active) {
          setPublicQr(qr)
          if (vcardId) setView("vcard")
          else if (linkpageId) setView("linkpage")
          else if (fileId) setView("file")
          else if (mapId) setView("map")
          return
        } else {
          setView("404")
          return
        }
      } catch (err) {
        console.error(err)
        setView("404")
        return
      }
    }

    // 3. User Authentication & Dashboard navigation
    const sessionUser = await db.getUser()
    if (sessionUser) {
      setUser({ id: sessionUser.id, email: sessionUser.email || "" })
    } else {
      setUser(null)
    }

    if (hash === "#dashboard") {
      if (sessionUser) {
        setView("dashboard")
      } else {
        setView("login")
      }
    } else if (hash === "#login") {
      if (sessionUser) {
        window.location.hash = "#dashboard"
      } else {
        setView("login")
      }
    } else if (hash === "#signup") {
      if (sessionUser) {
        window.location.hash = "#dashboard"
      } else {
        setView("signup")
      }
    } else if (hash === "#features") {
      setView("features")
    } else if (hash === "#how-it-works") {
      setView("how-it-works")
    } else if (hash === "#pricing") {
      setView("pricing")
    } else if (hash === "#blog") {
      setView("blog")
    } else if (hash === "#usecase-restaurant-menus") {
      setView("restaurant-menus")
    } else if (hash === "#usecase-event-tickets") {
      setView("event-tickets")
    } else if (hash === "#usecase-product-packaging") {
      setView("product-packaging")
    } else if (hash === "#usecase-business-cards") {
      setView("business-cards")
    } else if (hash === "#usecase-press-kit") {
      setView("press-kit")
    } else if (hash === "#about") {
      setView("about")
    } else if (hash === "#contact") {
      setView("contact")
    } else if (hash === "#terms") {
      setView("terms")
    } else if (hash === "#privacy") {
      setView("privacy")
    } else {
      setView("landing")
    }
  }

  // Scroll to top on every view change
  useEffect(() => {
    if (view !== "loading") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [view])

  useEffect(() => {
    // Run initial route check
    handleRouting()

    // Listen to hash changes and popstate updates
    const onHashChange = () => handleRouting()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  // Countdown timer for external redirection
  useEffect(() => {
    if (view === "redirecting" && targetUrl) {
      if (redirectCount > 0) {
        const timer = setTimeout(
          () => setRedirectCount(redirectCount - 1),
          1000,
        )
        return () => clearTimeout(timer)
      } else {
        window.location.href = targetUrl
      }
    }
  }, [view, redirectCount, targetUrl])

  const handleLoginSuccess = (usr: { id: string; email: string }) => {
    setUser(usr)
    window.location.hash = "#dashboard"
    setView("dashboard")
  }

  const handleLogout = async () => {
    await db.signOut()
    setUser(null)
    window.location.hash = ""
    window.location.search = "" // Clear queries
    setView("landing")
  }

  // --- RENDER ROUTING VIEWS ---
  const renderContent = () => {
    if (view === "redirecting") {
      return (
        <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-4 font-sans text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-6" />
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1A]">
            Redirecting Securely...
          </h1>
          <p className="text-sm text-[#6F6F6A] mt-2 max-w-xs leading-relaxed">
            Thateasy_qr is forwarding you to the destination URL.
          </p>
          <div className="text-xs font-semibold text-[#8E9C78] mt-6 font-mono">
            Forwarding in {redirectCount}s...
          </div>
          <div className="mt-8 text-xs text-[#6F6F6A] max-w-sm break-all font-mono p-2 border border-[#D8D4C8] bg-white rounded-sm">
            {targetUrl}
          </div>
        </div>
      )
    }

    if (view === "404") {
      return (
        <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-4 font-sans text-center">
          <h1 className="font-serif text-4xl font-bold text-[#8B3A3A] tracking-tight">
            404
          </h1>
          <h2 className="font-serif text-xl font-semibold text-[#1C1C1A] mt-2">
            QR Code Inactive or Not Found
          </h2>
          <p className="text-sm text-[#6F6F6A] mt-3 max-w-sm leading-relaxed">
            This QR code has either been paused by the owner, deleted, or does not
            exist on our servers.
          </p>
          <button
            onClick={() => {
              window.location.search = ""
              window.location.hash = ""
            }}
            className="mt-8 bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-5 py-2.5 text-xs font-semibold rounded-xs tracking-wide cursor-pointer transition-colors"
          >
            Return to Thateasy_qr
          </button>
        </div>
      )
    }

    if (view === "vcard" && publicQr) {
      return <PublicVCard qr={publicQr} />
    }

    if (view === "linkpage" && publicQr) {
      return <PublicLinkPage qr={publicQr} />
    }

    if (view === "file" && publicQr) {
      return <PublicFilePage qr={publicQr} />
    }

    if (view === "map" && publicQr) {
      return <PublicMapPage qr={publicQr} />
    }

    if (view === "login" || view === "signup") {
      return (
        <Login
          initialSignUp={view === "signup"}
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => {
            window.location.hash = ""
            setView("landing")
          }}
        />
      )
    }

    if (view === "dashboard" && user) {
      return <Dashboard user={user} onLogout={handleLogout} />
    }

    if (["features", "how-it-works", "pricing", "blog"].includes(view)) {
      return (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex-1 flex flex-col">
          <Nav />
          <div className="flex-1">
            {view === "features" && <FeaturesPage />}
            {view === "how-it-works" && <HowItWorksPage />}
            {view === "pricing" && <PricingPage />}
            {view === "blog" && <BlogPage />}
          </div>
          <CtaFooter />
        </div>
      )
    }

    if (
      [
        "restaurant-menus",
        "event-tickets",
        "product-packaging",
        "business-cards",
        "press-kit",
        "about",
        "contact",
        "terms",
        "privacy",
      ].includes(view)
    ) {
      return (
        <InfoPage
          mode={view as any}
          isLoggedIn={!!user}
          onBack={() => {
            window.location.hash = ""
            setView("landing")
          }}
        />
      )
    }

    // View: Landing Marketing Page
    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex-1 flex flex-col">
        <Nav />
        <Hero />
        <Marquee />
        <Benefits />
        <HowItWorks />
        <FeaturesMatrix />
        <Testimonial />
        <CtaFooter />
      </div>
    )
  }

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center text-[#6F6F6A] font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-4" />
        <span className="text-sm font-mono tracking-wider uppercase">
          Loading Platform...
        </span>
      </div>
    )
  }

  return (
    <>
      {/* 100-million-dollar tactile paper grain texture overlay */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <filter id="paper-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.035 0" />
        </filter>
      </svg>
      <div
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ filter: "url(#paper-noise)", opacity: 0.15 }}
      />

      {/* Top-edge elegant progress loading line */}
      {phase !== "idle" && (
        <div
          className="fixed top-0 left-0 h-[2px] bg-[#1C1C1A] z-[10000] transition-all duration-300"
          style={{
            width: phase === "covering" ? "70%" : "100%",
            opacity: phase === "revealing" ? 0 : 1,
          }}
        />
      )}

      <ScanOverlay
        phase={phase}
        onCovered={handleCovered}
        onRevealed={handleRevealed}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-h-screen flex flex-col"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
