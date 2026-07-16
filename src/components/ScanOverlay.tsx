import { motion } from "framer-motion"

/**
 * ScanOverlay — a full-screen sage panel that sweeps across the viewport
 * on route change, referencing the QR-scan motif (leading light line +
 * dot-grid texture + a tiny pulsing 4-module mark). Driven entirely by
 * `phase`, which _app.js sets from router events:
 *
 *   idle      → hidden off-screen left
 *   covering  → sweeps in from left, fully covers the screen
 *   covered   → holds, fully covering (new page mounts underneath)
 *   revealing → sweeps out to the right, exposing the new page
 */

interface ScanOverlayProps {
  phase: "idle" | "covering" | "covered" | "revealing"
  onCovered?: () => void
  onRevealed?: () => void
}

const panelVariants = {
  idle: { x: "-100%" },
  covering: { x: "0%", transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } },
  covered: { x: "0%" },
  revealing: { x: "100%", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } },
}

export default function ScanOverlay({ phase, onCovered, onRevealed }: ScanOverlayProps) {
  const visible = phase !== "idle"
  const sweepingIn = phase === "covering"
  const sweepingOut = phase === "revealing"

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none fixed inset-0 z-[9999] " + (visible ? "" : "invisible")
      }
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-[#7C8F5E]"
        variants={panelVariants}
        animate={phase === "idle" ? "idle" : phase}
        onAnimationComplete={() => {
          if (phase === "covering") onCovered?.()
          if (phase === "revealing") onRevealed?.()
        }}
      >
        {/* leading scan line — sits on whichever edge is "cutting" across the screen */}
        {sweepingIn && (
          <div className="absolute inset-y-0 right-0 w-[3px] bg-white/90 shadow-[0_0_24px_6px_rgba(255,255,255,0.55)]" />
        )}
        {sweepingOut && (
          <div className="absolute inset-y-0 left-0 w-[3px] bg-white/90 shadow-[0_0_24px_6px_rgba(255,255,255,0.55)]" />
        )}

        {/* dot-grid texture, echoes the QR module pattern */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* tiny pulsing 4-module mark, centered — brand nod, not decoration for its own sake */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
            animate={{
              scale: phase === "covered" || sweepingOut ? 1 : 0.5,
              opacity: phase === "covered" || sweepingOut ? 1 : 0,
              rotate: 0,
            }}
            transition={{ duration: 0.28, delay: sweepingIn ? 0.1 : 0, ease: "easeOut" }}
            className="grid grid-cols-2 gap-1.5"
          >
            <span className="h-3 w-3 rounded-[3px] bg-[#17170F]" />
            <span className="h-3 w-3 rounded-[3px] bg-white" />
            <span className="h-3 w-3 rounded-[3px] bg-white" />
            <span className="h-3 w-3 rounded-[3px] bg-[#17170F]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
