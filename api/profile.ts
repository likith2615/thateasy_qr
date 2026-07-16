import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  const body = req.body || {}

  try {
    if (req.method === "GET") {
      const { userId } = req.query
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      if (error) throw error
      return res.status(200).json(data)
    } else if (req.method === "POST") {
      const { userId, updates } = body
      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single()
      if (error) throw error
      return res.status(200).json(data)
    }
    return res.status(405).json({ message: "Method Not Allowed" })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
