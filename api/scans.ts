import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  try {
    const { userId } = req.query
    const { data: scansData, error: scansError } = await supabase
      .from("scans")
      .select("*, qrs!inner(user_id)")
      .eq("qrs.user_id", userId)
    if (scansError) throw scansError
    const cleaned = (scansData || []).map((s: any) => {
      const { qrs, ...rest } = s
      return rest
    })
    return res.status(200).json(cleaned)
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
