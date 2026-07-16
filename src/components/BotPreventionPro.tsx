import { useState, useEffect, useRef, useCallback } from "react"
import { Shield, Check, AlertCircle, ArrowDown } from "lucide-react"

interface BotPreventionProProps {
  onVerify: (verified: boolean) => void
  triggerWarning?: boolean
}

export default function BotPreventionPro({
  onVerify,
  triggerWarning = false,
}: BotPreventionProProps) {
  const [state, setState] = useState<"default" | "holding" | "warning" | "error" | "success">("default")
  const [progress, setProgress] = useState(0)
  const [honeypot, setHoneypot] = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const holdDurationSeconds = 2
  const warningDurationSeconds = 4

  const stateRef = useRef(state)
  const progressRef = useRef(progress)
  const honeypotRef = useRef(honeypot)
  const isSpaceDownRef = useRef(false)
  const holdIntervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Keep refs in sync to avoid stale closure issues in event listeners
  useEffect(() => { stateRef.current = state }, [state])
  useEffect(() => { progressRef.current = progress }, [progress])
  useEffect(() => { honeypotRef.current = honeypot }, [honeypot])

  const handleVerificationComplete = useCallback(() => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current)
      holdIntervalRef.current = null
    }

    const isBot = honeypotRef.current !== ""
    if (isBot) {
      setState("error")
      setProgress(0)
      onVerify(false)
      setTimeout(() => {
        setState((prev) => (prev === "error" ? "default" : prev))
      }, 3000)
      return
    }

    setState("success")
    setProgress(100)
    onVerify(true)

    // Dispatch window event for external handlers if any
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("botProtectionVerified", { detail: { verified: true } })
      )
    }
  }, [onVerify])

  const handleMouseDown = useCallback(
    (e?: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
      if (stateRef.current === "success" || stateRef.current === "error") return
      if (e && e.preventDefault && e.type !== "keydown") {
        e.preventDefault()
      }

      setState("holding")
      setShowWarning(false)
      startTimeRef.current = Date.now()

      holdIntervalRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current
          const newProgress = Math.min((elapsed / (holdDurationSeconds * 1000)) * 100, 100)
          setProgress(newProgress)

          if (newProgress >= 100) {
            handleVerificationComplete()
          }
        }
      }, 16)
    },
    [holdDurationSeconds, handleVerificationComplete]
  )

  const handleMouseUp = useCallback(() => {
    if (stateRef.current === "success") return

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current)
      holdIntervalRef.current = null
    }

    if (progressRef.current < 100) {
      setState("default")
      setProgress(0)
    }
    startTimeRef.current = null
  }, [])

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
      }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault()
        if (!isSpaceDownRef.current) {
          isSpaceDownRef.current = true
          handleMouseDown(e)
        }
      }
    },
    [handleMouseDown]
  )

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault()
        isSpaceDownRef.current = false
        handleMouseUp()
      }
    },
    [handleMouseUp]
  )

  // Intercept triggerWarning from parent
  useEffect(() => {
    if (triggerWarning && state !== "success") {
      setState("warning")
      setShowWarning(true)
      const timer = setTimeout(() => {
        setShowWarning(false)
        setState((prev) => (prev === "warning" ? "default" : prev))
      }, warningDurationSeconds * 1000)
      return () => clearTimeout(timer)
    }
  }, [triggerWarning, state])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current)
    }
  }, [])

  // Helper for rendering current icon box styling
  const getIconStyles = () => {
    switch (state) {
      case "success":
        return {
          bg: "bg-[#8E9C78]/10 border-[#8E9C78]/20",
          text: "text-[#8E9C78]",
        }
      case "error":
        return {
          bg: "bg-red-50 border-red-100",
          text: "text-red-600",
        }
      case "warning":
        return {
          bg: "bg-amber-50 border-amber-100",
          text: "text-amber-600",
        }
      default:
        return {
          bg: "bg-[#FAFAF8] border-[#D8D4C8]",
          text: "text-[#6F6F6A]",
        }
    }
  }

  const iconStyle = getIconStyles()

  return (
    <div className="w-full space-y-3 font-sans" id="hold-bot-verification">
      {/* Honeypot field (hidden from real users but readable by bots) */}
      <input
        type="text"
        name="bot_trap_field_ignore"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] w-px h-px opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="new-password"
        data-lpignore="true"
        data-1p-ignore="true"
        aria-hidden="true"
      />

      {/* Warning/Error alert banners */}
      <div className="relative overflow-hidden transition-all duration-300">
        {showWarning && state === "warning" && (
          <div className="flex items-start gap-3 p-3 rounded-xs bg-[#FEF3C7]/90 border border-[#FDE68A]/80 shadow-xs animate-in fade-in duration-200">
            <ArrowDown className="text-amber-600 w-4 h-4 mt-0.5 animate-bounce" />
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              Please complete the verification check before submitting the form.
            </p>
          </div>
        )}

        {state === "error" && (
          <div className="flex items-start gap-3 p-3 rounded-xs bg-red-50 border border-red-200 shadow-xs animate-in fade-in duration-200">
            <AlertCircle className="text-red-600 w-4 h-4 mt-0.5" />
            <p className="text-xs text-red-800 font-medium leading-relaxed">
              Verification failed. Please try again.
            </p>
          </div>
        )}
      </div>

      {/* Verification Card */}
      <div className="p-4 border border-[#D8D4C8] rounded-xs bg-white/50 backdrop-blur-xs flex flex-col gap-4">
        <div className="flex items-start gap-4">
          {/* Icon Box */}
          <div
            className={`w-12 h-12 rounded-sm border flex items-center justify-center transition-all duration-500 shrink-0 ${iconStyle.bg}`}
          >
            {state === "success" ? (
              <Check className={`${iconStyle.text} w-5 h-5 animate-in zoom-in duration-300`} />
            ) : state === "error" ? (
              <AlertCircle className={`${iconStyle.text} w-5 h-5`} />
            ) : state === "warning" ? (
              <AlertCircle className={`${iconStyle.text} w-5 h-5`} />
            ) : (
              <Shield className={`${iconStyle.text} w-5 h-5`} />
            )}
          </div>

          {/* Texts */}
          <div className="flex-1 min-w-0">
            {state === "success" ? (
              <div>
                <h3 className="font-serif text-sm font-bold text-[#1C1C1A] mb-0.5 leading-snug">
                  Verified successfully
                </h3>
                <p className="text-[11px] text-[#6F6F6A] font-mono leading-none uppercase tracking-wider">
                  Verification complete
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-sm font-bold text-[#1C1C1A] mb-0.5 leading-snug">
                  Hold to verify for {holdDurationSeconds} seconds
                </h3>
                <p className="text-[11px] text-[#6F6F6A] font-mono leading-none uppercase tracking-wider">
                  Security powered by Thateasy_qr
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          tabIndex={0}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown()}
          onTouchEnd={handleMouseUp}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={state === "success"}
          className={`relative w-full py-2.5 rounded-xs overflow-hidden cursor-pointer select-none outline-none border transition-all duration-300 active:scale-[0.98] ${
            state === "success"
              ? "bg-[#8E9C78] border-[#8E9C78] text-[#F7F5F0] cursor-default active:scale-100"
              : "bg-[#1C1C1A] hover:bg-[#3A3A38] border-[#1C1C1A] hover:border-[#3A3A38] text-[#F7F5F0]"
          }`}
        >
          {/* Progress Bar overlay */}
          {state !== "success" && (
            <div
              style={{
                width: `${progress}%`,
              }}
              className="absolute inset-0 bg-[#8E9C78] origin-left z-0 transition-all duration-[16ms] ease-linear"
            />
          )}

          {/* Button Text */}
          <div className="relative z-10 flex items-center justify-center gap-2 font-medium text-xs tracking-wider uppercase font-mono">
            {state === "success" ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Verification Complete</span>
              </>
            ) : state === "holding" ? (
              <span>Keep holding... {Math.floor(progress)}%</span>
            ) : (
              <span>Hold to Verify</span>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
