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
            <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">
              Billing Launching Soon
            </h3>
            <p className="text-xs text-[#6F6F6A] leading-relaxed">
              We are currently integrating our billing partner. Premium subscriptions will launch shortly!
            </p>
            <p className="text-xs text-[#6F6F6A] leading-relaxed">
              In the meantime, feel free to register a free account and start designing custom dynamic QR codes.
            </p>
            <div className="pt-2">
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
