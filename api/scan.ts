import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  const body = req.body || {}
  try {
    const { qrId, details } = body
    const { error } = await supabase.from("scans").insert({
      qr_id: qrId,
      country: details.country,
      city: details.city,
      device: details.device,
      browser: details.browser,
      os: details.os,
    })
    if (error) throw error
    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
