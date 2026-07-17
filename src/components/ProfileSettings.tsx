import { useState, useEffect } from "react"
import { User, Database } from "lucide-react"
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



  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1C1A] tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#6F6F6A] mt-1">
          Configure your personal information and account details.
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


      </div>
    </div>
  )
}
