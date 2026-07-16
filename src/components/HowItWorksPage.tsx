import { Link2, Sparkles, Download, LineChart } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      icon: <Link2 className="w-6 h-6 text-[#8E9C78]" />,
      title: "Define Destination",
      desc: "Choose between standard URL redirections, contact files (vCards), structured links (link trees), or static types like SMS, Email, and WiFi. Select 'Dynamic' to retain the ability to change destination URL later.",
    },
    {
      step: "02",
      icon: <Sparkles className="w-6 h-6 text-[#8E9C78]" />,
      title: "Shape the Aesthetic",
      desc: "Customize dots, corner eyes, colors, and branding elements. Switch from standard blocky grids to elegant, brand-aligned shapes like classy dots, rounded dots, or leaf corner eyes.",
    },
    {
      step: "03",
      icon: <Download className="w-6 h-6 text-[#8E9C78]" />,
      title: "Download & Distribute",
      desc: "Export your final code as an SVG vector file for crisp print scaling or a high-res PNG file for online platforms. Print on merchandise, business cards, signs, or brochures.",
    },
    {
      step: "04",
      icon: <LineChart className="w-6 h-6 text-[#8E9C78]" />,
      title: "Track & Update",
      desc: "Access your dashboard to observe analytics. Watch scan distributions over time, filter by device type, OS, and location, or dynamically update the target URL without changing your printed code.",
    },
  ]

  return (
    <div className="bg-[#F7F5F0] py-16 px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8E9C78] font-semibold block mb-3">
            Workflow
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1A] text-wrap-balance leading-tight">
            How Thateasy_qr Works
          </h1>
          <p className="text-[#6F6F6A] mt-4 text-md leading-relaxed font-sans">
            Bridge physical interactions and digital experiences in four straightforward steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#D8D4C8] p-8 rounded-sm hover:border-[#8E9C78] transition-colors duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#F7F5F0] rounded-xs inline-flex">
                    {st.icon}
                  </div>
                  <span className="text-3xl font-serif font-bold text-[#D8D4C8] select-none">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1C1A] mb-3">
                  {st.title}
                </h3>
                <p className="text-sm text-[#6F6F6A] leading-relaxed font-sans">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Callout */}
        <div className="mt-20 border border-[#D8D4C8] bg-white p-8 md:p-12 rounded-sm text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#1C1C1A] max-w-xl mx-auto leading-tight">
            Ready to experience editorial QR codes?
          </h2>
          <p className="text-sm text-[#6F6F6A] mt-4 max-w-lg mx-auto leading-relaxed font-sans">
            Sign up for a free account. No credit card required. Experience dynamic redirects, high-fidelity custom styling, and live analytics dashboards immediately.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#login"
              className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-6 py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="bg-white text-[#1C1C1A] border border-[#D8D4C8] hover:border-[#1C1C1A] px-6 py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
