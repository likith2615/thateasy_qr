import { useState } from "react"
import { Check } from "lucide-react"

export default function PricingPage() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for personal projects or testing the waters.",
      features: [
        "3 Dynamic QR Codes",
        "Standard static QR generation",
        "Basic styling (colors & shapes)",
        "100 scans per month limit",
        "Basic scan counts analytics",
        "Standard web support",
      ],
      cta: "Get Started Free",
      href: "#login",
      popular: false,
    },
    {
      name: "Professional",
      price: "$12",
      period: "per month",
      desc: "Designed for creators, professionals, and growing brands.",
      features: [
        "Unlimited Dynamic QR Codes",
        "All premium dot and eye shapes",
        "Unlimited scans & redirects",
        "Full analytics (location, device, OS, browser)",
        "Premium landing pages (vCard, link page, file)",
        "Vector SVG & High-Res PNG exports",
        "Priority email support",
      ],
      cta: "Start 14-Day Trial",
      href: "#login",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "billed annually",
      desc: "For agencies and large scale print campaigns.",
      features: [
        "Everything in Professional",
        "Custom domains for short-redirects",
        "Bulk QR code generation & upload",
        "Dedicated API key access",
        "Dedicated account manager",
        "99.9% redirect SLA guarantee",
        "Custom contract terms",
      ],
      cta: "Contact Sales",
      href: "mailto:sales@thateasy-qr.com",
      popular: false,
    },
  ]

  const faqs = [
    {
      q: "What is the difference between static and dynamic QR codes?",
      a: "Static QR codes encode the destination data directly in the pixel matrix. They can never be changed after they are created and do not track scan count. Dynamic QR codes encode a secure short-redirect link. You can change the final destination URL at any time from your dashboard, and every single scan registers detailed analytical metadata.",
    },
    {
      q: "Can I use custom branding on the Free plan?",
      a: "Yes, you can customize basic colors and core eye styles on the Free plan. To unlock advanced dots, custom logo uploads, and our editorial landing page templates (like vCards and link pages), you will need a Professional subscription.",
    },
    {
      q: "What formats can I export my QR codes in?",
      a: "All users can download standard PNG files. Professional plan users gain access to high-fidelity SVG exports. SVG is a vector format, meaning it can be scaled infinitely without any loss of quality—ideal for high-end graphic design and large-scale print materials.",
    },
    {
      q: "Are there any hidden fees or scan limits on paid plans?",
      a: "None at all. The Professional plan has zero scan or redirect limits. The Free plan has a limit of 100 scans per month across your dynamic codes.",
    },
  ]

  return (
    <div className="bg-[#F7F5F0] py-16 px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8E9C78] font-semibold block mb-3">
            Pricing Plans
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1A] text-wrap-balance leading-tight">
            Transparent, straightforward pricing.
          </h1>
          <p className="text-[#6F6F6A] mt-4 text-md leading-relaxed font-sans">
            Choose a plan that fits your branding goals. Start free and upgrade as you scale.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-sm p-8 transition-all duration-300 relative flex flex-col justify-between ${
                tier.popular
                  ? "border-[#8E9C78] shadow-sm ring-1 ring-[#8E9C78]"
                  : "border-[#D8D4C8]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8E9C78] text-[#F7F5F0] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm font-mono">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C1C1A]">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#6F6F6A] mt-2 font-sans min-h-[40px]">
                  {tier.desc}
                </p>

                <div className="my-6">
                  <span className="font-serif text-4xl font-bold text-[#1C1C1A]">
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-xs text-[#6F6F6A] font-mono ml-2">
                      / {tier.period}
                    </span>
                  )}
                </div>

                <div className="border-t border-[#D8D4C8] my-6" />

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start text-sm text-[#1C1C1A] font-sans">
                      <Check className="w-4 h-4 text-[#8E9C78] shrink-0 mr-3 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.name === "Free" ? (
                <a
                  href="#login"
                  className={`w-full text-center py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors block cursor-pointer no-underline ${
                    tier.popular
                      ? "bg-[#8E9C78] text-white hover:bg-[#6B7859]"
                      : "bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38]"
                  }`}
                >
                  {tier.cta}
                </a>
              ) : tier.name === "Enterprise" ? (
                <a
                  href="mailto:likithchippe@gmail.com"
                  className={`w-full text-center py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors block cursor-pointer no-underline ${
                    tier.popular
                      ? "bg-[#8E9C78] text-white hover:bg-[#6B7859]"
                      : "bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38]"
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowComingSoon(true)}
                  className={`w-full text-center py-3 text-xs font-semibold rounded-xs tracking-wider uppercase font-mono transition-colors block cursor-pointer border-none ${
                    tier.popular
                      ? "bg-[#8E9C78] text-white hover:bg-[#6B7859]"
                      : "bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38]"
                  }`}
                >
                  {tier.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-[#1C1C1A] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[#D8D4C8] pb-6">
                <h4 className="font-serif text-lg font-semibold text-[#1C1C1A]">
                  {faq.q}
                </h4>
                <p className="text-sm text-[#6F6F6A] mt-3 leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showComingSoon && (
        <div className="fixed inset-0 bg-[#1C1C1A]/40 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="bg-[#F7F5F0] border border-[#D8D4C8] max-w-sm w-full p-6 rounded-sm shadow-xl space-y-4 text-center">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-[#8E9C78]/10 border border-[#8E9C78]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#8E9C78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">
              Billing Launching Soon
            </h3>
            <p className="text-xs text-[#6F6F6A] leading-relaxed">
              We are currently integrating our billing partner. Premium subscriptions will launch shortly!
            </p>
            <p className="text-xs text-[#6F6F6A] leading-relaxed">
              In the meantime, feel free to register a free account and start designing custom dynamic QR codes.
            </p>

            {/* WhatsApp Notify */}
            <div className="bg-[#F0FFF4] border border-[#25D366]/20 rounded-xs px-4 py-3 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6F6A] block">
                Get notified when it launches
              </span>
              <a
                href="https://wa.me/918179072511?text=Hey!%20Please%20notify%20me%20when%20the%20Professional%20plan%20on%20Thateasy_qr%20launches.%20I%27m%20interested!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#1a9e4e] transition-colors no-underline"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Notify me on WhatsApp
              </a>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowComingSoon(false)}
                className="w-full bg-[#1C1C1A] hover:bg-[#3A3A38] text-white py-2 text-xs font-semibold font-mono uppercase tracking-wider rounded-xs cursor-pointer border-none"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
