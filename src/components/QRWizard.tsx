import { useState, useEffect } from "react"
import { QrCode, ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { db, QRCodeData, UserProfile } from "../lib/db"
import RealQRPattern from "./RealQRPattern"

interface QRWizardProps {
  user: { id: string }
  editQrId: string | null
  onSave: () => void
}

const DOT_STYLES = [
  { id: "square", label: "Classic" },
  { id: "dots", label: "Dots" },
  { id: "rounded", label: "Rounded" },
  { id: "classy", label: "Classy" },
]

const EYE_STYLES = [
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

export default function QRWizard({ user, editQrId, onSave }: QRWizardProps) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Select Type, 2: Fill Content & Style
  const [qrType, setQrType] = useState<QRCodeData["type"]>("url")
  const [name, setName] = useState("")
  const [isDynamic, setIsDynamic] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Customizer styling states
  const [color, setColor] = useState("#1C1C1A")
  const [dotStyle, setDotStyle] =
    useState<"square" | "dots" | "rounded" | "classy">("rounded")
  const [eyeStyle, setEyeStyle] =
    useState<"square" | "circle" | "rounded" | "leaf">("rounded")
  const [logo, setLogo] = useState(true)

  // Content forms state
  const [urlDest, setUrlDest] = useState("https://thateasy-qr.com")

  // vCard Form
  const [vcard, setVcard] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  })

  // Multi-Link Form
  const [linkTitle, setLinkTitle] = useState("")
  const [linkDesc, setLinkDesc] = useState("")
  const [linkAvatar, setLinkAvatar] = useState("")
  const [customLinks, setCustomLinks] = useState<{
    id: string
    title: string
    url: string
  }[]>([])
  const [socials, setSocials] = useState({
    twitter: "",
    linkedin: "",
    github: "",
  })

  // File Form
  const [fileData, setFileData] = useState({
    fileName: "document.pdf",
    fileSize: "1.2 MB",
    fileType: "application/pdf",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  })

  // Load existing data if editing
  useEffect(() => {
    db.getProfile(user.id).then((p) => {
      if (p) setProfile(p)
    })

    if (editQrId) {
      setLoading(true)
      db.getQRById(editQrId).then((qr) => {
        if (qr) {
          setName(qr.name)
          setQrType(qr.type)
          setIsDynamic(qr.is_dynamic)
          setColor(qr.styles.color)
          setDotStyle(qr.styles.dotStyle)
          setEyeStyle(qr.styles.eyeStyle)
          setLogo(qr.styles.logo)

          if (qr.type === "url") {
            setUrlDest(qr.destination_url)
          } else if (qr.type === "vcard") {
            setVcard({
              firstName: qr.content_data.firstName || "",
              lastName: qr.content_data.lastName || "",
              jobTitle: qr.content_data.jobTitle || "",
              company: qr.content_data.company || "",
              phone: qr.content_data.phone || "",
              email: qr.content_data.email || "",
              website: qr.content_data.website || "",
              address: qr.content_data.address || "",
            })
          } else if (qr.type === "linkpage") {
            setLinkTitle(qr.content_data.title || "")
            setLinkDesc(qr.content_data.description || "")
            setLinkAvatar(qr.content_data.avatarUrl || "")
            setCustomLinks(qr.content_data.links || [])
            setSocials(
              qr.content_data.socials || {
                twitter: "",
                linkedin: "",
                github: "",
              },
            )
          } else if (qr.type === "file") {
            setFileData({
              fileName: qr.content_data.fileName || "",
              fileSize: qr.content_data.fileSize || "",
              fileType: qr.content_data.fileType || "",
              fileUrl: qr.content_data.fileUrl || "",
            })
          }
          setStep(2)
        }
        setLoading(false)
      })
    } else {
      // Reset forms for fresh create
      setStep(1)
      setName("")
      setQrType("url")
      setIsDynamic(true)
      setColor("#1C1C1A")
      setDotStyle("rounded")
      setEyeStyle("rounded")
      setLogo(true)
      setUrlDest("https://")
      setVcard({
        firstName: "",
        lastName: "",
        jobTitle: "",
        company: "",
        phone: "",
        email: "",
        website: "",
        address: "",
      })
      setLinkTitle("")
      setLinkDesc("")
      setLinkAvatar("")
      setCustomLinks([])
      setSocials({ twitter: "", linkedin: "", github: "" })
    }
  }, [editQrId])

  // Add custom bio link item
  const handleAddLink = () => {
    setCustomLinks([
      ...customLinks,
      { id: Date.now().toString(), title: "Link Title", url: "https://" },
    ])
  }

  const handleRemoveLink = (id: string) => {
    setCustomLinks(customLinks.filter((l) => l.id !== id))
  }

  const handleLinkChange = (
    id: string,
    field: "title" | "url",
    value: string,
  ) => {
    setCustomLinks(
      customLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    )
  }

  // Get the value representation to render the live QR code
  const getPreviewValue = () => {
    if (!isDynamic) {
      if (qrType === "url") return urlDest
      if (qrType === "vcard") {
        return `BEGIN:VCARD\nFN:${vcard.firstName} ${vcard.lastName}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nEND:VCARD`
      }
      return urlDest
    } else {
      // Dynamic encodes a redirection endpoint (simulate mock or use real depending on context)
      return `${window.location.origin}${window.location.pathname}?r=${editQrId || "temp-preview-id"}`
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isTeams = profile?.plan === "teams"
    const maxMB = isTeams ? 20 : 1 // 1 MB for free, 20 MB for teams
    const maxBytes = maxMB * 1024 * 1024

    if (file.size > maxBytes) {
      alert(`File size exceeds the limit for your plan! Max size allowed on your current plan is ${maxMB} MB. Please upgrade to Teams for larger file limits.`)
      e.target.value = ""
      return
    }

    setFileData({
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      fileType: file.type,
      fileUrl: URL.createObjectURL(file),
    })
  }

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please provide a name for this QR code.")
      return
    }

    if (qrType === "url" && (!urlDest.trim() || urlDest.trim() === "https://" || urlDest.trim() === "http://")) {
      alert("Please enter a valid destination URL (cannot be empty or just placeholder).")
      return
    }

    setLoading(true)

    // Assemble payload
    let destination_url = ""
    let content_data: Record<string, any> = {}

    if (qrType === "url") {
      destination_url = urlDest
    } else if (qrType === "vcard") {
      content_data = vcard
      // Point dynamic QRs to the public vcard landing page
      destination_url = `${window.location.origin}${window.location.pathname}?vcard=`
    } else if (qrType === "linkpage") {
      content_data = {
        title: linkTitle || name,
        description: linkDesc,
        avatarUrl:
          linkAvatar ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
        links: customLinks,
        socials,
      }
      destination_url = `${window.location.origin}${window.location.pathname}?linkpage=`
    } else if (qrType === "file") {
      content_data = fileData
      destination_url = `${window.location.origin}${window.location.pathname}?file=`
    }

    const payload = {
      name,
      type: qrType,
      is_dynamic: isDynamic,
      is_active: true,
      destination_url,
      content_data,
      styles: { color, dotStyle, eyeStyle, logo },
    }

    try {
      if (editQrId) {
        // If editing a vcard/linkpage/file dynamic QR, we want to append the ID back onto the destination_url
        if (qrType !== "url") {
          payload.destination_url = `${payload.destination_url}${editQrId}`
        }
        await db.updateQR(editQrId, payload)
      } else {
        const newQR = await db.createQR(user.id, payload)
        // If newly created dynamic vcard/linkpage/file, update destination_url with the generated ID
        if (isDynamic && qrType !== "url") {
          await db.updateQR(newQR.id, {
            destination_url: `${payload.destination_url}${newQR.id}`,
          })
        }
      }
      onSave()
    } catch (err) {
      console.error(err)
      alert("Error saving QR code.")
    } finally {
      setLoading(false)
    }
  }

  const QR_TYPES = [
    {
      id: "url",
      title: "Website URL",
      desc: "Redirect scanners to any web URL.",
    },
    {
      id: "vcard",
      title: "Digital Business Card",
      desc: "Share contact information and social details.",
    },
    {
      id: "file",
      title: "File Share (PDF/Image)",
      desc: "Upload or link files for easy downloading.",
    },
  ]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-[#6F6F6A]">
        <div className="w-8 h-8 rounded-full border-2 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-4" />
        <span className="text-sm font-mono tracking-wider uppercase">
          Loading Configurator...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="p-2 border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-white text-[#6F6F6A] hover:text-[#1C1C1A] rounded-xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1A] tracking-tight">
            {editQrId ? "Edit QR Code" : "Create QR Code"}
          </h1>
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: SELECT TYPE */
        <div className="space-y-6">
          <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm">
            <h3 className="font-serif text-lg font-bold text-[#1C1C1A] mb-4">
              Choose QR Code Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QR_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setQrType(type.id as QRCodeData["type"])
                    setStep(2)
                  }}
                  className="flex flex-col items-start text-left p-5 border border-[#D8D4C8] hover:border-[#1C1C1A] rounded-xs hover:bg-[#FAFAF8] transition-all cursor-pointer group"
                >
                  <span className="text-sm font-serif font-bold text-[#1C1C1A] group-hover:text-[#8E9C78] transition-colors">
                    {type.title}
                  </span>
                  <span className="text-xs text-[#6F6F6A] mt-1.5 leading-relaxed">
                    {type.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* STEP 2: CONFIGURE CONTENT & STYLE */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Form Side (3/5 width) */}
          <div className="space-y-6 lg:col-span-3">
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                1. General Settings
              </h3>

              {/* QR Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  QR Code Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Restaurant Menu QR"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                />
              </div>

              {/* Static vs Dynamic Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Routing Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                    <input
                      type="radio"
                      name="isDynamic"
                      checked={isDynamic}
                      onChange={() => setIsDynamic(true)}
                      className="accent-[#8E9C78]"
                    />
                    Dynamic (Change destination URL anytime)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                    <input
                      type="radio"
                      name="isDynamic"
                      checked={!isDynamic}
                      onChange={() => setIsDynamic(false)}
                      className="accent-[#8E9C78]"
                    />
                    Static (Permanent raw content)
                  </label>
                </div>
              </div>
            </div>

            {/* Dynamic Content Forms */}
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                2. QR Content Data
              </h3>

              {qrType === "url" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={urlDest}
                    onChange={(e) => setUrlDest(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                  />
                </div>
              )}

              {qrType === "vcard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={vcard.firstName}
                      onChange={(e) =>
                        setVcard({ ...vcard, firstName: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={vcard.lastName}
                      onChange={(e) =>
                        setVcard({ ...vcard, lastName: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={vcard.jobTitle}
                      onChange={(e) =>
                        setVcard({ ...vcard, jobTitle: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={vcard.company}
                      onChange={(e) =>
                        setVcard({ ...vcard, company: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={vcard.phone}
                      onChange={(e) =>
                        setVcard({ ...vcard, phone: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={vcard.email}
                      onChange={(e) =>
                        setVcard({ ...vcard, email: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Office Address
                    </label>
                    <input
                      type="text"
                      value={vcard.address}
                      onChange={(e) =>
                        setVcard({ ...vcard, address: e.target.value })
                      }
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                </div>
              )}

              {qrType === "linkpage" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Biolink Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Mercer Portfolio"
                        value={linkTitle}
                        onChange={(e) => setLinkTitle(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Avatar Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={linkAvatar}
                        onChange={(e) => setLinkAvatar(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Bio Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Say something about yourself or business..."
                        value={linkDesc}
                        onChange={(e) => setLinkDesc(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                  </div>

                  {/* Biolinks list */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold">
                        Multiple Links
                      </label>
                      <button
                        onClick={handleAddLink}
                        type="button"
                        className="text-xs text-[#8E9C78] hover:text-[#6b7859] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} /> Add Link
                      </button>
                    </div>

                    {customLinks.map((link, idx) => (
                      <div
                        key={link.id}
                        className="flex gap-2 items-center bg-[#FAFAF8] p-3 border border-[#D8D4C8] rounded-xs"
                      >
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            placeholder="Link Title"
                            value={link.title}
                            onChange={(e) =>
                              handleLinkChange(link.id, "title", e.target.value)
                            }
                            className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-2.5 py-1 rounded-sm"
                          />
                          <input
                            type="text"
                            placeholder="Link URL"
                            value={link.url}
                            onChange={(e) =>
                              handleLinkChange(link.id, "url", e.target.value)
                            }
                            className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#6F6F6A] px-2.5 py-1 rounded-sm font-mono"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveLink(link.id)}
                          type="button"
                          className="text-rose-500 hover:text-rose-600 p-2 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Social Handles */}
                  <div className="space-y-3 pt-2 border-t border-[#EDE9E0]">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold block">
                      Social Handles
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Twitter Handle"
                        value={socials.twitter}
                        onChange={(e) =>
                          setSocials({ ...socials, twitter: e.target.value })
                        }
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                      <input
                        type="text"
                        placeholder="LinkedIn Username"
                        value={socials.linkedin}
                        onChange={(e) =>
                          setSocials({ ...socials, linkedin: e.target.value })
                        }
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                      <input
                        type="text"
                        placeholder="GitHub Username"
                        value={socials.github}
                        onChange={(e) =>
                          setSocials({ ...socials, github: e.target.value })
                        }
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === "file" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Upload File
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-[#6F6F6A] file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border file:border-[#D8D4C8] file:text-xs file:font-semibold file:bg-[#1C1C1A] file:text-[#F7F5F0] hover:file:bg-[#3A3A38] file:cursor-pointer"
                    />
                    <p className="text-[10px] text-[#6F6F6A] mt-1">
                      Accepted types: PDF, PNG, JPG, DOC. Max limit: {profile?.plan === "teams" ? "20" : "1"} MB ({profile?.plan === "teams" ? "Teams Tier" : "Free Tier"}).
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      File Name
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="Upload a file..."
                      value={fileData.fileName}
                      className="w-full bg-[#FAFAF8] opacity-80 border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs cursor-not-allowed font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      File Size
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="Auto-calculated"
                      value={fileData.fileSize}
                      className="w-full bg-[#FAFAF8] opacity-80 border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs cursor-not-allowed font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Design Customizer (Style Settings) */}
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                3. QR Styling Customizer
              </h3>

              {/* Color selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Foreground Color
                </label>
                <div className="flex gap-2 items-center flex-wrap">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      type="button"
                      className="w-8 h-8 rounded-full border cursor-pointer transition-transform"
                      style={{
                        backgroundColor: c,
                        borderColor: color === c ? "#F7F5F0" : "#D8D4C8",
                        transform: color === c ? "scale(1.15)" : "scale(1)",
                        boxShadow: color === c ? "0 0 0 2px #1C1C1A" : "none",
                      }}
                    />
                  ))}

                  {/* Custom color picker */}
                  <div className="flex items-center gap-1.5 ml-2 border border-[#D8D4C8] px-2 py-1 rounded-sm bg-[#FAFAF8]">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-6 h-6 border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 text-xs font-mono text-[#1C1C1A] bg-transparent border-none outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Dot Pattern */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Dot Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DOT_STYLES.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setDotStyle(id as any)}
                      type="button"
                      className={`py-2 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                        dotStyle === id
                          ? `border-[#1C1C1A] bg-[#1C1C1A] text-white`
                          : "border-[#D8D4C8] hover:border-[#6F6F6A] text-[#6F6F6A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Shape */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Eye Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EYE_STYLES.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setEyeStyle(id as any)}
                      type="button"
                      className={`py-2 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                        eyeStyle === id
                          ? `border-[#1C1C1A] bg-[#1C1C1A] text-white`
                          : "border-[#D8D4C8] hover:border-[#6F6F6A] text-[#6F6F6A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Center Logo */}
              <div className="flex justify-between items-center bg-[#FAFAF8] p-3 border border-[#D8D4C8] rounded-xs">
                <div>
                  <span className="text-xs font-semibold text-[#1C1C1A] block">
                    Embed Center Logo
                  </span>
                  <span className="text-xs text-[#6F6F6A]">
                    Places a clean branded letter "N" logo at the center
                  </span>
                </div>
                <button
                  onClick={() => setLogo(!logo)}
                  type="button"
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                    logo ? "bg-[#8E9C78]" : "bg-[#D8D4C8]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      logo ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setStep(1)}
                type="button"
                className="px-5 py-3 border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-white text-xs font-semibold rounded-xs text-[#1C1C1A] cursor-pointer"
              >
                Back to Types
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-6 py-3 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
              >
                Save QR Code
              </button>
            </div>
          </div>

          {/* Preview Panel Side (2/5 width) */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-6">
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm text-center shadow-[0_1px_4px_rgba(28,28,26,0.01)] flex flex-col items-center">
              <span className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold block mb-4">
                Real-Time Scannable Preview
              </span>

              {/* Scannable Real QR code */}
              <RealQRPattern
                value={getPreviewValue()}
                color={color}
                dotStyle={dotStyle}
                eyeStyle={eyeStyle}
                logo={logo}
                size={220}
              />

              <div className="mt-6 text-left space-y-3 w-full bg-[#FAFAF8] border border-[#D8D4C8] p-4 rounded-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8E9C78]" />
                  <span className="text-xs font-bold text-[#1C1C1A]">
                    Scan to Test
                  </span>
                </div>
                <p className="text-xs text-[#6F6F6A] leading-relaxed">
                  This is a live-encoded QR code. Point your smartphone camera
                  at the screen to test the destination in real-time.
                </p>
                <div className="pt-2 border-t border-[#EDE9E0] text-xs font-mono text-[#6F6F6A] break-all">
                  <span className="font-semibold text-[#1C1C1A] uppercase tracking-wider block">
                    Encoded Content:
                  </span>
                  {getPreviewValue()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
