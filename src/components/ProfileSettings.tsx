import { useState, useEffect } from "react"
import { User, Shield, Key, Copy, Check, Database } from "lucide-react"
import { db, UserProfile } from "../lib/db"

interface ProfileProps {
  user: { id: string; email: string }
  onProfileUpdated: (profile: UserProfile) => void
}

export default function ProfileSettings({
  user,
  onProfileUpdated,
}: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [org, setOrg] = useState("")
  const [avatar, setAvatar] = useState("")

  const [apiKeys, setApiKeys] = useState<{
    key: string
    name: string
    created: string
  }[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const [isCloud, setIsCloud] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    setIsCloud(db.isCloudMode())
    db.getProfile(user.id).then((p) => {
      if (p) {
        setProfile(p)
        setName(p.name)
        setOrg(p.organization)
        setAvatar(p.avatar_url)
      }
    })

    // Load mock API keys
    const savedKeys = localStorage.getItem(`thateasy_qr_apikeys_${user.id}`)
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys))
    } else {
      const defaultKeys = [
        {
          key: "thateasy_live_8a7d9f2e4b3c8a7d9f",
          name: "Production API Key",
          created: new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ]
      setApiKeys(defaultKeys)
      localStorage.setItem(
        `thateasy_qr_apikeys_${user.id}`,
        JSON.stringify(defaultKeys),
      )
    }
  }, [user.id])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      const updated = await db.updateProfile(user.id, {
        name,
        organization: org,
        avatar_url: avatar,
      })
      setProfile(updated)
      onProfileUpdated(updated)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error(err)
      alert("Error updating profile.")
    }
  }

  const handleGenerateApiKey = () => {
    if (!newKeyName.trim()) return
    const randHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("")
    const newKey = {
      key: `thateasy_live_${randHex}`,
      name: newKeyName,
      created: new Date().toISOString(),
    }
    const updated = [newKey, ...apiKeys]
    setApiKeys(updated)
    setNewKeyName("")
    localStorage.setItem(`thateasy_qr_apikeys_${user.id}`, JSON.stringify(updated))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1C1A] tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#6F6F6A] mt-1">
          Configure your personal information, developer integrations, and cloud
          databases.
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5 shadow-[0_1px_4px_rgba(28,28,26,0.01)]"
          >
            <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2 flex items-center gap-2">
              <User size={18} />
              Profile Details
            </h3>

            {saveSuccess && (
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 text-xs font-semibold rounded-xs">
                ✓ Profile changes saved successfully.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Email Address (Read-only)
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] opacity-60 text-sm text-[#6F6F6A] px-3 py-2 rounded-xs cursor-not-allowed font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Organization
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Avatar URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-5 py-2.5 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
            >
              Save Profile Settings
            </button>
          </form>

          {/* API Credentials */}
          <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5 shadow-[0_1px_4px_rgba(28,28,26,0.01)]">
            <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2 flex items-center gap-2">
              <Key size={18} />
              Developer API Keys
            </h3>

            <p className="text-xs text-[#6F6F6A] leading-relaxed">
              Integrate your scanning nodes or generate QR codes
              programmatically via our enterprise API endpoint. Keep these keys
              secure.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Key Description (e.g. IoT Scanner)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
              />
              <button
                onClick={handleGenerateApiKey}
                className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-4 py-2 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Generate
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {apiKeys.map((keyObj) => {
                const isCopied = copiedKey === keyObj.key
                return (
                  <div
                    key={keyObj.key}
                    className="p-3 bg-[#FAFAF8] border border-[#D8D4C8] rounded-xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#1C1C1A] block">
                        {keyObj.name}
                      </span>
                      <span className="text-[10px] text-[#6F6F6A] font-mono block mt-0.5 truncate max-w-xs">
                        {keyObj.key}
                      </span>
                      <span className="text-[8px] text-[#6F6F6A] font-mono block mt-1 uppercase">
                        Created {formatDate(keyObj.created)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyKey(keyObj.key)}
                      className={`p-2 border rounded-xs transition-colors cursor-pointer flex-shrink-0 ${
                        isCopied
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-[#D8D4C8] hover:border-[#1C1C1A] text-[#6F6F6A] hover:text-[#1C1C1A]"
                      }`}
                    >
                      {isCopied ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </div>
  )
}
