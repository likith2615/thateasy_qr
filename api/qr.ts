import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req: any, res: any) {
  const { qrId } = req.query
  const body = req.body || {}

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("qrs")
        .select("id, name, type, is_dynamic, is_active, destination_url, content_data, styles")
        .eq("id", qrId)
        .single()
      if (error) throw error
      return res.status(200).json(data)
    } else if (req.method === "POST") {
      if (qrId) {
        const { updates } = body
        const { data, error } = await supabase
          .from("qrs")
          .update(updates)
          .eq("id", qrId)
          .select()
          .single()
        if (error) throw error
        return res.status(200).json(data)
      } else {
        const { userId, qr } = body
        const { data, error } = await supabase
          .from("qrs")
          .insert({
            user_id: userId,
            name: qr.name,
            type: qr.type,
            is_dynamic: qr.is_dynamic,
            is_active: qr.is_active,
            destination_url: qr.destination_url,
            content_data: qr.content_data,
            styles: qr.styles,
          })
          .select()
          .single()
        if (error) throw error
        return res.status(200).json(data)
      }
    } else if (req.method === "DELETE") {
      const { error } = await supabase.from("qrs").delete().eq("id", qrId)
      if (error) throw error
      return res.status(200).json({ success: true })
    }
    return res.status(405).json({ message: "Method Not Allowed" })
  } catch (err: any) {
    console.error("QR Handler Error:", err)
    return res.status(500).json({ message: err.message || "Failed to process QR operation" })
  }
}
