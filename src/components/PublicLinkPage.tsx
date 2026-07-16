import { QRCodeData } from "../lib/db"

export default function PublicLinkPage({ qr }: { qr: QRCodeData }) {
  const {
    title = "My Linkpage",
    description = "",
    avatarUrl = "",
    links = [],
    socials = {},
  } = qr.content_data || {}

  // Safe social links helper
  const getSocialLink = (platform: string, handle: string) => {
    if (!handle) return null
    if (handle.startsWith("http")) return handle
    switch (platform) {
      case "twitter":
        return `https://twitter.com/${handle}`
      case "linkedin":
        return `https://linkedin.com/in/${handle}`
      case "github":
        return `https://github.com/${handle}`
      case "instagram":
        return `https://instagram.com/${handle}`
      default:
        return handle
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 flex flex-col items-center font-sans">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Avatar / Brand Icon */}
        <div className="w-20 h-20 rounded-full overflow-hidden border border-[#D8D4C8] mb-4 bg-white flex items-center justify-center shadow-sm">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-xl font-serif font-bold text-[#8E9C78]">
              {title.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <h1 className="font-serif text-2xl font-bold text-[#1C1C1A] text-center mb-1">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-[#6F6F6A] text-center max-w-xs mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {/* Link List */}
        <div className="w-full space-y-3.5 mb-8">
          {links.map((link: { id: string; title: string; url: string }) => {
            // Normalize URL
            const url = link.url.startsWith("http")
              ? link.url
              : `https://${link.url}`
            return (
              <a
                key={link.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white border border-[#D8D4C8] hover:border-[#1C1C1A] text-[#1C1C1A] font-medium py-3.5 px-6 rounded-xs transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(28,28,26,0.03)] cursor-pointer"
              >
                {link.title}
              </a>
            )
          })}

          {links.length === 0 && (
            <div className="text-center py-6 text-sm text-[#6F6F6A] italic bg-white/40 border border-dashed border-[#D8D4C8]">
              No links added yet.
            </div>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-12">
          {Object.entries(socials).map(([platform, handle]) => {
            const link = getSocialLink(platform, handle as string)
            if (!link) return null

            return (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6F6F6A] hover:text-[#1C1C1A] transition-colors capitalize font-mono text-xs font-semibold tracking-wide border-b border-[#D8D4C8] hover:border-[#1C1C1A] pb-0.5"
              >
                {platform}
              </a>
            )
          })}
        </div>

        {/* Brand Attribution */}
        <div className="text-center text-xs text-[#6F6F6A]">
          <span>Powered by </span>
          <span className="font-serif font-bold text-[#1C1C1A]">
            Nova<span className="italic text-[#8E9C78]">QR</span>
          </span>
        </div>
      </div>
    </div>
  )
}
