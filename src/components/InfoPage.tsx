import { useState } from "react"
import { ArrowLeft, BookOpen, Calendar, HelpCircle, Mail, MapPin, Phone, Shield, Sparkles, Terminal, Utensils } from "lucide-react"

interface InfoPageProps {
  mode:
    | "restaurant-menus"
    | "event-tickets"
    | "product-packaging"
    | "business-cards"
    | "press-kit"
    | "about"
    | "contact"
    | "terms"
    | "privacy"
  isLoggedIn?: boolean
  onBack: () => void
}

export default function InfoPage({ mode, isLoggedIn, onBack }: InfoPageProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" })

  const handleCreateYourOwn = (type: string) => {
    sessionStorage.setItem("thateasy_qr_pending_create_type", type)
    if (isLoggedIn) {
      window.location.hash = "#dashboard"
    } else {
      window.location.hash = "#login"
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.msg) {
      alert("Please fill in all fields.")
      return
    }
    const text = `Hi Likith! 👋\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.msg}`
    const waUrl = `https://wa.me/918179072511?text=${encodeURIComponent(text)}`
    window.open(waUrl, "_blank", "noopener,noreferrer")
    setContactSubmitted(true)
  }

  const getPageTitle = () => {
    switch (mode) {
      case "restaurant-menus":
        return "Contactless Restaurant Menus"
      case "event-tickets":
        return "Dynamic Event Ticketing"
      case "product-packaging":
        return "Smart Product Packaging"
      case "business-cards":
        return "Digital Business Cards"
      case "press-kit":
        return "Thateasy_qr Press & Media Kit"
      case "about":
        return "About Thateasy_qr"
      case "contact":
        return "Connect With Us"
      case "terms":
        return "Terms & Conditions"
      case "privacy":
        return "Privacy Policy"
    }
  }

  const renderSectionContent = () => {
    switch (mode) {
      case "restaurant-menus":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#8E9C78]">
              <Utensils size={40} className="stroke-[1.5]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6A]">Use Case</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Fine Dining Contactless Menus</h3>
              </div>
            </div>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Thateasy_qr enables Michelin-starred restaurants and boutique cafes to design beautiful digital menus. 
              Upload menus directly as a PDF, and update them instantly without printing new QR codes.
            </p>
            <div className="bg-white border border-[#D8D4C8] p-5 rounded-xs space-y-4">
              <span className="text-[10px] font-mono text-[#8E9C78] uppercase tracking-wider block font-bold">Interactive Preview: Le Petit Jardin Menu</span>
              <div className="border-t border-[#EDE9E0] pt-3 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-serif font-bold text-[#1C1C1A]">Seared Duck Breast</span>
                  <span className="text-xs font-mono text-[#6F6F6A]">$38.00</span>
                </div>
                <p className="text-xs text-[#6F6F6A] italic">Served with local honey-glazed turnips, roasted figs, and red wine reduction.</p>
                
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm font-serif font-bold text-[#1C1C1A]">Wild Mushroom Risotto</span>
                  <span className="text-xs font-mono text-[#6F6F6A]">$29.00</span>
                </div>
                <p className="text-xs text-[#6F6F6A] italic">Acquerello rice, chanterelle mushrooms, black truffle shavings, aged Parmigiano-Reggiano.</p>
              </div>
            </div>
            <div className="bg-[#EDE9E0] p-4 rounded-xs border border-[#D8D4C8] mb-6">
              <h4 className="text-xs font-mono font-bold text-[#1C1C1A] uppercase tracking-wider">Why restaurants prefer Thateasy_qr:</h4>
              <ul className="text-xs text-[#6F6F6A] list-disc list-inside space-y-2 mt-3 leading-relaxed">
                <li><strong className="text-[#1C1C1A]">100% Dynamic:</strong> Change pricing or seasonal items instantly from your dashboard.</li>
                <li><strong className="text-[#1C1C1A]">Ultra-High Scan Rates:</strong> Embedded outlines ensure fast scanning under dim dining lights.</li>
                <li><strong className="text-[#1C1C1A]">Zero Neon Clutter:</strong> Minimalist design preserves your table aesthetics.</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EDE9E0] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Ready to design your contactless menu?</h4>
                <p className="text-xs text-[#6F6F6A]">Upload your PDF menu and get a custom QR code instantly.</p>
              </div>
              <button
                onClick={() => handleCreateYourOwn("file")}
                className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
              >
                Create Menu QR →
              </button>
            </div>
          </div>
        )

      case "event-tickets":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#8E9C78]">
              <Calendar size={40} className="stroke-[1.5]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6A]">Use Case</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Premium Ticketing & Check-In</h3>
              </div>
            </div>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Ditch ugly barcode templates. Generate beautiful, branded entry credentials for galas, tech conferences, and exclusive art exhibitions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#D8D4C8] p-4 rounded-xs">
                <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">Attendee Pass</span>
                <div className="border-t border-[#EDE9E0] pt-2 mt-2 space-y-1">
                  <div className="text-xs font-bold text-[#1C1C1A]">Vesper Art Gala 2026</div>
                  <div className="text-[10px] text-[#6F6F6A]">VIP All-Access Pass</div>
                  <div className="text-[9px] font-mono text-[#8E9C78] mt-3">ID: VESPER-9281-VIP</div>
                </div>
              </div>
              <div className="bg-white border border-[#D8D4C8] p-4 rounded-xs">
                <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">Real-time Checkins</span>
                <div className="border-t border-[#EDE9E0] pt-2 mt-2 space-y-1">
                  <div className="text-xs font-bold text-[#1C1C1A]">99.4% Verified</div>
                  <div className="text-[10px] text-[#6F6F6A]">Scan validation happens in &lt;150ms.</div>
                  <div className="text-[9px] font-mono text-emerald-700 mt-3 font-semibold">✓ API Integrated</div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EDE9E0] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Design custom tickets for your event</h4>
                <p className="text-xs text-[#6F6F6A]">Generate dynamic, scannable QR tickets for your guests.</p>
              </div>
              <button
                onClick={() => handleCreateYourOwn("url")}
                className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
              >
                Create Ticket QR →
              </button>
            </div>
          </div>
        )

      case "product-packaging":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#8E9C78]">
              <Sparkles size={40} className="stroke-[1.5]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6A]">Use Case</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Authentic Product Packaging</h3>
              </div>
            </div>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Connect physical products with digital experiences. Share origin stories, instructions, and warranty registration pages.
            </p>
            <div className="bg-white border border-[#D8D4C8] p-5 rounded-xs">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block mb-2">Sustainable Tracing Demo</span>
              <p className="text-xs text-[#6F6F6A] leading-relaxed">
                Scan on apparel tags redirects users to a localized carbon footprint report and transparent sourcing breakdown:
              </p>
              <div className="bg-[#FAFAF8] p-3 border border-[#EDE9E0] rounded-xs mt-3 text-xs space-y-1">
                <div><span className="font-bold text-[#1C1C1A]">Loomed:</span> Biella, Italy</div>
                <div><span className="font-bold text-[#1C1C1A]">Tailored:</span> Porto, Portugal</div>
                <div><span className="font-bold text-[#1C1C1A]">Material:</span> 100% Certified Organic Linen</div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EDE9E0] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Connect packaging to digital experiences</h4>
                <p className="text-xs text-[#6F6F6A]">Link products to carbon reports, tracing info, or user manuals.</p>
              </div>
              <button
                onClick={() => handleCreateYourOwn("url")}
                className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
              >
                Create Packaging QR →
              </button>
            </div>
          </div>
        )

      case "business-cards":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#8E9C78]">
              <Mail size={40} className="stroke-[1.5]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6A]">Use Case</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Digital Business Cards</h3>
              </div>
            </div>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Make networking frictionless. Share your name, company, email, phone number, and social links instantly with a single scan.
            </p>
            <div className="bg-white border border-[#D8D4C8] p-5 rounded-xs space-y-3 max-w-sm mx-auto shadow-[0_1px_5px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Alex Mercer</h4>
                  <p className="text-[10px] text-[#6F6F6A] font-mono">Lead Security Developer</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#EDE9E0] flex items-center justify-center font-serif font-bold text-xs text-[#8E9C78]">AM</div>
              </div>
              <div className="border-t border-[#EDE9E0] pt-3 text-[11px] space-y-1 text-[#6F6F6A]">
                <div>✉ alex.mercer@nxtgensec.com</div>
                <div>☎ +1 (555) 019-2834</div>
                <div>🌐 nxtgensec.com</div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EDE9E0] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Share contact info instantly</h4>
                <p className="text-xs text-[#6F6F6A]">Generate a digital business card (vCard) for your team or self.</p>
              </div>
              <button
                onClick={() => handleCreateYourOwn("vcard")}
                className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
              >
                Create Business Card QR →
              </button>
            </div>
          </div>
        )

      case "press-kit":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#8E9C78]">
              <Terminal size={40} className="stroke-[1.5]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6A]">Resources</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Thateasy_qr Press & Media Assets</h3>
              </div>
            </div>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Access official brand guidelines, logo SVGs, team bios, and executive assets for media publications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#D8D4C8] p-4 rounded-xs space-y-2">
                <span className="text-xs font-bold text-[#1C1C1A] block">High-Res Brand Logos</span>
                <p className="text-[10px] text-[#6F6F6A] leading-relaxed">Includes SVG vector files, dark theme alternatives, and high-res transparent PNGs.</p>
                <button className="text-[10px] font-mono text-[#8E9C78] hover:text-[#1C1C1A] underline font-bold">Download Asset Kit (4.8 MB)</button>
              </div>
              <div className="bg-white border border-[#D8D4C8] p-4 rounded-xs space-y-2">
                <span className="text-xs font-bold text-[#1C1C1A] block">Official Press Release</span>
                <p className="text-[10px] text-[#6F6F6A] leading-relaxed">Introducing Thateasy_qr's "Editorial Sanctuary" design platform for custom QR creation.</p>
                <button className="text-[10px] font-mono text-[#8E9C78] hover:text-[#1C1C1A] underline font-bold">Download PDF Release</button>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EDE9E0] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">Build a dynamic media press-kit</h4>
                <p className="text-xs text-[#6F6F6A]">Distribute logo files, copy assets, and press releases.</p>
              </div>
              <button
                onClick={() => handleCreateYourOwn("file")}
                className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
              >
                Create Press Kit QR →
              </button>
            </div>
          </div>
        )

      case "about":
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1C1A]">Our Story</h3>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Thateasy_qr was founded in 2026 out of frustration with generic, neon-colored, clunky QR codes that cluttered beautiful print layouts and product packaging. 
              We envisioned a platform that prioritized classic typography, quiet confidence, and zero flashy elements.
            </p>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Our core design philosophy is <em className="font-serif italic text-[#1C1C1A]">"The Editorial Sanctuary"</em> — warm cream backdrops, high-contrast inkstone borders, and custom outline margins that make codes scan instantly while blending seamlessly with high-end print design.
            </p>
            <div className="bg-[#FAFAF8] border border-[#D8D4C8] p-5 rounded-xs space-y-3">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">Our Core Pillars</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#EDE9E0] pt-3">
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">Design First</h4>
                  <p className="text-[10px] text-[#6F6F6A] mt-1 leading-relaxed">QR codes should respect and elevate the packaging they live on.</p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">Privacy Centric</h4>
                  <p className="text-[10px] text-[#6F6F6A] mt-1 leading-relaxed">We proxy scan data and mask IP details to protect users.</p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">Frictionless</h4>
                  <p className="text-[10px] text-[#6F6F6A] mt-1 leading-relaxed">Reliable checking in under 150ms on all device models.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1C1A]">Get in touch</h3>
            <p className="text-sm text-[#6F6F6A] leading-relaxed">
              Have questions, ideas, or want to collaborate? Reach out to <strong className="text-[#1C1C1A]">C. Likith Kumar</strong>, the creator of Thateasy_qr — always happy to connect.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {contactSubmitted ? (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-6 rounded-xs text-center space-y-2">
                    <span className="text-lg">✓</span>
                    <h4 className="font-serif font-bold text-sm">Message Sent Successfully</h4>
                    <p className="text-xs text-[#6F6F6A] leading-relaxed">Thank you for reaching out. Likith will respond shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="bg-white border border-[#D8D4C8] p-5 rounded-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Message Details</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded-xs tracking-wider uppercase font-mono cursor-pointer transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
              <div className="bg-[#FAFAF8] border border-[#D8D4C8] p-5 rounded-xs space-y-5 text-xs text-[#6F6F6A]">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1C1C1A] font-bold block">C. Likith Kumar</span>
                  <span className="text-[11px] text-[#8E9C78] font-medium">Creator · Thateasy_qr</span>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918179072511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group cursor-pointer no-underline"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#25D366] text-white flex-shrink-0 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="text-[#1C1C1A] font-medium group-hover:text-[#25D366] transition-colors">WhatsApp</div>
                    <div className="font-mono text-[10px]">+91 817-9072511</div>
                  </div>
                </a>

                {/* Figma */}
                <a
                  href="https://www.figma.com/@likithkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group cursor-pointer no-underline"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1C1C1A] text-white flex-shrink-0 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 38 57" width="12" height="12" fill="currentColor">
                      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
                      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
                      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
                      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="text-[#1C1C1A] font-medium group-hover:text-[#A259FF] transition-colors">Figma Profile</div>
                    <div className="font-mono text-[10px]">@likithkumar</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/likith-kumar-chippe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group cursor-pointer no-underline"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#0077B5] text-white flex-shrink-0 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="text-[#1C1C1A] font-medium group-hover:text-[#0077B5] transition-colors">LinkedIn</div>
                    <div className="font-mono text-[10px]">/in/likith-kumar-chippe</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        )

      case "terms":
        return (
          <div className="space-y-6 text-sm text-[#6F6F6A] leading-relaxed">
            <div className="flex items-center gap-3 text-[#8E9C78] border-b border-[#EDE9E0] pb-3">
              <BookOpen size={24} className="stroke-[1.5]" />
              <h3 className="font-serif text-2xl font-bold text-[#1C1C1A] m-0">Thateasy_qr Terms of Service</h3>
            </div>
            <p className="text-xs italic">Last Updated: July 16, 2026</p>
            <div className="space-y-4 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">1. Agreement to Terms</h4>
              <p>By registering for an account or creating dynamic codes using Thateasy_qr, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must not use our platform.</p>
              
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">2. Accounts & Subscriptions</h4>
              <p>Users must provide accurate details upon signing up. We offer two core account tiers:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Basic (Free) Tier:</strong> Standard customization. File upload sizes are strictly capped at <strong>1 MB</strong> per file.</li>
                <li><strong>Teams Tier:</strong> Advanced customizations, logo frames, analytics export, and file upload sizes capped at <strong>20 MB</strong>.</li>
              </ul>
              
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">3. Prohibited Content</h4>
              <p>You may not use Thateasy_qr to point to malicious software, phishing pages, pornographic content, spam campaigns, or any URL violating local or international regulations. We reserve the right to delete and ban accounts that violate these restrictions immediately.</p>
              
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">4. System Limitations</h4>
              <p>We guarantee a 99.9% uptime for dynamic redirection endpoints. We are not liable for any print material printed with codes that redirect incorrectly due to user configuration errors.</p>
            </div>
          </div>
        )

      case "privacy":
        return (
          <div className="space-y-6 text-sm text-[#6F6F6A] leading-relaxed">
            <div className="flex items-center gap-3 text-[#8E9C78] border-b border-[#EDE9E0] pb-3">
              <Shield size={24} className="stroke-[1.5]" />
              <h3 className="font-serif text-2xl font-bold text-[#1C1C1A] m-0">Thateasy_qr Privacy Policy</h3>
            </div>
            <p className="text-xs italic">Last Updated: July 16, 2026</p>
            <div className="space-y-4 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">1. Information We Collect</h4>
              <p>When you sign up, we collect your email address, name, gender, and plan details. When your dynamic QR codes are scanned, we log technical details (device type, operating system, browser brand, approximate city/country) to populate your dashboard analytics.</p>
              
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">2. No IP Tracking</h4>
              <p>To protect scanner privacy, Thateasy_qr does not store the raw IP address of the scanner. Instead, we parse geographical locations on the server, mask the IP, and discard it instantly.</p>
              
              <h4 className="font-serif font-bold text-sm text-[#1C1C1A]">3. Data Security & Storage</h4>
              <p>All database records are stored in secure cloud environments. Authentication secrets are hashed before storage. We do not sell or lease user info or scanning history details to any third-party marketing companies.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-[#6F6F6A] hover:text-[#1C1C1A] mb-8 font-semibold transition-colors group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HOMEPAGE
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1A] tracking-tight pb-6 border-b border-[#EDE9E0] mb-8">
          {getPageTitle()}
        </h1>

        <div className="bg-white border border-[#D8D4C8] p-6 sm:p-10 rounded-sm shadow-[0_1px_5px_rgba(0,0,0,0.015)]">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  )
}
