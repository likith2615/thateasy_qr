import { useState, useEffect, useRef } from "react"

interface EyeProps {
  isClosed: boolean
  bgColor: string
  size: number
}

function Eye({ isClosed, bgColor, size }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })

  const eyeW = size * 1.5
  const eyeH = size
  const pupilR = size * 0.55
  const maxTravel = size * 0.18

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!eyeRef.current || isClosed) return
      const rect = eyeRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const clamp = Math.min(maxTravel / dist, 1)
      setPupil({ x: dx * clamp, y: dy * clamp })
    }

    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [isClosed, maxTravel])

  // When closing, smoothly snap pupil back to center
  useEffect(() => {
    if (isClosed) {
      setPupil({ x: 0, y: 0 })
    }
  }, [isClosed])

  return (
    <div
      ref={eyeRef}
      style={{
        position: "relative",
        width: eyeW,
        height: eyeH,
        borderRadius: eyeH * 0.8,
        background: "white",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 2px 12px rgba(28,28,26,0.08), inset 0 2px 4px rgba(0,0,0,0.05)",
        border: "1px solid #D8D4C8",
      }}
    >
      {/* Pupil */}
      <div
        style={{
          position: "absolute",
          width: pupilR,
          height: pupilR,
          borderRadius: "50%",
          background: "#1C1C1A",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))`,
          transition: isClosed ? "transform 0.2s ease" : "transform 0.04s linear",
        }}
      >
        {/* Pupil Highlight */}
        <div
          style={{
            position: "absolute",
            width: pupilR * 0.28,
            height: pupilR * 0.28,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.7)",
            top: "14%",
            left: "18%",
          }}
        />
      </div>

      {/* Top Eyelid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: bgColor,
          borderRadius: `${eyeH * 0.2}px ${eyeH * 0.2}px 0 0`,
          height: isClosed ? "98%" : "0%",
          transition: "height 0.3s cubic-bezier(0.55, 0, 0.45, 1)",
          zIndex: 2,
        }}
      />

      {/* Bottom Eyelid */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: bgColor,
          borderRadius: `0 0 ${eyeH * 0.6}px ${eyeH * 0.6}px`,
          height: isClosed ? "12%" : "0%",
          transition: "height 0.3s cubic-bezier(0.55, 0, 0.45, 1)",
          zIndex: 2,
        }}
      />
    </div>
  )
}

interface AnimatedEyesProps {
  isClosed: boolean
  size?: number
  bgColor?: string
}

export default function AnimatedEyes({
  isClosed,
  size = 50,
  bgColor = "#F7F5F0", // Warm Alabaster background matching login screen
}: AnimatedEyesProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: size * 0.4,
        alignItems: "center",
        justifyContent: "center",
      }}
      className="select-none pointer-events-none"
    >
      <Eye isClosed={isClosed} bgColor={bgColor} size={size} />
      <Eye isClosed={isClosed} bgColor={bgColor} size={size} />
    </div>
  )
}
