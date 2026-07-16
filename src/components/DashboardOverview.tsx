import { useState, useEffect } from "react"
import { QrCode, TrendingUp, Users, Smartphone, Zap } from "lucide-react"
import { db, QRCodeData, ScanEvent } from "../lib/db"

interface OverviewProps {
  user: { id: string }
  onViewQRs: () => void
  onCreateQR: () => void
}

export default function DashboardOverview({
  user,
  onViewQRs,
  onCreateQR,
}: OverviewProps) {
  const [qrs, setQrs] = useState<QRCodeData[]>([])
  const [scans, setScans] = useState<ScanEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQrId, setSelectedQrId] = useState<string>("all")

  const fetchData = async () => {
    try {
      const [userQrs, userScans] = await Promise.all([
        db.getQRs(user.id),
        db.getScans(user.id),
      ])
      setQrs(userQrs)
      setScans(userScans)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.id])



  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-[#6F6F6A]">
        <div className="w-8 h-8 rounded-full border-2 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-4" />
        <span className="text-sm font-mono tracking-wider uppercase">
          Loading Analytics...
        </span>
      </div>
    )
  }

  // --- Calculations ---
  const activeQrsCount = qrs.filter((q) => q.is_active).length

  // Filter scans by QR Code selection
  const filteredScans =
    selectedQrId === "all"
      ? scans
      : scans.filter((s) => s.qr_id === selectedQrId)

  const totalScansCount = filteredScans.length

  // Calculate scans today
  const todayStr = new Date().toISOString().split("T")[0]
  const scansTodayCount = filteredScans.filter((s) =>
    s.created_at.startsWith(todayStr),
  ).length

  // 1. Group scans by last 7 days for the chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split("T")[0]
  }).reverse()

  const scansByDay = last7Days.map((day) => {
    const count = filteredScans.filter((s) => s.created_at.startsWith(day)).length
    // Format label (e.g. "Jul 13")
    const dateObj = new Date(day)
    const label = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    return { day, label, count }
  })

  const maxCount = Math.max(...scansByDay.map((d) => d.count), 5)

  // SVG Chart Layout
  const chartWidth = 560
  const chartHeight = 160
  const paddingX = 40
  const paddingY = 25
  const graphWidth = chartWidth - paddingX * 2
  const graphHeight = chartHeight - paddingY * 2

  const points = scansByDay.map((d, i) => {
    const x = paddingX + (i / (scansByDay.length - 1)) * graphWidth
    const y = chartHeight - paddingY - (d.count / maxCount) * graphHeight
    return { x, y }
  })

  const linePathD =
    points.length > 0
      ? points
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(" ")
      : ""

  const areaPathD =
    points.length > 0
      ? `${linePathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
      : ""

  // 2. Recent scans logic
  const recentScans = [...filteredScans]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 10)

  const getQrDetails = (qrId: string) => {
    const found = qrs.find((q) => q.id === qrId)
    return found ? { name: found.name, type: found.type } : { name: "Deleted QR", type: "url" }
  }

  // 3. Device breakdown
  const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 }
  filteredScans.forEach((s) => {
    if (s.device === "Mobile") deviceCounts.Mobile++
    else if (s.device === "Desktop") deviceCounts.Desktop++
    else if (s.device === "Tablet") deviceCounts.Tablet++
  })
  const totalDeviceScans =
    deviceCounts.Mobile + deviceCounts.Desktop + deviceCounts.Tablet || 1
  const deviceShares = {
    mobile: Math.round((deviceCounts.Mobile / totalDeviceScans) * 100),
    desktop: Math.round((deviceCounts.Desktop / totalDeviceScans) * 100),
    tablet: Math.round((deviceCounts.Tablet / totalDeviceScans) * 100),
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1C1A] tracking-tight">
            Overview
          </h1>
          <p className="text-sm text-[#6F6F6A] mt-1">
            Real-time usage and analytics summary for your QR touchpoints.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {qrs.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#6F6F6A]">
                Filter:
              </span>
              <select
                value={selectedQrId}
                onChange={(e) => setSelectedQrId(e.target.value)}
                className="bg-white border border-[#D8D4C8] hover:border-[#1C1C1A] text-xs text-[#1C1C1A] px-3 py-2 rounded-xs outline-none focus:border-[#8E9C78] transition-colors cursor-pointer"
              >
                <option value="all">All QR Codes</option>
                {qrs.map((qr) => (
                  <option key={qr.id} value={qr.id}>
                    {qr.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={onCreateQR}
            className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-4 py-2.5 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
          >
            Create New QR
          </button>
        </div>
      </div>

      {qrs.length === 0 ? (
        <div className="bg-white border border-[#D8D4C8] p-12 text-center rounded-sm">
          <QrCode className="mx-auto text-[#EDE9E0] mb-4" size={48} />
          <h3 className="font-serif text-lg font-semibold text-[#1C1C1A]">
            No QR Codes Created
          </h3>
          <p className="text-sm text-[#6F6F6A] mt-1 max-w-sm mx-auto">
            Create your first dynamic or static QR code to start tracking scan
            metrics.
          </p>
          <button
            onClick={onCreateQR}
            className="mt-5 bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-5 py-2.5 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#D8D4C8] p-5 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)]">
              <div className="flex items-center justify-between text-[#6F6F6A]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Total Scans
                </span>
                <TrendingUp size={16} className="text-[#8E9C78]" />
              </div>
              <div className="text-2xl font-bold text-[#1C1C1A] mt-2 font-mono">
                {totalScansCount}
              </div>
              <p className="text-xs text-[#6F6F6A] mt-1">
                Accumulated scans across all QRs
              </p>
            </div>

            <div className="bg-white border border-[#D8D4C8] p-5 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)]">
              <div className="flex items-center justify-between text-[#6F6F6A]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Active QRs
                </span>
                <QrCode size={16} />
              </div>
              <div className="text-2xl font-bold text-[#1C1C1A] mt-2 font-mono">
                {activeQrsCount}{" "}
                <span className="text-xs text-[#6F6F6A] font-normal">
                  / {qrs.length}
                </span>
              </div>
              <p className="text-xs text-[#6F6F6A] mt-1">
                QR codes currently accepting redirects
              </p>
            </div>

            <div className="bg-white border border-[#D8D4C8] p-5 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)]">
              <div className="flex items-center justify-between text-[#6F6F6A]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Scans Today
                </span>
                <Zap size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-[#1C1C1A] mt-2 font-mono">
                {scansTodayCount}
              </div>
              <p className="text-xs text-[#6F6F6A] mt-1">
                Scans recorded since midnight
              </p>
            </div>

            <div className="bg-white border border-[#D8D4C8] p-5 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)]">
              <div className="flex items-center justify-between text-[#6F6F6A]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Mobile Traffic
                </span>
                <Smartphone size={16} />
              </div>
              <div className="text-2xl font-bold text-[#1C1C1A] mt-2 font-mono">
                {deviceShares.mobile}%
              </div>
              <p className="text-xs text-[#6F6F6A] mt-1">
                Percentage of scans via mobile device
              </p>
            </div>
          </div>

          {/* Chart & Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SVG Line Chart (2/3 width) */}
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm lg:col-span-2 shadow-[0_1px_4px_rgba(28,28,26,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#6F6F6A]">
                  Scan Activity (Last 7 Days)
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1C1A] mt-1">
                  Engagement Timeline
                </h3>
              </div>

              {/* Chart SVG */}
              <div className="w-full mt-6 relative overflow-hidden">
                <svg
                  className="w-full h-auto"
                  height={chartHeight}
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = paddingY + ratio * graphHeight
                    const labelVal = Math.round(maxCount - ratio * maxCount)
                    return (
                      <g key={ratio}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={chartWidth - paddingX}
                          y2={y}
                          stroke="#EDE9E0"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={paddingX - 10}
                          y={y + 4}
                          fill="#6F6F6A"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {labelVal}
                        </text>
                      </g>
                    )
                  })}

                  {/* Shaded Area */}
                  {points.length > 0 && (
                    <>
                      <defs>
                        <linearGradient
                          id="chartGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8E9C78"
                            stopOpacity="0.18"
                          />
                          <stop
                            offset="100%"
                            stopColor="#8E9C78"
                            stopOpacity="0.00"
                          />
                        </linearGradient>
                      </defs>
                      <path d={areaPathD} fill="url(#chartGrad)" />
                      {/* Bold Stroke Line */}
                      <path
                        d={linePathD}
                        fill="none"
                        stroke="#8E9C78"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {/* Interactive Nodes */}
                  {points.map((p, idx) => (
                    <g key={idx} className="group">
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#8E9C78"
                        stroke="white"
                        strokeWidth="1.5"
                        className="hover:r-6 hover:fill-[#6b7859] transition-all cursor-pointer"
                      />
                      {/* Tooltip text showing scans on hover */}
                      <text
                        x={p.x}
                        y={p.y - 10}
                        fill="#1C1C1A"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 py-0.5 rounded-sm"
                      >
                        {scansByDay[idx].count}
                      </text>
                    </g>
                  ))}

                  {/* X Axis Labels */}
                  {scansByDay.map((d, idx) => {
                    const x =
                      paddingX + (idx / (scansByDay.length - 1)) * graphWidth
                    return (
                      <text
                        key={idx}
                        x={x}
                        y={chartHeight - 6}
                        fill="#6F6F6A"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Breakdowns (1/3 width) */}
            <div className="space-y-6">
              {/* Device Share */}
              <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#6F6F6A]">
                  Technology
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1C1A] mt-1">
                  Device Breakdown
                </h3>

                <div className="mt-5 space-y-4">
                  {/* Share bars */}
                  <div className="w-full flex h-4 rounded-xs overflow-hidden">
                    <div
                      title={`Mobile: ${deviceShares.mobile}%`}
                      className="bg-[#8E9C78] h-full transition-all duration-500"
                      style={{ width: `${deviceShares.mobile || 33}%` }}
                    />
                    <div
                      title={`Desktop: ${deviceShares.desktop}%`}
                      className="bg-[#1C1C1A] h-full transition-all duration-500"
                      style={{ width: `${deviceShares.desktop || 33}%` }}
                    />
                    <div
                      title={`Tablet: ${deviceShares.tablet}%`}
                      className="bg-[#D8D4C8] h-full transition-all duration-500"
                      style={{ width: `${deviceShares.tablet || 34}%` }}
                    />
                  </div>

                  {/* Legend */}
                  <div className="flex justify-between items-center text-xs font-mono pt-1 text-[#6F6F6A]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8E9C78] block" />
                      <span>Mobile ({deviceShares.mobile}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1C1C1A] block" />
                      <span>Desktop ({deviceShares.desktop}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D8D4C8] block" />
                      <span>Tablet ({deviceShares.tablet}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans Activity Log Table */}
          <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm shadow-[0_1px_4px_rgba(28,28,26,0.02)] mt-6">
            <div className="flex items-center justify-between border-b border-[#EDE9E0] pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#6F6F6A]">
                  Real-time Data
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1C1A] mt-1">
                  Recent Scan Activity
                </h3>
              </div>
              <span className="text-xs font-mono text-[#6F6F6A]">
                Showing last {recentScans.length} events
              </span>
            </div>

            {recentScans.length === 0 ? (
              <p className="text-xs text-[#6F6F6A] italic py-6 text-center">
                No recent scans found for the selected filter.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDE9E0] text-[#6F6F6A] font-semibold">
                      <th className="py-2.5 font-mono uppercase tracking-wider">Timestamp</th>
                      <th className="py-2.5 font-mono uppercase tracking-wider">QR Code</th>
                      <th className="py-2.5 font-mono uppercase tracking-wider">Type</th>
                      <th className="py-2.5 font-mono uppercase tracking-wider">Device & OS</th>
                      <th className="py-2.5 font-mono uppercase tracking-wider">Browser</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE9E0] text-[#1C1C1A]">
                    {recentScans.map((scan) => {
                      const qr = getQrDetails(scan.qr_id)
                      return (
                        <tr key={scan.id} className="hover:bg-[#FAFAF8] transition-colors">
                          <td className="py-3 font-mono text-[#6F6F6A]">
                            {new Date(scan.created_at).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                          <td className="py-3 font-medium">{qr.name}</td>
                          <td className="py-3">
                            <span className="inline-block text-[9px] font-mono uppercase tracking-wider border border-[#D8D4C8] px-1.5 py-0.5 rounded-sm bg-[#EDE9E0]">
                              {qr.type}
                            </span>
                          </td>
                          <td className="py-3">
                            {scan.device} ({scan.os})
                          </td>
                          <td className="py-3 font-mono text-[#6F6F6A]">{scan.browser}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
