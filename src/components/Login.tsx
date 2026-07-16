import { useState, useEffect } from "react"
import { QrCode, Key, Mail, User, ShieldAlert } from "lucide-react"
import { db } from "../lib/db"
import QRLogo from "./QRLogo"
import BotPreventionPro from "./BotPreventionPro"
import AnimatedEyes from "./AnimatedEyes"

interface LoginProps {
  initialSignUp?: boolean
  onLoginSuccess: (user: { id: string; email: string }) => void
  onBackToLanding: () => void
}

export default function Login({
  initialSignUp = false,
  onLoginSuccess,
  onBackToLanding,
}: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(initialSignUp)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isCloud, setIsCloud] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [triggerWarning, setTriggerWarning] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  // Gender & Plan Selection
  const [gender, setGender] = useState<"male" | "female">("male")
  const [plan, setPlan] = useState<"free" | "teams">("free")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [modalMode, setModalMode] = useState<"terms" | "privacy" | null>(null)
  const [showTeamsModal, setShowTeamsModal] = useState(false)

  const maleAvatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", // Teams Only
  ]

  const femaleAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", // Teams Only
  ]

  useEffect(() => {
    if (gender === "male") {
      setSelectedAvatar(maleAvatars[0])
    } else {
      setSelectedAvatar(femaleAvatars[0])
    }
  }, [gender])

  useEffect(() => {
    // If plan changes to basic, make sure we don't keep the premium avatar selected
    if (plan === "free") {
      if (gender === "male" && selectedAvatar === maleAvatars[2]) {
        setSelectedAvatar(maleAvatars[0])
      } else if (gender === "female" && selectedAvatar === femaleAvatars[2]) {
        setSelectedAvatar(femaleAvatars[0])
      }
    }
  }, [plan, gender])

  useEffect(() => {
    setIsCloud(db.isCloudMode())
  }, [])

  useEffect(() => {
    setIsSignUp(initialSignUp)
  }, [initialSignUp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!isVerified) {
      setTriggerWarning(true)
      // Reset trigger immediately so it can be re-triggered on next submit attempt
      setTimeout(() => setTriggerWarning(false), 100)
      return
    }

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.")
      return
    }

    if (isSignUp && !name.trim()) {
      setErrorMsg("Please enter your name.")
      return
    }

    setLoading(true)

    try {
      if (isSignUp) {
        const user = await db.signUp(email, password, name, selectedAvatar, plan)
        if (user) {
          onLoginSuccess({ id: user.id, email: user.email || email })
        }
      } else {
        const user = await db.signIn(email, password)
        if (user) {
          onLoginSuccess({ id: user.id, email: user.email || email })
        }
      }
    } catch (err: any) {
      console.error(err)
      setErrorMsg(
        err.message || "Authentication failed. Please verify credentials.",
      )
    } finally {
      setLoading(false)
    }
  }

  // Quick bypass for testing in Local Mode
  const handleQuickSandboxAccess = async () => {
    if (isCloud) return
    setLoading(true)
    try {
      const user = await db.signIn("intern@nxtgensec.com", "sandbox")
      if (user) {
        onLoginSuccess({ id: user.id, email: user.email })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer outline-none focus:ring-2 focus:ring-[#8E9C78]"
        >
          <QRLogo size={32} fontSize="1.875rem" />
        </button>

        {/* Animated Eyes */}
        <div className="mt-5 flex justify-center">
          <AnimatedEyes isClosed={passwordFocused} size={50} bgColor="#F7F5F0" />
        </div>

        <h2 className="mt-4 font-serif text-2xl font-bold text-[#1C1C1A] tracking-tight">
          {isSignUp
            ? "Create your platform account"
            : "Sign in to your dashboard"}
        </h2>
        <p className="mt-1.5 text-xs text-[#6F6F6A]">
          {isSignUp ? "Already registered?" : "New to Thateasy_qr?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setErrorMsg("")
              setIsVerified(false)
              setTriggerWarning(false)
              setPasswordFocused(false)
            }}
            className="text-[#8E9C78] hover:text-[#6b7859] font-semibold underline bg-transparent border-0 cursor-pointer"
          >
            {isSignUp ? "Sign in instead" : "Create an account"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 border border-[#D8D4C8] rounded-sm shadow-[0_2px_40px_rgba(28,28,26,0.03)] space-y-6">
          {/* Cloud vs Sandbox Banner */}
          {!isCloud && (
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xs flex gap-2.5 items-start">
              <ShieldAlert
                size={16}
                className="text-amber-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                  Sandbox Mode Active
                </span>
                <p className="text-[10px] text-[#6F6F6A] leading-relaxed mt-0.5">
                  No Supabase URL detected. You can sign in immediately using
                  guest mode with local data storage.
                </p>
                <button
                  onClick={handleQuickSandboxAccess}
                  className="mt-2 text-[10px] font-bold text-amber-800 hover:text-amber-950 underline bg-transparent border-0 cursor-pointer"
                >
                  Quick Sandbox Access →
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 text-rose-700 border border-rose-100 p-3 text-xs font-semibold rounded-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F6F6A]"
                      size={16}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] pl-9 pr-4 py-2 rounded-xs"
                    />
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Account Plan
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                      <input
                        type="radio"
                        name="plan"
                        checked={plan === "free"}
                        onChange={() => setPlan("free")}
                        className="accent-[#8E9C78]"
                      />
                      Basic Plan (Free, 1 MB limit)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                      <input
                        type="radio"
                        name="plan"
                        checked={plan === "teams"}
                        onChange={() => setShowTeamsModal(true)}
                        className="accent-[#8E9C78]"
                      />
                      Teams Plan{" "}
                      <span className="text-[9px] font-mono bg-[#8E9C78]/10 text-[#8E9C78] px-1.5 py-0.5 rounded-sm border border-[#8E9C78]/20 uppercase tracking-wider">Coming Soon</span>
                    </label>
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="accent-[#8E9C78]"
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="accent-[#8E9C78]"
                      />
                      Female
                    </label>
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Choose Profile Avatar
                  </label>
                  <div className="flex gap-3">
                    {(gender === "male" ? maleAvatars : femaleAvatars).map((avatarUrl, idx) => {
                      const isTeamsOnly = idx === 2
                      const isLocked = isTeamsOnly && plan !== "teams"
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isLocked}
                          onClick={() => setSelectedAvatar(avatarUrl)}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all relative ${
                            isLocked
                              ? "border-transparent opacity-30 cursor-not-allowed font-mono"
                              : selectedAvatar === avatarUrl
                                ? "border-[#8E9C78] scale-105 shadow-sm cursor-pointer"
                                : "border-transparent opacity-60 hover:opacity-100 cursor-pointer"
                          }`}
                          title={isLocked ? "Teams Plan Only" : `Avatar ${idx + 1}`}
                        >
                          <img
                            src={avatarUrl}
                            alt={`Avatar ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {isLocked && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[7px] text-white font-mono uppercase tracking-wider font-bold">
                              Teams
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F6F6A]"
                  size={16}
                />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] pl-9 pr-4 py-2 rounded-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F6F6A]"
                  size={16}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] pl-9 pr-4 py-2 rounded-xs"
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            {isSignUp && (
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  required
                  id="agree-terms"
                  className="mt-0.5 accent-[#8E9C78] cursor-pointer"
                />
                <label htmlFor="agree-terms" className="text-xs text-[#6F6F6A] leading-normal select-none cursor-pointer">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setModalMode("terms")}
                    className="text-[#1C1C1A] hover:underline font-semibold bg-transparent border-none p-0 inline cursor-pointer"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => setModalMode("privacy")}
                    className="text-[#1C1C1A] hover:underline font-semibold bg-transparent border-none p-0 inline cursor-pointer"
                  >
                    Privacy Policy
                  </button>{" "}
                  of Thateasy_qr.
                </label>
              </div>
            )}

            {/* Bot Prevention */}
            <div className="pt-2">
              <BotPreventionPro onVerify={setIsVerified} triggerWarning={triggerWarning} />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-sm font-semibold tracking-wide rounded-xs transition-all flex justify-center items-center gap-2 ${
                  isVerified
                    ? "bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] cursor-pointer"
                    : "bg-[#1C1C1A]/50 text-[#F7F5F0]/70 cursor-not-allowed"
                }`}
              >
                {loading && (
                  <div className="w-4 h-4 rounded-full border border-t-transparent border-white animate-spin" />
                )}
                {isSignUp ? "Register Account" : "Sign In"}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-[#EDE9E0] text-center">
            <button
              onClick={onBackToLanding}
              className="text-xs text-[#6F6F6A] hover:text-[#1C1C1A] font-semibold underline bg-transparent border-0 cursor-pointer"
            >
              ← Back to Main Page
            </button>
          </div>
        </div>
      </div>

      {modalMode && (
        <div className="fixed inset-0 bg-[#1C1C1A]/40 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="bg-[#F7F5F0] border border-[#D8D4C8] max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 rounded-sm shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#EDE9E0]">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">
                {modalMode === "terms" ? "Terms & Conditions" : "Privacy Policy"}
              </h3>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-xs text-[#6F6F6A] hover:text-[#1C1C1A] underline font-mono cursor-pointer"
              >
                CLOSE
              </button>
            </div>
            <div className="text-xs text-[#6F6F6A] leading-relaxed space-y-3 font-sans text-left">
              {modalMode === "terms" ? (
                <>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">1. Agreement to Terms</h4>
                  <p>By registering for an account or creating dynamic codes using Thateasy_qr, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must not use our platform.</p>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">2. Accounts & Subscriptions</h4>
                  <p>Users must provide accurate details upon signing up. We offer two core account tiers:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong>Basic (Free) Plan:</strong> Standard customization. File upload sizes are strictly capped at <strong>1 MB</strong> per file.</li>
                    <li><strong>Teams Plan:</strong> Advanced customizations, logo frames, analytics export, and file upload sizes capped at <strong>20 MB</strong>.</li>
                  </ul>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">3. Prohibited Content</h4>
                  <p>You may not use Thateasy_qr to point to malicious software, phishing pages, pornographic content, spam campaigns, or any URL violating regulations.</p>
                </>
              ) : (
                <>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">1. Information We Collect</h4>
                  <p>When you sign up, we collect your email address, name, gender, and plan details. When your dynamic QR codes are scanned, we log technical details (device type, operating system, browser brand, approximate city/country) to populate your dashboard analytics.</p>
                  <h4 className="font-serif font-bold text-xs text-[#1C1C1A]">2. No IP Tracking</h4>
                  <p>To protect scanner privacy, Thateasy_qr does not store the raw IP address of the scanner. Instead, we parse geographical locations on the server, mask the IP, and discard it instantly.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Teams Coming Soon Modal */}
      {showTeamsModal && (
        <div className="fixed inset-0 bg-[#1C1C1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="bg-[#F7F5F0] border border-[#D8D4C8] max-w-sm w-full p-8 rounded-sm shadow-2xl text-center space-y-5">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#8E9C78]/10 border border-[#8E9C78]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#8E9C78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#8E9C78] font-bold block">Teams Plan</span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1C1A]">Coming Soon</h3>
              <p className="text-xs text-[#6F6F6A] leading-relaxed">
                The Teams plan is currently under development. We're working on premium avatars, analytics exports, and 20 MB file uploads.
              </p>
            </div>

            <div className="bg-[#1C1C1A]/5 border border-[#D8D4C8] rounded-xs px-4 py-3 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6F6A] block">Get notified when it launches</span>
              <a
                href="https://wa.me/918179072511?text=Hey%20Likith!%20I%27m%20interested%20in%20the%20Thateasy_qr%20Teams%20plan.%20Please%20notify%20me%20when%20it%20launches!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#1a9e4e] transition-colors no-underline"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Notify me on WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setShowTeamsModal(false)}
              className="w-full bg-[#1C1C1A] hover:bg-[#3A3A38] text-[#F7F5F0] text-xs font-semibold py-2.5 rounded-xs tracking-wider uppercase font-mono transition-colors cursor-pointer"
            >
              Got it — Continue with Free Plan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
