import {
  Link2,
  Sparkles,
  Download,
  LineChart,
  MapPin,
  FileText,
  Users,
  CreditCard,
  Smartphone,
  MessageSquare,
  Mail,
  PhoneCall,
  Image,
  Video,
  BarChart2,
  ShieldCheck,
} from "lucide-react"

const QR_TYPES = [
  { icon: <Link2 size={16} />, label: "Website URL" },
  { icon: <MessageSquare size={16} />, label: "WhatsApp" },
  { icon: <PhoneCall size={16} />, label: "Phone Call" },
  { icon: <Mail size={16} />, label: "Email" },
  { icon: <Smartphone size={16} />, label: "SMS" },
  { icon: <MapPin size={16} />, label: "Google Maps" },
  { icon: <CreditCard size={16} />, label: "UPI Payment" },
  { icon: <FileText size={16} />, label: "PDF Document" },
  { icon: <Image size={16} />, label: "Image Gallery" },
  { icon: <Video size={16} />, label: "Video" },
  { icon: <Users size={16} />, label: "Multi-Link Page" },
  { icon: <Users size={16} />, label: "Digital Business Card" },
]

const STEPS = [
  {
    step: "01",
    icon: <Link2 className="w-6 h-6 text-[#8E9C78]" />,
    title: "Sign Up & Verify",
    desc: "Create a free account with your email. After registering, check your inbox for a verification email and click the link to activate your account. Once verified, sign in and you're ready to go.",
    tags: ["Email Verification", "Free Tier", "Instant Access"],
    detail: "No credit card required. The free plan supports up to 3 dynamic QR codes and 100 scans/month.",
  },
  {
    step: "02",
    icon: <Sparkles className="w-6 h-6 text-[#8E9C78]" />,
    title: "Choose Your QR Type",
    desc: "Select what your QR code should do. Link to a website, open a WhatsApp chat, dial a phone number, send an email, launch Google Maps navigation, trigger a UPI payment, display a PDF, image, or video, or build a multi-link landing page or digital business card (vCard).",
    tags: ["URL", "WhatsApp", "Phone", "Email", "SMS", "Google Maps", "UPI", "PDF", "Image", "Video", "Multi-Link", "vCard"],
    detail: "Dynamic QR codes let you change the destination anytime without reprinting.",
  },
  {
    step: "03",
    icon: <Sparkles className="w-6 h-6 text-[#8E9C78]" />,
    title: "Customize Your QR Design",
    desc: "Make your QR code brand-aligned. Choose from multiple dot patterns (squares, dots, rounded, classy), corner eye shapes (leaf, rounded, dot), pick your brand color, and upload your logo to embed at the center.",
    tags: ["Dot Patterns", "Eye Frames", "Brand Colors", "Logo Upload", "Live Preview"],
    detail: "Preview updates in real-time as you make changes. Export as high-res PNG or vector SVG.",
  },
  {
    step: "04",
    icon: <Download className="w-6 h-6 text-[#8E9C78]" />,
    title: "Upload Files (if needed)",
    desc: "For PDF, image, or video QR codes, upload your file directly from the dashboard. Free plan supports files up to 1 MB. The file is hosted securely and linked via a dynamic redirect — update the file anytime without changing the printed QR code.",
    tags: ["PDF Upload", "Image Upload", "Video Upload", "1 MB Free / 20 MB Teams", "Secure Hosting"],
    detail: "Supported formats: PDF, JPG, PNG, GIF, MP4, MOV and more.",
  },
  {
    step: "05",
    icon: <Download className="w-6 h-6 text-[#8E9C78]" />,
    title: "Download & Deploy",
    desc: "Export your final QR code as a print-ready SVG vector or high-resolution PNG raster image. Print on merchandise, business cards, signage, brochures, restaurant menus, or product packaging. Share digitally via email, social media, or embed on a website.",
    tags: ["SVG Export", "PNG Export", "Print Ready", "Digital Sharing"],
    detail: "SVG scales infinitely without quality loss — ideal for large-format printing.",
  },
  {
    step: "06",
    icon: <LineChart className="w-6 h-6 text-[#8E9C78]" />,
    title: "Track Analytics in Real Time",
    desc: "Every scan is logged in your dashboard. Filter by device type (mobile/desktop/tablet), operating system, browser, city, and country. View scan trends over time and understand exactly how users are engaging with your QR codes.",
    tags: ["Scan Count", "Device Type", "OS & Browser", "Location", "Time Trends"],
    detail: "Analytics are available immediately after your first scan. No setup required.",
  },
  {
    step: "07",
    icon: <BarChart2 className="w-6 h-6 text-[#8E9C78]" />,
    title: "Update Anytime Without Reprinting",
    desc: "Dynamic QR codes encode a short redirect URL, not the destination directly. This means you can go to your dashboard and change the destination — swap a PDF menu for an updated one, change a landing page URL, or redirect to a seasonal campaign — without touching the printed QR code.",
    tags: ["Dynamic Redirect", "CRUD Operations", "No Reprinting", "Instant Update"],
    detail: "Changes take effect immediately. All previously printed codes automatically point to the new destination.",
  },
  {
    step: "08",
    icon: <ShieldCheck className="w-6 h-6 text-[#8E9C78]" />,
    title: "Manage, Search & Stay Secure",
    desc: "Your dashboard organises all your QR codes with search and filter tools. Pause or reactivate any code instantly. Your account is protected with secure authentication and bot prevention. Scanner privacy is protected — raw IPs are never stored.",
    tags: ["Search & Filter", "Pause / Resume", "Bot Prevention", "No IP Tracking", "Secure Auth"],
    detail: "Enterprise plans include custom domain short-redirects and dedicated API access.",
  },
]

export default function HowItWorksPage() {
  return (
    <div
      className="bg-[#F7F5F0] py-16 px-4 sm:px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8E9C78] font-semibold block mb-3">
            Workflow
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1A] leading-tight">
            How Thateasy_qr Works
          </h1>
          <p className="text-[#6F6F6A] mt-4 text-base leading-relaxed font-sans max-w-lg mx-auto">
            From sign-up to scan analytics — a complete walkthrough of every
            feature on the platform.
          </p>
        </div>

        {/* QR Types Strip */}
        <div className="mb-16 bg-white border border-[#D8D4C8] rounded-sm p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#8E9C78] font-bold mb-4">
            Supported QR Code Types
          </p>
          <div className="flex flex-wrap gap-2">
            {QR_TYPES.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1A] bg-[#F7F5F0] border border-[#D8D4C8] px-3 py-1.5 rounded-xs"
              >
                <span className="text-[#8E9C78]">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {STEPS.map((st, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#D8D4C8] rounded-sm hover:border-[#8E9C78] transition-colors duration-300 overflow-hidden"
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Step number + icon */}
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 shrink-0">
                  <div className="p-2.5 bg-[#F7F5F0] rounded-xs inline-flex border border-[#D8D4C8]">
                    {st.icon}
                  </div>
                  <span className="text-3xl font-serif font-bold text-[#D8D4C8] select-none leading-none">
                    {st.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1C1A] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-[#6F6F6A] leading-relaxed mb-4">
                    {st.desc}
                  </p>

                  {/* Detail note */}
                  <p className="text-[11px] text-[#8E9C78] font-mono leading-relaxed mb-4 border-l-2 border-[#8E9C78]/30 pl-3">
                    {st.detail}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {st.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wide text-[#6F6F6A] bg-[#F7F5F0] border border-[#D8D4C8] px-2 py-1 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Capability Grid */}
        <div className="mt-16 bg-[#1C1C1A] rounded-sm p-8 sm:p-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#8E9C78] font-bold mb-6">
            Full Feature Set
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {[
              "User Authentication",
              "Dashboard & Overview",
              "Profile Management",
              "Static & Dynamic QR Codes",
              "QR CRUD Operations",
              "QR Customization Studio",
              "QR Analytics (Device / Location / OS)",
              "Multi-Link QR Pages",
              "Digital Business Card (vCard)",
              "Website, WhatsApp, Phone, Email & SMS QR",
              "Google Maps & UPI QR",
              "PDF, Image & Video QR",
              "Secure File Uploads",
              "Download QR (PNG / SVG)",
              "Search & Filters",
              "Bot Prevention",
              "No IP Tracking (Privacy-first)",
              "Responsive Design",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="#8E9C78">
                  <path d="M10 2L4.5 9 2 6" stroke="#8E9C78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="text-xs text-[rgba(247,245,240,0.75)] font-sans">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 border border-[#D8D4C8] bg-white p-8 md:p-12 rounded-sm text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#1C1C1A] max-w-xl mx-auto leading-tight">
            Ready to create your first QR code?
          </h2>
          <p className="text-sm text-[#6F6F6A] mt-4 max-w-lg mx-auto leading-relaxed font-sans">
            Sign up for a free account. No credit card required. Start with
            dynamic QR codes, custom styling, and live analytics — instantly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#signup"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-6 py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors no-underline"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="bg-white text-[#1C1C1A] border border-[#D8D4C8] hover:border-[#1C1C1A] px-6 py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors no-underline"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
