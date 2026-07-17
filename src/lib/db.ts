import { supabase, isSupabaseConfigured } from "./supabaseClient"

export interface UserProfile {
  id: string
  name: string
  organization: string
  avatar_url: string
  custom_host?: string
  plan?: string // 'free' | 'teams'
}

export interface QRCodeData {
  id: string
  user_id: string
  created_at: string
  name: string
  type: string // 'url' | 'vcard' | 'linkpage' | 'wifi' | 'sms' | 'phone' | 'email' | 'upi' | 'file'
  is_dynamic: boolean
  is_active: boolean
  destination_url: string
  content_data: Record<string, any>
  styles: {
    color: string
    dotStyle: "square" | "dots" | "rounded" | "classy"
    eyeStyle: "square" | "circle" | "rounded" | "leaf"
    logo: boolean
    background?: string
  }
}

export interface ScanEvent {
  id: string
  qr_id: string
  created_at: string
  country: string
  city: string
  device: string
  browser: string
  os: string
}

// -------------------------------------------------------------
// LOCAL STORAGE DATABASE IMPLEMENTATION (SANDBOX FALLBACK)
// -------------------------------------------------------------

const LS_USER_KEY = "thateasy_qr_user"
const LS_PROFILE_KEY = "thateasy_qr_profile"
const LS_QRS_KEY = "thateasy_qr_qrs"
const LS_SCANS_KEY = "thateasy_qr_scans"

const DEFAULT_USER = {
  id: "local-user-id",
  email: "intern@nxtgensec.com",
}

const DEFAULT_PROFILE: UserProfile = {
  id: "local-user-id",
  name: "Alex Mercer",
  organization: "NxtGenSec Corp",
  avatar_url:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  plan: "free",
}

// Helper to seed localStorage with beautiful mock data on first load
function seedLocalStorage() {
  const existingQRs = localStorage.getItem(LS_QRS_KEY)
  const existingScans = localStorage.getItem(LS_SCANS_KEY)

  if (!existingQRs) {
    const mockQRs: QRCodeData[] = [
      {
        id: "mock-qr-url-1",
        user_id: "local-user-id",
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        name: "Main Website Redirect",
        type: "url",
        is_dynamic: true,
        is_active: true,
        destination_url: "https://nxtgensec.com",
        content_data: {},
        styles: { color: "#8E9C78", dotStyle: "rounded", eyeStyle: "rounded", logo: true },
      },
      {
        id: "mock-qr-vcard-1",
        user_id: "local-user-id",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        name: "Developer Business Card",
        type: "vcard",
        is_dynamic: true,
        is_active: true,
        destination_url: "",
        content_data: {
          firstName: "Alex",
          lastName: "Mercer",
          jobTitle: "Lead Security Dev",
          company: "NxtGenSec",
          phone: "+1 (555) 019-2834",
          email: "alex.mercer@nxtgensec.com",
        },
        styles: { color: "#1C1C1A", dotStyle: "square", eyeStyle: "square", logo: false },
      },
    ]
    localStorage.setItem(LS_QRS_KEY, JSON.stringify(mockQRs))
  }

  if (!existingScans) {
    const mockScans: ScanEvent[] = [
      {
        id: "s-1",
        qr_id: "mock-qr-url-1",
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        country: "United States",
        city: "San Francisco",
        device: "Mobile",
        browser: "Safari",
        os: "iOS",
      },
      {
        id: "s-2",
        qr_id: "mock-qr-url-1",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        country: "United Kingdom",
        city: "London",
        device: "Desktop",
        browser: "Chrome",
        os: "Windows",
      },
      {
        id: "s-3",
        qr_id: "mock-qr-url-1",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        country: "India",
        city: "Bangalore",
        device: "Mobile",
        browser: "Chrome",
        os: "Android",
      },
      {
        id: "s-4",
        qr_id: "mock-qr-vcard-1",
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        country: "Germany",
        city: "Frankfurt",
        device: "Tablet",
        browser: "Firefox",
        os: "Android",
      },
    ]
    localStorage.setItem(LS_SCANS_KEY, JSON.stringify(mockScans))
  }
}

seedLocalStorage()

// -------------------------------------------------------------
// SECURE FETCH WRAPPER FOR BACKEND ENDPOINTS
// -------------------------------------------------------------

const apiFetch = async (method: string, path: string, body?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  const res = await fetch(path, options)
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.message || `API error: ${res.status}`)
  }
  return res.json()
}

// -------------------------------------------------------------
// EXPORTED UNIFIED API LAYER
// -------------------------------------------------------------

export const db = {
  isCloudMode: () => isSupabaseConfigured,

  // --- AUTHENTICATION ---
  getUser: async () => {
    if (isSupabaseConfigured) {
      try {
        return await apiFetch("GET", "/api/auth?action=get_user")
      } catch {
        return null
      }
    } else {
      const user = localStorage.getItem(LS_USER_KEY)
      return user ? JSON.parse(user) : null
    }
  },

  signUp: async (email: string, password: string, name: string, avatarUrl?: string, plan?: string) => {
    const defaultAvatar = avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    const userPlan = plan || "free"
    const redirectTo = typeof window !== "undefined" ? window.location.origin : ""

    if (isSupabaseConfigured) {
      return await apiFetch("POST", "/api/auth?action=signup", {
        email,
        password,
        name,
        avatarUrl: defaultAvatar,
        plan: userPlan,
        redirectTo,
      })
    } else {
      const newUser = { id: `user-${Date.now()}`, email }
      const newProfile: UserProfile = {
        id: newUser.id,
        name,
        organization: "Local Organization",
        avatar_url: defaultAvatar,
        plan: userPlan,
      }
      localStorage.setItem(LS_USER_KEY, JSON.stringify(newUser))
      localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(newProfile))
      return newUser
    }
  },

  signIn: async (email: string, password: string) => {
    if (isSupabaseConfigured) {
      return await apiFetch("POST", "/api/auth?action=signin", { email, password })
    } else {
      const localUser = { id: "local-user-id", email }
      localStorage.setItem(LS_USER_KEY, JSON.stringify(localUser))
      return localUser
    }
  },

  signOut: async () => {
    if (isSupabaseConfigured) {
      try {
        await apiFetch("POST", "/api/auth?action=signout")
      } catch (err) {
        console.error(err)
      }
    } else {
      localStorage.removeItem(LS_USER_KEY)
    }
  },

  // --- PROFILES ---
  getProfile: async (userId: string): Promise<UserProfile | null> => {
    if (isSupabaseConfigured) {
      try {
        return await apiFetch("GET", `/api/profile?userId=${userId}`)
      } catch (err) {
        console.error(err)
        return null
      }
    } else {
      const p = localStorage.getItem(LS_PROFILE_KEY)
      return p ? JSON.parse(p) : DEFAULT_PROFILE
    }
  },

  updateProfile: async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    if (isSupabaseConfigured) {
      return await apiFetch("POST", "/api/profile", { userId, updates })
    } else {
      const p = localStorage.getItem(LS_PROFILE_KEY)
      const current = p ? JSON.parse(p) : DEFAULT_PROFILE
      const updated = { ...current, ...updates }
      localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(updated))
      return updated
    }
  },

  // --- QR CODES (CRUD) ---
  getQRs: async (userId: string): Promise<QRCodeData[]> => {
    if (isSupabaseConfigured) {
      try {
        return await apiFetch("GET", `/api/qrs?userId=${userId}`)
      } catch (err) {
        console.error(err)
        return []
      }
    } else {
      const qrs = localStorage.getItem(LS_QRS_KEY)
      const parsed: QRCodeData[] = qrs ? JSON.parse(qrs) : []
      return parsed
        .filter((item) => item.user_id === userId)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
    }
  },

  getQRById: async (qrId: string): Promise<QRCodeData | null> => {
    if (isSupabaseConfigured) {
      try {
        return await apiFetch("GET", `/api/qr?qrId=${qrId}`)
      } catch {
        return null
      }
    } else {
      const qrs = localStorage.getItem(LS_QRS_KEY)
      const parsed: QRCodeData[] = qrs ? JSON.parse(qrs) : []
      return parsed.find((item) => item.id === qrId) || null
    }
  },

  createQR: async (
    userId: string,
    qr: Omit<QRCodeData, "id" | "user_id" | "created_at">,
  ): Promise<QRCodeData> => {
    if (isSupabaseConfigured) {
      return await apiFetch("POST", "/api/qr", { userId, qr })
    } else {
      const newQR: QRCodeData = {
        ...qr,
        id: `qr-${Date.now()}`,
        user_id: userId,
        created_at: new Date().toISOString(),
      }
      const qrs = localStorage.getItem(LS_QRS_KEY)
      const parsed: QRCodeData[] = qrs ? JSON.parse(qrs) : []
      parsed.push(newQR)
      localStorage.setItem(LS_QRS_KEY, JSON.stringify(parsed))
      return newQR
    }
  },

  updateQR: async (qrId: string, updates: Partial<QRCodeData>): Promise<QRCodeData> => {
    if (isSupabaseConfigured) {
      return await apiFetch("POST", `/api/qr?qrId=${qrId}`, { updates })
    } else {
      const qrs = localStorage.getItem(LS_QRS_KEY)
      const parsed: QRCodeData[] = qrs ? JSON.parse(qrs) : []
      const index = parsed.findIndex((item) => item.id === qrId)
      if (index !== -1) {
        parsed[index] = { ...parsed[index], ...updates }
        localStorage.setItem(LS_QRS_KEY, JSON.stringify(parsed))
        return parsed[index]
      }
      throw new Error("QR Code not found")
    }
  },

  deleteQR: async (qrId: string): Promise<void> => {
    if (isSupabaseConfigured) {
      await apiFetch("DELETE", `/api/qr?qrId=${qrId}`)
    } else {
      const qrs = localStorage.getItem(LS_QRS_KEY)
      const parsed: QRCodeData[] = qrs ? JSON.parse(qrs) : []
      const filtered = parsed.filter((item) => item.id !== qrId)
      localStorage.setItem(LS_QRS_KEY, JSON.stringify(filtered))
    }
  },

  // --- ANALYTICS / SCANS ---
  getScans: async (userId: string): Promise<ScanEvent[]> => {
    if (isSupabaseConfigured) {
      try {
        return await apiFetch("GET", `/api/scans?userId=${userId}`)
      } catch (err) {
        console.error(err)
        return []
      }
    } else {
      const scans = localStorage.getItem(LS_SCANS_KEY)
      return scans ? JSON.parse(scans) : []
    }
  },

  logScan: async (qrId: string, details: Omit<ScanEvent, "id" | "qr_id" | "created_at">): Promise<void> => {
    if (isSupabaseConfigured) {
      try {
        await apiFetch("POST", "/api/scan", { qrId, details })
      } catch (err) {
        console.error(err)
      }
    } else {
      const newScan: ScanEvent = {
        ...details,
        id: `scan-${Date.now()}`,
        qr_id: qrId,
        created_at: new Date().toISOString(),
      }
      const scans = localStorage.getItem(LS_SCANS_KEY)
      const parsed: ScanEvent[] = scans ? JSON.parse(scans) : []
      parsed.push(newScan)
      localStorage.setItem(LS_SCANS_KEY, JSON.stringify(parsed))
    }
  },
}
