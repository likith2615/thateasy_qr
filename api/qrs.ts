import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  try {
    const { userId } = req.query
    const { data, error } = await supabase
      .from("qrs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    if (error) throw error
    return res.status(200).json(data || [])
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
