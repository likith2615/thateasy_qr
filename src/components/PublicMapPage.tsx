import { useState } from "react"
import { QRCodeData } from "../lib/db"
import RealQRPattern from "./RealQRPattern"
import { MapPin, ExternalLink, CreditCard, ArrowRight, Navigation, Check } from "lucide-react"

export default function PublicMapPage({ qr }: { qr: QRCodeData }) {
  const {
    mapLat = "12.9716",
    mapLng = "77.5946",
    mapAddress = "",
    enableMapUpi = false,
    mapUpiPa = "",
    mapUpiPn = "",
    mapUpiAm = "",
  } = qr.content_data || {}

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`
  const upiString = `upi://pay?pa=${mapUpiPa}&pn=${encodeURIComponent(mapUpiPn)}&am=${mapUpiAm}&cu=INR`
  const [copied, setCopied] = useState(false)

  const handleCopyUpi = () => {
    if (!mapUpiPa) return
    navigator.clipboard.writeText(mapUpiPa)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-8 px-4 sm:px-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#D8D4C8] p-6 sm:p-8 rounded-sm shadow-[0_2px_40px_rgba(28,28,26,0.05)] space-y-6">
        
        {/* Title & Location Header */}
        <div className="text-center pb-6 border-b border-[#EDE9E0] space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#8E9C78]/10 border border-[#8E9C78]/20 flex items-center justify-center text-[#8E9C78]">
            <MapPin size={24} />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#8E9C78] font-bold block">
            Location Destination
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1A] tracking-tight">
            {qr.name || "Maps Location"}
          </h1>
          {mapAddress && (
            <p className="text-xs text-[#6F6F6A] max-w-md mx-auto leading-relaxed">
              {mapAddress}
            </p>
          )}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#6F6F6A] bg-[#FAFAF8] px-3 py-1 rounded-xs border border-[#D8D4C8] mt-1">
            <span>Lat: {mapLat}</span>
            <span>•</span>
            <span>Lng: {mapLng}</span>
          </div>
        </div>

        {/* Combined Content Grid */}
        <div className={`grid grid-cols-1 ${enableMapUpi && mapUpiPa ? 'md:grid-cols-2' : ''} gap-6 items-stretch`}>
          
          {/* Navigation Section */}
          <div className="bg-[#FAFAF8] border border-[#D8D4C8] p-5 rounded-sm flex flex-col justify-between space-y-5 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <Navigation size={20} />
              </div>
              <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">
                Go to Maps
              </h2>
              <p className="text-xs text-[#6F6F6A] leading-relaxed">
                Open live turn-by-turn navigation directly in Google Maps app.
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] py-3 px-4 text-xs font-semibold rounded-xs tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer text-decoration-none block"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Associated UPI Payment QR Section (If enabled) */}
          {enableMapUpi && mapUpiPa && (
            <div className="bg-[#FAFAF8] border border-[#D8D4C8] p-5 rounded-sm flex flex-col items-center justify-between space-y-4 text-center">
              <div className="space-y-1">
                <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">
                  Pay via UPI
                </h2>
                <p className="text-[11px] font-mono text-[#6F6F6A]">
                  Payee: <strong className="text-[#1C1C1A]">{mapUpiPn || mapUpiPa}</strong>
                </p>
                {mapUpiAm && (
                  <div className="text-base font-serif font-bold text-[#8E9C78]">
                    ₹{mapUpiAm} INR
                  </div>
                )}
              </div>

              {/* Embedded UPI QR Code */}
              <div className="bg-white p-2 border border-[#D8D4C8] rounded-xs shadow-xs">
                <RealQRPattern
                  value={upiString}
                  size={130}
                  color="#1C1C1A"
                  dotStyle="square"
                  eyeStyle="square"
                  logo={false}
                />
              </div>

              <div className="w-full space-y-2">
                <a
                  href={upiString}
                  className="w-full bg-[#8E9C78] hover:bg-[#7A8866] text-white py-2.5 px-3 text-xs font-semibold rounded-xs tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer text-decoration-none block"
                >
                  <span>Pay via UPI App</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  onClick={handleCopyUpi}
                  className="w-full bg-transparent text-[#6F6F6A] hover:text-[#1C1C1A] text-[11px] font-mono py-1 cursor-pointer border-none flex items-center justify-center gap-1"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : null}
                  <span>{copied ? "Copied UPI ID" : `UPI ID: ${mapUpiPa}`}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Brand Footer */}
      <div className="mt-8 text-center text-xs text-[#6F6F6A]">
        <span>Powered by </span>
        <span className="font-serif font-bold text-[#1C1C1A]">
          Thateasy<span className="italic text-[#8E9C78]">_qr</span>
        </span>
      </div>
    </div>
  )
}
