import { QRCodeData } from "../lib/db"

export default function PublicVCard({ qr }: { qr: QRCodeData }) {
  const {
    firstName = "",
    lastName = "",
    jobTitle = "",
    company = "",
    phone = "",
    email = "",
    website = "",
    address = "",
  } = qr.content_data || {}
  const fullName = `${firstName} ${lastName}`.trim() || "Untitled Contact"

  const handleSaveContact = () => {
    const vcfLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${fullName}`,
      `N:${lastName};${firstName};;;`,
    ]

    if (company) vcfLines.push(`ORG:${company}`)
    if (jobTitle) vcfLines.push(`TITLE:${jobTitle}`)
    if (phone) vcfLines.push(`TEL;TYPE=CELL:${phone}`)
    if (email) vcfLines.push(`EMAIL;TYPE=PREF,INTERNET:${email}`)
    if (website) vcfLines.push(`URL:${website}`)
    if (address) vcfLines.push(`ADR;TYPE=WORK:;;${address};;;;`)

    vcfLines.push("END:VCARD")
    const vcfContent = vcfLines.join("\n")

    const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${fullName.replace(/\s+/g, "_") || "contact"}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Get initial letters for avatar fallback
  const initials =
    ((firstName[0] || "") + (lastName[0] || "")).toUpperCase() || "QR"

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-white border border-[#D8D4C8] p-8 rounded-sm shadow-[0_2px_40px_rgba(28,28,26,0.05)]">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-[#EDE9E0]">
          <div className="w-20 h-20 rounded-full bg-[#8E9C78] text-[#F7F5F0] flex items-center justify-center text-2xl font-semibold mb-4 shadow-inner">
            {initials}
          </div>

          <h1 className="font-serif text-2xl font-bold text-[#1C1C1A] tracking-tight">
            {fullName}
          </h1>

          {jobTitle && (
            <p className="text-sm font-mono text-[#8E9C78] mt-1 font-medium uppercase tracking-wider">
              {jobTitle}
            </p>
          )}

          {company && (
            <p className="text-sm text-[#6F6F6A] mt-0.5">{company}</p>
          )}
        </div>

        {/* Contact Info Details */}
        <div className="py-6 space-y-4">
          {phone && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                Mobile
              </span>
              <a
                href={`tel:${phone}`}
                className="text-[#1C1C1A] font-medium text-sm hover:underline mt-0.5"
              >
                {phone}
              </a>
            </div>
          )}

          {email && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-[#1C1C1A] font-medium text-sm hover:underline mt-0.5"
              >
                {email}
              </a>
            </div>
          )}

          {website && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                Website
              </span>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E9C78] font-medium text-sm hover:underline mt-0.5"
              >
                {website.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </div>
          )}

          {address && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                Office Address
              </span>
              <span className="text-[#1C1C1A] text-sm mt-0.5 font-normal">
                {address}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#EDE9E0]">
          <button
            onClick={handleSaveContact}
            className="w-full bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] text-center py-3 text-sm font-semibold tracking-wide rounded-xs transition-colors cursor-pointer"
          >
            Add to Contacts
          </button>

          {email && (
            <a
              href={`mailto:${email}`}
              className="w-full border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-[#F7F5F0] text-[#1C1C1A] text-center py-3 text-sm font-medium rounded-xs transition-all"
            >
              Send Message
            </a>
          )}
        </div>
      </div>

      {/* Brand Attribution */}
      <div className="mt-8 text-center text-xs text-[#6F6F6A]">
        <span>Powered by </span>
        <span className="font-serif font-bold text-[#1C1C1A]">
          Nova<span className="italic text-[#8E9C78]">QR</span>
        </span>
      </div>
    </div>
  )
}
