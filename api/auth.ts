import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  const { action } = req.query
  const body = req.body || {}

  try {
    if (action === "get_user") {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return res.status(200).json(data.user)
    } else if (action === "signup") {
      const { email, password, name, avatarUrl, plan } = body
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) throw error
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          name,
          organization: "Thateasy_qr Organization",
          avatar_url: avatarUrl || "",
          plan: plan || "free",
          updated_at: new Date().toISOString(),
        })
      }
      return res.status(200).json(data.user)
    } else if (action === "signin") {
      const { email, password } = body
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return res.status(200).json(data.user)
    } else if (action === "signout") {
      await supabase.auth.signOut()
      return res.status(200).json({ success: true })
    }
    return res.status(400).json({ message: "Invalid action" })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
