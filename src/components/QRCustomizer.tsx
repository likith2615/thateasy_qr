import { useState } from "react"
import RealQRPattern, { downloadQR } from "./RealQRPattern"

type DotStyle = "square" | "dots" | "rounded" | "classy"
type EyeStyle = "square" | "circle" | "rounded" | "leaf"

const DOT_STYLES: { id: DotStyle; label: string }[] = [
  { id: "square", label: "Classic" },
  { id: "dots", label: "Dots" },
  { id: "rounded", label: "Rounded" },
  { id: "classy", label: "Classy" },
]

const EYE_STYLES: { id: EyeStyle; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "circle", label: "Circle" },
  { id: "rounded", label: "Rounded" },
  { id: "leaf", label: "Leaf" },
]

const PALETTE = [
  "#1C1C1A",
  "#8E9C78",
  "#2D4A8A",
  "#8B3A3A",
  "#4A6B8A",
  "#6B4A8A",
]

export default function QRCustomizer() {
  const [dotStyle, setDotStyle] = useState<DotStyle>("rounded")
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>("rounded")
  const [color, setColor] = useState("#1C1C1A")
  const [url, setUrl] = useState("https://www.linkedin.com/in/likith-kumar-chippe/")
  const [logo, setLogo] = useState(true)

  return (
    <div className="w-full max-w-[440px] bg-white border border-[#D8D4C8] rounded-[2px] overflow-hidden shadow-[0_4px_30px_rgba(28,28,26,0.06)] animate-fadeIn">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#EDE9E0] flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider uppercase text-[#6F6F6A]">
          Live Customizer
        </span>
        <span className="text-xs text-[#8E9C78] font-semibold">● Preview</span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[#EDE9E0]">
        {/* Controls */}
        <div className="p-6 flex flex-col gap-5">
          {/* Static QR Ports Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#EDE9E0] pb-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#6F6F6A]">
                Sample Profile QR Ports
              </span>
              <span className="text-[8px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-semibold">
                ✓ Static Secured
              </span>
            </div>
            
            <div className="space-y-2">
              {[
                { 
                  label: "LinkedIn Profile", 
                  value: "https://www.linkedin.com/in/likith-kumar-chippe/",
                  username: "/in/likith-kumar-chippe",
                  activeColor: "#0077B5"
                },
                { 
                  label: "Instagram Profile", 
                  value: "https://www.instagram.com/ft_._likith",
                  username: "@ft_._likith",
                  activeColor: "#E1306C"
                },
                { 
                  label: "GitHub Profile", 
                  value: "https://github.com/likith2615",
                  username: "@likith2615",
                  activeColor: "#333333"
                }
              ].map((lnk) => {
                const isActive = url === lnk.value
                return (
                  <button
                    key={lnk.label}
                    type="button"
                    onClick={() => setUrl(lnk.value)}
                    className={`w-full text-left border p-2.5 rounded-xs transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? "bg-white shadow-[0_2px_8px_rgba(28,28,26,0.04)]" 
                        : "bg-[#FAFAF8] opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      borderColor: isActive ? lnk.activeColor : "#D8D4C8",
                      borderLeftWidth: isActive ? "3px" : "1px",
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <span 
                        className="text-[11px] font-serif font-bold transition-colors block truncate"
                        style={{ color: isActive ? lnk.activeColor : "#1C1C1A" }}
                      >
                        {lnk.label}
                      </span>
                      <span className="text-[9px] font-mono text-[#6F6F6A] mt-0.5 block truncate">
                        {lnk.username}
                      </span>
                    </div>
                    <span 
                      className={`text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs transition-all shrink-0 ${
                        isActive 
                          ? "text-white font-bold" 
                          : "text-[#6F6F6A] bg-[#EDE9E0]"
                      }`}
                      style={{
                        backgroundColor: isActive ? lnk.activeColor : undefined
                      }}
                    >
                      {isActive ? "Encoded" : "Select"}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dot style */}
          <div>
            <label className="font-mono text-xs tracking-wider uppercase text-[#6F6F6A] block mb-2">
              Dot Pattern
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {DOT_STYLES.map(({ id, label }) => {
                const isActive = dotStyle === id
                return (
                  <button
                    key={id}
                    onClick={() => setDotStyle(id)}
                    className="py-1.5 px-1 text-xs font-semibold rounded-[2px] border transition-all cursor-pointer text-center"
                    style={{
                      borderColor: isActive ? color : "#D8D4C8",
                      backgroundColor: isActive ? `${color}12` : "transparent",
                      color: isActive ? color : "#6F6F6A",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Eye style */}
          <div>
            <label className="font-mono text-xs tracking-wider uppercase text-[#6F6F6A] block mb-2">
              Eye Frame
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {EYE_STYLES.map(({ id, label }) => {
                const isActive = eyeStyle === id
                return (
                  <button
                    key={id}
                    onClick={() => setEyeStyle(id)}
                    className="py-1.5 px-1 text-xs font-semibold rounded-[2px] border transition-all cursor-pointer text-center"
                    style={{
                      borderColor: isActive ? color : "#D8D4C8",
                      backgroundColor: isActive ? `${color}12` : "transparent",
                      color: isActive ? color : "#6F6F6A",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="font-mono text-xs tracking-wider uppercase text-[#6F6F6A] block mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    border:
                      color === c
                        ? "2px solid #1C1C1A"
                        : "2px solid transparent",
                    outline: color === c ? "2px solid #F7F5F0" : "none",
                  }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          {/* Logo toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-xs tracking-wider uppercase text-[#6F6F6A]">
              Center Logo
            </span>
            <button
              onClick={() => setLogo(!logo)}
              className="w-9 h-5 rounded-full relative cursor-pointer transition-colors border-none"
              style={{
                backgroundColor: logo ? "#8E9C78" : "#D8D4C8",
              }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all block"
                style={{
                  left: logo ? "18px" : "2px",
                }}
              />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 flex flex-col items-center justify-center gap-4 bg-[#FAFAF8]">
          <RealQRPattern
            value={url}
            color={color}
            dotStyle={dotStyle}
            eyeStyle={eyeStyle}
            logo={logo}
            size={168}
          />
          <button
            type="button"
            onClick={() => downloadQR("sandbox_preset", url, color, dotStyle, eyeStyle, logo, "svg")}
            className="font-semibold text-xs text-[#F7F5F0] bg-[#1C1C1A] hover:bg-[#3A3A38] px-4 py-2 rounded-[2px] text-center inline-block whitespace-nowrap transition-colors cursor-pointer border-none"
          >
            Download SVG ↓
          </button>
        </div>
      </div>
    </div>
  )
}
