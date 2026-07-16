import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  QrCode,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { db, UserProfile } from "../lib/db"
import QRLogo from "./QRLogo"
import DashboardOverview from "./DashboardOverview"
import QRList from "./QRList"
import QRWizard from "./QRWizard"
import ProfileSettings from "./ProfileSettings"

interface DashboardProps {
  user: { id: string; email: string }
  onLogout: () => void
}

type TabType = "overview" | "my-qrs" | "create-qr" | "profile"

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCloud, setIsCloud] = useState(false)
  const [editQrId, setEditQrId] = useState<string | null>(null)

  useEffect(() => {
    setIsCloud(db.isCloudMode())
    // Fetch profile
    db.getProfile(user.id).then((p) => setProfile(p))
  }, [user.id])

  const handleEditQR = (qrId: string) => {
    setEditQrId(qrId)
    setActiveTab("create-qr")
  }

  const handleCreateNewQR = () => {
    setEditQrId(null)
    setActiveTab("create-qr")
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "my-qrs", label: "My QRs", icon: QrCode },
    {
      id: "create-qr",
      label: "Create QR",
      icon: PlusCircle,
      action: handleCreateNewQR,
    },
    { id: "profile", label: "Profile Settings", icon: User },
  ]

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.action) {
      tab.action()
    } else {
      setActiveTab(tab.id as TabType)
    }
    setMobileMenuOpen(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <DashboardOverview
            user={user}
            onViewQRs={() => setActiveTab("my-qrs")}
            onCreateQR={() => setActiveTab("create-qr")}
          />
        )
      case "my-qrs":
        return (
          <QRList
            user={user}
            onEditQR={handleEditQR}
            onCreateQR={handleCreateNewQR}
          />
        )
      case "create-qr":
        return (
          <QRWizard
            user={user}
            editQrId={editQrId}
            onSave={() => {
              setEditQrId(null)
              setActiveTab("my-qrs")
            }}
          />
        )
      case "profile":
        return (
          <ProfileSettings
            user={user}
            onProfileUpdated={(p) => setProfile(p)}
          />
        )
      default:
        return (
          <DashboardOverview
            user={user}
            onViewQRs={() => setActiveTab("my-qrs")}
            onCreateQR={() => setActiveTab("create-qr")}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-[#D8D4C8] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <QRLogo size={18} fontSize="1.25rem" />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#1C1C1A] hover:text-[#6F6F6A] cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-[#D8D4C8] flex flex-col justify-between fixed md:sticky top-[49px] md:top-0 h-[calc(100vh-49px)] md:h-screen z-20 transition-all duration-300 ${
          mobileMenuOpen ? "left-0" : "-left-full md:left-0"
        }`}
      >
        <div className="flex flex-col">
          {/* Logo (Desktop) */}
          <div className="hidden md:flex items-center gap-1 p-6 border-b border-[#EDE9E0]">
            <QRLogo size={24} fontSize="1.5rem" />
            <span className="text-[9px] font-mono text-[#6F6F6A] ml-2 border border-[#D8D4C8] px-1 py-0.5 rounded-sm">
              SAAS
            </span>
          </div>

          {/* User info snippet */}
          <div className="p-4 md:p-6 flex items-center gap-3 border-b border-[#EDE9E0] bg-[#FAFAF8]">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D8D4C8] bg-white flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-mono text-sm font-bold text-[#8E9C78]">
                  {profile?.name?.slice(0, 2).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#1C1C1A] truncate">
                {profile?.name || "Loading Profile..."}
              </span>
              <span className="text-xs text-[#6F6F6A] truncate">
                {user.email}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#8E9C78] text-[#F7F5F0] shadow-xs"
                      : "text-[#6F6F6A] hover:text-[#1C1C1A] hover:bg-[#F7F5F0]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#EDE9E0] space-y-3 bg-[#FAFAF8]">
          {/* Connection Status indicator */}
          <div className="flex items-center gap-2 px-2 py-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isCloud ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="text-[10px] font-mono font-medium text-[#6F6F6A] uppercase tracking-wider">
              {isCloud ? "Cloud Sync Active" : "Local Sandbox"}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-100 hover:border-rose-200 rounded-xs transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        <div className="max-w-6xl mx-auto">{renderTabContent()}</div>
      </main>
    </div>
  )
}
