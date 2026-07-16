import { QrCode, Sliders, BarChart3, RefreshCw, Smartphone, ShieldCheck } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sliders className="w-6 h-6 text-[#8E9C78]" />,
      title: "Bespoke Customization",
      desc: "Go beyond standard pixelated grids. Design bespoke QR codes using unique dot structures, custom corner eyes, custom brand colors, and integrated logos.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#8E9C78]" />,
      title: "Smart Dynamic Redirection",
      desc: "Change the destination URL of your QR code at any time without reprinting. Update links, vCards, or hosted files on the fly.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#8E9C78]" />,
      title: "Granular Scan Analytics",
      desc: "Track device type, browser, OS, city, and country for every scan. Gain rich insights into user engagement over custom time windows.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#8E9C78]" />,
      title: "Elegant Public Templates",
      desc: "Generate premium mobile-friendly landing pages for digital business cards (vCards), link trees, and downloadable files that match your branding.",
    },
    {
      icon: <QrCode className="w-6 h-6 text-[#8E9C78]" />,
      title: "Vector SVG & High-Res PNG Exports",
      desc: "Export your customized designs as production-ready SVGs or high-resolution PNGs. Perfect for high-quality packaging, print ads, and digital displays.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#8E9C78]" />,
      title: "GDPR & Privacy Compliant",
      desc: "We prioritize user privacy. Scan analytics are logged with respect to user preferences and global data protection guidelines.",
    },
  ]

  return (
    <div className="bg-[#F7F5F0] py-16 px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8E9C78] font-semibold block mb-3">
            Capabilities
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1A] text-wrap-balance leading-tight">
            Designed for brand builders and professionals.
          </h1>
          <p className="text-[#6F6F6A] mt-4 text-md leading-relaxed font-sans">
            Every feature is crafted to help you present yourself physically and digitally with elegance and confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#D8D4C8] p-8 rounded-sm hover:border-[#8E9C78] transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 inline-flex p-3 bg-[#F7F5F0] rounded-xs">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1C1C1A] mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#6F6F6A] leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Highlight Section */}
        <div className="mt-20 border border-[#D8D4C8] bg-[#EDE9E0] p-8 md:p-12 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1C1C1A] leading-tight">
              A physical bridge to your digital presence.
            </h2>
            <p className="text-sm text-[#6F6F6A] mt-4 leading-relaxed font-sans">
              Thateasy_qr's engine constructs mathematically sound QR codes while allowing artists and brands to sculpt the visual details. No more ugly, industrial black-and-white grids on high-end business cards or signs.
            </p>
            <div className="mt-8">
              <a
                href="#login"
                className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-6 py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors inline-block"
              >
                Create your first code
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Minimal visual asset */}
            <div className="border border-[#D8D4C8] bg-white p-6 rounded-xs shadow-sm max-w-[280px]">
              <div className="aspect-square bg-[#F7F5F0] rounded-xs flex items-center justify-center p-4 border border-[#EDE9E0]">
                {/* SVG Mock QR Code */}
                <svg className="w-full h-full text-[#8E9C78]" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corners */}
                  <rect x="5" y="5" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="11" y="11" width="13" height="13" rx="2" />
                  <rect x="70" y="5" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="76" y="11" width="13" height="13" rx="2" />
                  <rect x="5" y="70" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="11" y="76" width="13" height="13" rx="2" />
                  {/* Mock dot pattern */}
                  <circle cx="45" cy="15" r="4" />
                  <circle cx="55" cy="15" r="3" />
                  <circle cx="45" cy="25" r="3" />
                  <circle cx="55" cy="25" r="4" />
                  <circle cx="15" cy="45" r="4" />
                  <circle cx="25" cy="45" r="3" />
                  <circle cx="15" cy="55" r="3" />
                  <circle cx="25" cy="55" r="4" />
                  <circle cx="45" cy="45" r="4" />
                  <circle cx="55" cy="45" r="4" />
                  <circle cx="45" cy="55" r="3" />
                  <circle cx="55" cy="55" r="4" />
                  <circle cx="75" cy="45" r="3" />
                  <circle cx="85" cy="45" r="4" />
                  <circle cx="75" cy="55" r="4" />
                  <circle cx="85" cy="55" r="3" />
                  <circle cx="45" cy="75" r="4" />
                  <circle cx="55" cy="75" r="3" />
                  <circle cx="45" cy="85" r="3" />
                  <circle cx="55" cy="85" r="4" />
                  <circle cx="75" cy="75" r="4" />
                  <circle cx="85" cy="75" r="4" />
                  <circle cx="75" cy="85" r="3" />
                  <circle cx="85" cy="85" r="4" />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs font-semibold text-[#1C1C1A] font-serif">Sage & Alabaster Palette</p>
                <p className="text-[10px] text-[#6F6F6A] font-mono mt-1">DYNAMIC REDIRECT ACTIVE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
