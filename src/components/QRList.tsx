import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Power,
  Download,
  BarChart2,
  Calendar,
  Link as LinkIcon,
  RefreshCw,
  QrCode,
  Eye,
} from "lucide-react"
import { db, QRCodeData, ScanEvent, UserProfile } from "../lib/db"
import RealQRPattern, { downloadQR } from "./RealQRPattern"

interface QRListProps {
  user: { id: string }
  onEditQR: (id: string) => void
  onCreateQR: () => void
}

export default function QRList({ user, onEditQR, onCreateQR }: QRListProps) {
  const [qrs, setQrs] = useState<QRCodeData[]>([])
  const [scans, setScans] = useState<ScanEvent[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeQRAnalyticsId, setActiveQRAnalyticsId] = useState<string | null>(
    null,
  )
  const [activeQRViewId, setActiveQRViewId] = useState<string | null>(null)
  const [downloadDropdownId, setDownloadDropdownId] = useState<string | null>(
    null,
  )

  const fetchData = async () => {
    try {
      const [userQrs, userScans, userProfile] = await Promise.all([
        db.getQRs(user.id),
        db.getScans(user.id),
        db.getProfile(user.id),
      ])
      setQrs(userQrs)
      setScans(userScans)
      setProfile(userProfile)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.id])

  const handleDelete = async (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the QR code "${name}"? This action cannot be undone.`,
      )
    ) {
      try {
        await db.deleteQR(id)
        await fetchData()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await db.updateQR(id, { is_active: !currentStatus })
      await fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  // Generate the scannable value of the QR code
  const getQRValue = (qr: QRCodeData) => {
    if (!qr.is_dynamic) {
      // Static encodes details directly
      if (qr.type === "url") return qr.destination_url
      if (qr.type === "vcard") {
        const {
          firstName = "",
          lastName = "",
          phone = "",
          email = "",
        } = qr.content_data || {}
        return `BEGIN:VCARD\nFN:${firstName} ${lastName}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`
      }
      return qr.destination_url || "Thateasy_qr"
    } else {
      // Dynamic encodes a redirection endpoint pointing back to this client app
      return `${window.location.origin}${window.location.pathname}?r=${qr.id}`
    }
  }

  // Filter items
  const filteredQRs = qrs.filter((qr) => {
    const matchesSearch =
      qr.name.toLowerCase().includes(search.toLowerCase()) ||
      (qr.destination_url &&
        qr.destination_url.toLowerCase().includes(search.toLowerCase()))
    const matchesType = typeFilter === "all" || qr.type === typeFilter
    return matchesSearch && matchesType
  })

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get scan count for a specific QR
  const getQRScanCount = (qrId: string) => {
    return scans.filter((s) => s.qr_id === qrId).length
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1C1A] tracking-tight">
            My QR Codes
          </h1>
          <p className="text-sm text-[#6F6F6A] mt-1">
            Manage, customize, download, and track your static and dynamic
            codes.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="flex items-center justify-center p-2.5 border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-white text-[#6F6F6A] hover:text-[#1C1C1A] rounded-xs transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={onCreateQR}
            className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-4 py-2.5 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
          >
            Create New QR
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#D8D4C8] p-4 rounded-sm flex flex-col md:flex-row gap-4 justify-between items-center shadow-[0_1px_3px_rgba(28,28,26,0.01)]">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F6F6A]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] pl-9 pr-4 py-2 rounded-xs transition-colors"
          />
        </div>

        {/* Filter Type */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter size={16} className="text-[#6F6F6A]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-sm cursor-pointer hover:border-[#6F6F6A] transition-colors"
          >
            <option value="all">All Types</option>
            <option value="url">Website URL</option>
            <option value="vcard">Business Card</option>
            <option value="linkpage">Multi-Link Page</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="upi">UPI Payment</option>
            <option value="google-maps">Maps</option>
            <option value="file">File Share</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#6F6F6A]">
          <div className="w-8 h-8 rounded-full border-2 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-4" />
          <span className="text-sm font-mono tracking-wider uppercase">
            Loading QR Codes...
          </span>
        </div>
      ) : filteredQRs.length === 0 ? (
        <div className="bg-white border border-[#D8D4C8] py-16 text-center rounded-sm">
          <p className="text-sm text-[#6F6F6A]">
            No QR codes found matching your criteria.
          </p>
        </div>
      ) : (
        /* QR Code List */
        <div className="space-y-4">
          {filteredQRs.map((qr) => {
            const scanCount = getQRScanCount(qr.id)
            const qrVal = getQRValue(qr)
            const isSelectedAnalytics = activeQRAnalyticsId === qr.id
            const isSelectedQRView = activeQRViewId === qr.id
            const isDownloadDropdownOpen = downloadDropdownId === qr.id

            return (
              <div
                key={qr.id}
                className={`bg-white border transition-all rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.01)] overflow-hidden ${
                  qr.is_active
                    ? "border-[#D8D4C8]"
                    : "border-[#EDE9E0] opacity-80"
                }`}
              >
                {/* Main Card Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: QR Type Indicator + Text */}
                  <div className="flex items-start gap-4">
                    {/* Small styled color box representing the QR style */}
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center border border-[#EDE9E0] flex-shrink-0"
                      style={{ backgroundColor: `${qr.styles?.color || "#8E9C78"}15` }}
                    >
                      <QrCode style={{ color: qr.styles?.color || "#8E9C78" }} size={24} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-base font-bold text-[#1C1C1A] leading-tight">
                          {qr.name}
                        </h3>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-[#FAFAF8] border border-[#D8D4C8] text-[#6F6F6A] uppercase tracking-wider">
                          {qr.type === "vcard"
                            ? "Business Card"
                            : qr.type === "linkpage"
                              ? "Multi-Link"
                              : qr.type === "google-maps"
                                ? "Maps"
                                : qr.type.toUpperCase()}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                            qr.is_dynamic
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {qr.is_dynamic ? "Dynamic" : "Static"}
                        </span>
                      </div>

                      {/* Display Destination */}
                      <div className="flex items-center gap-1.5 text-xs text-[#6F6F6A] truncate max-w-sm md:max-w-md">
                        <LinkIcon size={12} className="flex-shrink-0" />
                        <span className="truncate">
                          {qr.type === "url"
                            ? qr.destination_url
                            : qr.type === "vcard"
                              ? `${qr.content_data?.firstName} ${qr.content_data?.lastName} (VCF)`
                              : qr.type === "linkpage"
                                ? `${qr.content_data?.title || qr.name} (Biolink)`
                                : qr.type === "whatsapp"
                                  ? `WhatsApp: ${qr.content_data?.waPhone}`
                                  : qr.type === "phone"
                                    ? `Phone: ${qr.content_data?.phoneNum}`
                                    : qr.type === "email"
                                      ? `Email: ${qr.content_data?.emailAddr}`
                                      : qr.type === "sms"
                                        ? `SMS: ${qr.content_data?.smsPhone}`
                                        : qr.type === "upi"
                                          ? `UPI: ${qr.content_data?.upiPa}`
                                          : qr.type === "google-maps"
                                            ? `Location: ${qr.content_data?.mapLat}, ${qr.content_data?.mapLng}`
                                            : qr.content_data?.fileName || "Custom Content"}
                        </span>
                      </div>

                      {/* Created date */}
                      <div className="flex items-center gap-1 text-[10px] text-[#6F6F6A] font-mono">
                        <Calendar size={10} />
                        <span>Created {formatDate(qr.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Scans stats */}
                  <div className="flex items-center gap-6 md:justify-center">
                    <div className="text-left md:text-center">
                      <div className="text-xl font-bold font-mono text-[#1C1C1A]">
                        {scanCount}
                      </div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-[#6F6F6A]">
                        Scans
                      </div>
                    </div>
                    <div className="text-left">
                      <div
                        className={`text-xs font-semibold px-2 py-0.5 rounded-sm inline-block ${
                          qr.is_active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {qr.is_active ? "Active" : "Paused"}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center justify-end gap-2 flex-wrap border-t border-[#EDE9E0] md:border-none pt-3 md:pt-0">
                    <button
                      onClick={() => handleToggleActive(qr.id, qr.is_active)}
                      className={`p-2 rounded-xs border transition-colors cursor-pointer ${
                        qr.is_active
                          ? "border-[#D8D4C8] hover:border-rose-300 text-[#6F6F6A] hover:text-rose-600 hover:bg-rose-50/20"
                          : "border-emerald-200 hover:border-emerald-400 text-emerald-600 hover:bg-emerald-50/20"
                      }`}
                      title={
                        qr.is_active ? "Pause QR Code" : "Activate QR Code"
                      }
                    >
                      <Power size={14} />
                    </button>

                    <button
                      onClick={() =>
                        setActiveQRViewId(
                          isSelectedQRView ? null : qr.id,
                        )
                      }
                      className={`p-2 border rounded-xs transition-colors cursor-pointer ${
                        isSelectedQRView
                          ? "bg-[#8E9C78]/10 border-[#8E9C78] text-[#8E9C78]"
                          : "border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A]"
                      }`}
                      title="View QR Code Directly"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      onClick={() => onEditQR(qr.id)}
                      className="p-2 border border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A] rounded-xs transition-colors cursor-pointer"
                      title="Edit Settings"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() =>
                        setActiveQRAnalyticsId(
                          isSelectedAnalytics ? null : qr.id,
                        )
                      }
                      className={`p-2 border rounded-xs transition-colors cursor-pointer ${
                        isSelectedAnalytics
                          ? "bg-[#8E9C78]/10 border-[#8E9C78] text-[#8E9C78]"
                          : "border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A]"
                      }`}
                      title="View Scan Analytics"
                    >
                      <BarChart2 size={14} />
                    </button>

                    {/* Download Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDownloadDropdownId(
                            isDownloadDropdownOpen ? null : qr.id,
                          )
                        }
                        className="p-2 border border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A] rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                        title="Download Code"
                      >
                        <Download size={14} />
                      </button>

                      {isDownloadDropdownOpen && (
                        <div className="absolute right-0 mt-1.5 w-32 bg-white border border-[#D8D4C8] shadow-md rounded-xs z-10 py-1 text-xs">
                          {["PNG", "SVG", "PDF"].map((fmt) => (
                            <button
                              key={fmt}
                              onClick={() => {
                                downloadQR(
                                  qr.name,
                                  qrVal,
                                  qr.styles?.color || "#8E9C78",
                                  qr.styles?.dotStyle || "rounded",
                                  qr.styles?.eyeStyle || "rounded",
                                  qr.styles?.logo !== undefined ? qr.styles.logo : true,
                                  fmt.toLowerCase() as "png" | "svg" | "pdf",
                                )
                                setDownloadDropdownId(null)
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#F7F5F0] text-[#1C1C1A] font-semibold cursor-pointer"
                            >
                              Download {fmt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(qr.id, qr.name)}
                      className="p-2 border border-rose-100 hover:border-rose-300 text-rose-500 hover:text-rose-600 hover:bg-rose-50/20 rounded-xs transition-colors cursor-pointer"
                      title="Delete QR Code"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Analytics Drawer */}
                {isSelectedAnalytics && (
                  <div className="bg-[#FAFAF8] border-t border-[#EDE9E0] p-6 space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center pb-2 border-b border-[#EDE9E0]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6F6A] font-semibold">
                        QR Scan Breakdown
                      </span>
                      <button
                        onClick={() => setActiveQRAnalyticsId(null)}
                        className="text-xs text-[#6F6F6A] hover:text-[#1C1C1A] font-medium underline cursor-pointer"
                      >
                        Close Analytics
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Device distribution */}
                      <div className="bg-white border border-[#D8D4C8] p-4 rounded-sm">
                        <span className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                          Devices
                        </span>
                        <div className="mt-3 space-y-2 text-xs">
                          {(() => {
                            const qrScans = scans.filter(
                              (s) => s.qr_id === qr.id,
                            )
                            const counts = { Mobile: 0, Desktop: 0, Tablet: 0 }
                            qrScans.forEach((s) => {
                              if (s.device === "Mobile") counts.Mobile++
                              else if (s.device === "Desktop") counts.Desktop++
                              else if (s.device === "Tablet") counts.Tablet++
                            })
                            const total = qrScans.length || 1
                            return ["Mobile", "Desktop", "Tablet"].map(
                              (dev) => {
                                const qty = counts[(dev as keyof typeof counts)]
                                const pct = Math.round((qty / total) * 100)
                                return (
                                  <div
                                    key={dev}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-[#6F6F6A]">
                                      {dev}
                                    </span>
                                    <span className="font-mono text-[#1C1C1A] font-semibold">
                                      {qty} ({pct}%)
                                    </span>
                                  </div>
                                )
                              },
                            )
                          })()}
                        </div>
                      </div>

                      {/* Right: Technical detail / Scannable link info */}
                      <div className="bg-white border border-[#D8D4C8] p-4 rounded-sm flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider">
                            Raw Target Details
                          </span>
                          <div className="text-[10px] font-mono text-[#1C1C1A] mt-2 break-all max-h-[60px] overflow-y-auto bg-[#FAFAF8] border border-[#D8D4C8] p-2">
                            {qrVal}
                          </div>
                        </div>
                        <a
                          href={qrVal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#8E9C78] hover:text-[#6b7859] hover:underline font-semibold tracking-wide uppercase mt-3 block"
                        >
                          Visit Destination Link →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expanded QR Code Viewer Drawer */}
                {isSelectedQRView && (
                  <div className="bg-[#FAFAF8] border-t border-[#EDE9E0] p-6 flex flex-col md:flex-row items-center gap-6 animate-fadeIn">
                    <div className="flex-shrink-0">
                      <RealQRPattern
                        value={qrVal}
                        color={qr.styles?.color || "#1C1C1A"}
                        dotStyle={qr.styles?.dotStyle || "rounded"}
                        eyeStyle={qr.styles?.eyeStyle || "rounded"}
                        logo={qr.styles?.logo !== undefined ? qr.styles.logo : true}
                        size={200}
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6F6A] font-semibold">
                          Live Scannable QR
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#1C1C1A] mt-1">
                          Scan or Test Code
                        </h4>
                      </div>
                      <p className="text-xs text-[#6F6F6A] leading-relaxed">
                        This is the live generated QR code using your custom color and pattern selections. 
                        You can scan this directly off your screen using any device.
                      </p>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#6F6F6A] bg-white border border-[#D8D4C8] px-3 py-2 rounded-sm select-all break-all max-w-lg">
                        {qrVal}
                      </div>
                      <div className="flex items-center gap-2">
                        {["PNG", "SVG"].map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => {
                              downloadQR(
                                qr.name,
                                qrVal,
                                qr.styles?.color || "#1C1C1A",
                                qr.styles?.dotStyle || "rounded",
                                qr.styles?.eyeStyle || "rounded",
                                qr.styles?.logo !== undefined ? qr.styles.logo : true,
                                fmt.toLowerCase() as "png" | "svg",
                              )
                            }}
                            className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                          >
                            Download {fmt}
                          </button>
                        ))}
                        <button
                          onClick={() => setActiveQRViewId(null)}
                          className="border border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A] px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                        >
                          Close Preview
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
