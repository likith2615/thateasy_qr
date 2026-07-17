import { useState, useEffect, useRef } from "react"
import {
  QrCode,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  MapPin,
  CreditCard,
  Search,
  Link2,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Mail,
  Smartphone,
  FileText,
  Video,
  Download,
  Navigation,
} from "lucide-react"
import { db, QRCodeData, UserProfile } from "../lib/db"
import RealQRPattern, { downloadQR } from "./RealQRPattern"

interface QRWizardProps {
  user: { id: string }
  editQrId: string | null
  onSave: () => void
}

const DOT_STYLES = [
  { id: "square", label: "Classic" },
  { id: "dots", label: "Dots" },
  { id: "rounded", label: "Rounded" },
  { id: "classy", label: "Classy" },
]

const EYE_STYLES = [
  { id: "square", label: "Square" },
  { id: "circle", label: "Circle" },
  { id: "rounded", label: "Rounded" },
  { id: "leaf", label: "Leaf" },
]

const PALETTE = [
  "#1C1C1A",
  "#8E9C78",
  "#2D4A8A",
  "#8B3A3A",
  "#4A6B8A",
  "#6B4A8A",
]

const QR_TYPES = [
  { id: "url", title: "Website URL", desc: "Redirect scanners to any web URL.", icon: <Link2 size={16} /> },
  { id: "vcard", title: "Digital Business Card", desc: "Share contact information and social details.", icon: <Sparkles size={16} /> },
  { id: "linkpage", title: "Multi-Link Page", desc: "Create an elegant personal landing page with multiple links.", icon: <Plus size={16} /> },
  { id: "whatsapp", title: "WhatsApp QR", desc: "Open a pre-filled WhatsApp conversation.", icon: <MessageSquare size={16} /> },
  { id: "phone", title: "Phone Call QR", desc: "Prompt a phone dialer with a pre-filled number.", icon: <PhoneCall size={16} /> },
  { id: "email", title: "Email QR", desc: "Prepare an email with a recipient, subject, and body.", icon: <Mail size={16} /> },
  { id: "sms", title: "SMS QR", desc: "Send a pre-filled text message to a specific number.", icon: <Smartphone size={16} /> },
  { id: "upi", title: "UPI Payment QR", desc: "Receive payments instantly via UPI (India).", icon: <CreditCard size={16} /> },
  { id: "google-maps", title: "Maps QR", desc: "Share a location or coordinate point on the map.", icon: <MapPin size={16} /> },
  { id: "file", title: "File Share (PDF/Image/Video)", desc: "Upload and share PDFs, images, or videos.", icon: <FileText size={16} /> },
]

export default function QRWizard({ user, editQrId, onSave }: QRWizardProps) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Select Type, 2: Fill Content & Style
  const [qrType, setQrType] = useState<QRCodeData["type"]>("url")
  const [name, setName] = useState("")
  const [isDynamic, setIsDynamic] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Customizer styling states
  const [color, setColor] = useState("#1C1C1A")
  const [dotStyle, setDotStyle] = useState<"square" | "dots" | "rounded" | "classy">("rounded")
  const [eyeStyle, setEyeStyle] = useState<"square" | "circle" | "rounded" | "leaf">("rounded")
  const [logo, setLogo] = useState(true)

  // Content forms state
  const [urlDest, setUrlDest] = useState("https://")

  // vCard Form
  const [vcard, setVcard] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  })

  // Multi-Link Form
  const [linkTitle, setLinkTitle] = useState("")
  const [linkDesc, setLinkDesc] = useState("")
  const [linkAvatar, setLinkAvatar] = useState("")
  const [customLinks, setCustomLinks] = useState<{ id: string; title: string; url: string }[]>([])
  const [socials, setSocials] = useState({ twitter: "", linkedin: "", github: "" })

  // File Form
  const [fileData, setFileData] = useState({
    fileName: "",
    fileSize: "",
    fileType: "",
    fileUrl: "",
  })

  // WhatsApp Form
  const [waPhone, setWaPhone] = useState("")
  const [waMsg, setWaMsg] = useState("")

  // Phone Form
  const [phoneNum, setPhoneNum] = useState("")

  // Email Form
  const [emailAddr, setEmailAddr] = useState("")
  const [emailSub, setEmailSub] = useState("")
  const [emailBody, setEmailBody] = useState("")

  // SMS Form
  const [smsPhone, setSmsPhone] = useState("")
  const [smsMsg, setSmsMsg] = useState("")

  // UPI Form
  const [upiPa, setUpiPa] = useState("")
  const [upiPn, setUpiPn] = useState("")
  const [upiTn, setUpiTn] = useState("")
  const [upiAm, setUpiAm] = useState("")

  // Google Maps Form
  const [mapLat, setMapLat] = useState("12.9716")
  const [mapLng, setMapLng] = useState("77.5946")
  const [mapAddress, setMapAddress] = useState("")
  
  // Associated UPIR QR in Maps
  const [enableMapUpi, setEnableMapUpi] = useState(false)
  const [mapUpiPa, setMapUpiPa] = useState("")
  const [mapUpiPn, setMapUpiPn] = useState("")
  const [mapUpiAm, setMapUpiAm] = useState("")

  // Preview panel tab toggling
  const [previewTab, setPreviewTab] = useState<"primary" | "upi">("primary")

  // Map refs & API states
  const [mapProvider, setMapProvider] = useState<"google" | "osm">("osm")
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [gmapsLoaded, setGmapsLoaded] = useState(false)
  const [gmapsApiKey, setGmapsApiKey] = useState(() => {
    return localStorage.getItem("gmaps_api_key") || ""
  })
  const leafletMapRef = useRef<any>(null)
  const leafletMarkerRef = useRef<any>(null)
  const googleMapRef = useRef<any>(null)
  const googleMarkerRef = useRef<any>(null)

  // Inject Map scripts dynamically when google-maps is active
  useEffect(() => {
    if (qrType !== "google-maps" || step !== 2) return

    // 1. Inject Leaflet CSS
    let link = document.getElementById("leaflet-css") as HTMLLinkElement
    if (!link) {
      link = document.createElement("link")
      link.id = "leaflet-css"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    // 2. Inject Leaflet JS
    let script = document.getElementById("leaflet-script") as HTMLScriptElement
    if (!script) {
      script = document.createElement("script")
      script.id = "leaflet-script"
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = () => setLeafletLoaded(true)
      document.body.appendChild(script)
    } else {
      if ((window as any).L) {
        setLeafletLoaded(true)
      } else {
        script.onload = () => setLeafletLoaded(true)
      }
    }

    // 3. Inject Google Maps JS
    const callbackName = "initGoogleMapCallback"
    ;(window as any)[callbackName] = () => {
      setGmapsLoaded(true)
    }

    let gscript = document.getElementById("google-maps-script") as HTMLScriptElement
    if (!gscript) {
      gscript = document.createElement("script")
      gscript.id = "google-maps-script"
      gscript.src = `https://maps.googleapis.com/maps/api/js?key=${gmapsApiKey}&callback=${callbackName}`
      gscript.async = true
      gscript.defer = true
      document.body.appendChild(gscript)
    } else {
      if ((window as any).google && (window as any).google.maps) {
        setGmapsLoaded(true)
      } else {
        // Re-inject script if key changed, or just set callback
        if (gscript.src.includes(`key=${gmapsApiKey}`)) {
          // Key matches, wait for load
          const checkGMaps = setInterval(() => {
            if ((window as any).google && (window as any).google.maps) {
              setGmapsLoaded(true)
              clearInterval(checkGMaps)
            }
          }, 100)
          return () => clearInterval(checkGMaps)
        } else {
          // Key changed, replace script
          document.body.removeChild(gscript)
          const newGscript = document.createElement("script")
          newGscript.id = "google-maps-script"
          newGscript.src = `https://maps.googleapis.com/maps/api/js?key=${gmapsApiKey}&callback=${callbackName}`
          newGscript.async = true
          newGscript.defer = true
          document.body.appendChild(newGscript)
        }
      }
    }
  }, [qrType, step, gmapsApiKey])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || qrType !== "google-maps" || step !== 2) return

    try {
      const L = (window as any).L
      if (!L) return

      if (leafletMapRef.current) return

      const lat = parseFloat(mapLat) || 12.9716
      const lng = parseFloat(mapLng) || 77.5946

      const map = L.map("leaflet-map-picker").setView([lat, lng], 13)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      const marker = L.marker([lat, lng], { draggable: true }).addTo(map)
      leafletMapRef.current = map
      leafletMarkerRef.current = marker

      marker.on("dragend", () => {
        const pos = marker.getLatLng()
        setMapLat(pos.lat.toFixed(6))
        setMapLng(pos.lng.toFixed(6))

        // Sync to Google maps marker if initialized
        if (googleMarkerRef.current) {
          const google = (window as any).google
          if (google && google.maps) {
            googleMarkerRef.current.setPosition(new google.maps.LatLng(pos.lat, pos.lng))
          }
        }
      })

      map.on("click", (e: any) => {
        marker.setLatLng(e.latlng)
        setMapLat(e.latlng.lat.toFixed(6))
        setMapLng(e.latlng.lng.toFixed(6))

        // Sync to Google maps marker if initialized
        if (googleMarkerRef.current) {
          const google = (window as any).google
          if (google && google.maps) {
            googleMarkerRef.current.setPosition(new google.maps.LatLng(e.latlng.lat, e.latlng.lng))
          }
        }
      })
    } catch (err) {
      console.error("Leaflet map initialization failed:", err)
    }

    return () => {
      // Keep map reference cached to avoid duplicate creation errors
    }
  }, [leafletLoaded, qrType, step])

  // Initialize Google Map
  useEffect(() => {
    if (!gmapsLoaded || qrType !== "google-maps" || step !== 2) return

    try {
      const google = (window as any).google
      if (!google || !google.maps) return

      if (googleMapRef.current) return

      const lat = parseFloat(mapLat) || 12.9716
      const lng = parseFloat(mapLng) || 77.5946
      const center = { lat, lng }

      const mapContainer = document.getElementById("google-map-picker")
      if (!mapContainer) return

      const map = new google.maps.Map(mapContainer, {
        center,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      })

      const marker = new google.maps.Marker({
        position: center,
        map,
        draggable: true,
      })

      marker.addListener("dragend", () => {
        const pos = marker.getPosition()
        if (pos) {
          const plat = pos.lat()
          const plng = pos.lng()
          setMapLat(plat.toFixed(6))
          setMapLng(plng.toFixed(6))

          // Sync to Leaflet marker if initialized
          if (leafletMarkerRef.current) {
            leafletMarkerRef.current.setLatLng([plat, plng])
          }
        }
      })

      map.addListener("click", (e: any) => {
        const clickedPos = e.latLng
        if (clickedPos) {
          const plat = clickedPos.lat()
          const plng = clickedPos.lng()
          marker.setPosition(clickedPos)
          setMapLat(plat.toFixed(6))
          setMapLng(plng.toFixed(6))

          // Sync to Leaflet marker if initialized
          if (leafletMarkerRef.current) {
            leafletMarkerRef.current.setLatLng([plat, plng])
          }
        }
      })

      googleMapRef.current = map
      googleMarkerRef.current = marker
    } catch (err) {
      console.error("Google Maps initialization failed:", err)
    }

    return () => {
      // Keep map reference cached
    }
  }, [gmapsLoaded, qrType, step])

  // Invalidate Leaflet size when it becomes visible to render correctly
  useEffect(() => {
    if (mapProvider === "osm" && leafletMapRef.current) {
      setTimeout(() => {
        try {
          leafletMapRef.current.invalidateSize()
        } catch {}
      }, 100)
    }
  }, [mapProvider])

  // Geocoding Search
  const handleMapSearch = async () => {
    if (!mapAddress.trim()) return
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapAddress)}`)
      const data = await res.json()
      if (data && data.length > 0) {
        const first = data[0]
        const lat = parseFloat(first.lat)
        const lng = parseFloat(first.lon)
        setMapLat(lat.toFixed(6))
        setMapLng(lng.toFixed(6))

        // Center Leaflet map
        if (leafletMapRef.current && leafletMarkerRef.current) {
          leafletMapRef.current.setView([lat, lng], 14)
          leafletMarkerRef.current.setLatLng([lat, lng])
        }

        // Center Google map
        if (googleMapRef.current && googleMarkerRef.current) {
          const google = (window as any).google
          if (google && google.maps) {
            const newPos = new google.maps.LatLng(lat, lng)
            googleMapRef.current.setCenter(newPos)
            googleMapRef.current.setZoom(14)
            googleMarkerRef.current.setPosition(newPos)
          }
        }
      } else {
        alert("Location not found. Please try a different query.")
      }
    } catch (err) {
      console.error(err)
      alert("Error geocoding location.")
    }
  }

  // Geolocation for Current Location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setMapLat(lat.toFixed(6))
        setMapLng(position.coords.longitude.toFixed(6))

        // Center Leaflet map
        if (leafletMapRef.current && leafletMarkerRef.current) {
          leafletMapRef.current.setView([lat, lng], 15)
          leafletMarkerRef.current.setLatLng([lat, lng])
        }

        // Center Google map
        if (googleMapRef.current && googleMarkerRef.current) {
          const google = (window as any).google
          if (google && google.maps) {
            const newPos = new google.maps.LatLng(lat, lng)
            googleMapRef.current.setCenter(newPos)
            googleMapRef.current.setZoom(15)
            googleMarkerRef.current.setPosition(newPos)
          }
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        alert("Unable to retrieve your location. Please check browser permission settings.")
      }
    )
  }

  // Load existing data if editing
  useEffect(() => {
    db.getProfile(user.id).then((p) => {
      if (p) setProfile(p)
    })

    if (editQrId) {
      setLoading(true)
      db.getQRById(editQrId).then((qr) => {
        if (qr) {
          setName(qr.name)
          setQrType(qr.type)
          setIsDynamic(qr.is_dynamic)
          setColor(qr.styles.color)
          setDotStyle(qr.styles.dotStyle)
          setEyeStyle(qr.styles.eyeStyle)
          setLogo(qr.styles.logo)

          if (qr.type === "url") {
            setUrlDest(qr.destination_url)
          } else if (qr.type === "vcard") {
            setVcard({
              firstName: qr.content_data.firstName || "",
              lastName: qr.content_data.lastName || "",
              jobTitle: qr.content_data.jobTitle || "",
              company: qr.content_data.company || "",
              phone: qr.content_data.phone || "",
              email: qr.content_data.email || "",
              website: qr.content_data.website || "",
              address: qr.content_data.address || "",
            })
          } else if (qr.type === "linkpage") {
            setLinkTitle(qr.content_data.title || "")
            setLinkDesc(qr.content_data.description || "")
            setLinkAvatar(qr.content_data.avatarUrl || "")
            setCustomLinks(qr.content_data.links || [])
            setSocials(qr.content_data.socials || { twitter: "", linkedin: "", github: "" })
          } else if (qr.type === "file") {
            setFileData({
              fileName: qr.content_data.fileName || "",
              fileSize: qr.content_data.fileSize || "",
              fileType: qr.content_data.fileType || "",
              fileUrl: qr.content_data.fileUrl || "",
            })
          } else if (qr.type === "whatsapp") {
            setWaPhone(qr.content_data.waPhone || "")
            setWaMsg(qr.content_data.waMsg || "")
          } else if (qr.type === "phone") {
            setPhoneNum(qr.content_data.phoneNum || "")
          } else if (qr.type === "email") {
            setEmailAddr(qr.content_data.emailAddr || "")
            setEmailSub(qr.content_data.emailSub || "")
            setEmailBody(qr.content_data.emailBody || "")
          } else if (qr.type === "sms") {
            setSmsPhone(qr.content_data.smsPhone || "")
            setSmsMsg(qr.content_data.smsMsg || "")
          } else if (qr.type === "upi") {
            setUpiPa(qr.content_data.upiPa || "")
            setUpiPn(qr.content_data.upiPn || "")
            setUpiTn(qr.content_data.upiTn || "")
            setUpiAm(qr.content_data.upiAm || "")
          } else if (qr.type === "google-maps") {
            setMapLat(qr.content_data.mapLat || "12.9716")
            setMapLng(qr.content_data.mapLng || "77.5946")
            setMapAddress(qr.content_data.mapAddress || "")
            setEnableMapUpi(qr.content_data.enableMapUpi || false)
            setMapUpiPa(qr.content_data.mapUpiPa || "")
            setMapUpiPn(qr.content_data.mapUpiPn || "")
            setMapUpiAm(qr.content_data.mapUpiAm || "")
          }
          setStep(2)
        }
        setLoading(false)
      })
    } else {
      // Check for pending redirects from InfoPage
      const pendingType = sessionStorage.getItem("thateasy_qr_pending_create_type")
      if (pendingType) {
        sessionStorage.removeItem("thateasy_qr_pending_create_type")
        setQrType(pendingType as QRCodeData["type"])
        setStep(2)
      } else {
        setStep(1)
        setName("")
        setQrType("url")
        setIsDynamic(true)
        setColor("#1C1C1A")
        setDotStyle("rounded")
        setEyeStyle("rounded")
        setLogo(true)
        setUrlDest("https://")
      }
    }
  }, [editQrId])

  const handleAddLink = () => {
    setCustomLinks([
      ...customLinks,
      { id: Date.now().toString(), title: "Link Title", url: "https://" },
    ])
  }

  const handleRemoveLink = (id: string) => {
    setCustomLinks(customLinks.filter((l) => l.id !== id))
  }

  const handleLinkChange = (id: string, field: "title" | "url", value: string) => {
    setCustomLinks(
      customLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isTeams = profile?.plan === "teams"
    const maxMB = isTeams ? 20 : 1
    const maxBytes = maxMB * 1024 * 1024

    if (file.size > maxBytes) {
      alert(`File size exceeds your plan limit! Max size: ${maxMB} MB. Please upgrade to Teams for a 20 MB limit.`)
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setFileData({
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type,
        fileUrl: result,
      })
    }
    reader.readAsDataURL(file)
  }

  // Get raw code string to render scannable preview
  const getPreviewValue = (typeOfPreview: "primary" | "upi" = "primary") => {
    if (typeOfPreview === "upi") {
      const pa = qrType === "google-maps" ? mapUpiPa : upiPa
      const pn = qrType === "google-maps" ? mapUpiPn : upiPn
      const am = qrType === "google-maps" ? mapUpiAm : upiAm
      const tn = qrType === "google-maps" ? "" : upiTn
      return `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}&tn=${encodeURIComponent(tn)}&am=${am}&cu=INR`
    }

    if (!isDynamic) {
      switch (qrType) {
        case "url":
          return urlDest
        case "vcard":
          return `BEGIN:VCARD\nFN:${vcard.firstName} ${vcard.lastName}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nEND:VCARD`
        case "whatsapp":
          return `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`
        case "phone":
          return `tel:${phoneNum}`
        case "email":
          return `mailto:${emailAddr}?subject=${encodeURIComponent(emailSub)}&body=${encodeURIComponent(emailBody)}`
        case "sms":
          return `sms:${smsPhone}?body=${encodeURIComponent(smsMsg)}`
        case "upi":
          return `upi://pay?pa=${upiPa}&pn=${encodeURIComponent(upiPn)}&tn=${encodeURIComponent(upiTn)}&am=${upiAm}&cu=INR`
        case "google-maps":
          return `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`
        default:
          return urlDest
      }
    } else {
      // Dynamic short link redirection
      return `${window.location.origin}${window.location.pathname}?r=${editQrId || "temp-preview-id"}`
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please provide a name for this QR code.")
      return
    }

    setLoading(true)
    let destination_url = ""
    let content_data: Record<string, any> = {}

    switch (qrType) {
      case "url":
        destination_url = urlDest
        break
      case "vcard":
        content_data = vcard
        destination_url = `${window.location.origin}${window.location.pathname}?vcard=`
        break
      case "linkpage":
        content_data = {
          title: linkTitle || name,
          description: linkDesc,
          avatarUrl: linkAvatar || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
          links: customLinks,
          socials,
        }
        destination_url = `${window.location.origin}${window.location.pathname}?linkpage=`
        break
      case "file":
        content_data = fileData
        destination_url = `${window.location.origin}${window.location.pathname}?file=`
        break
      case "whatsapp":
        content_data = { waPhone, waMsg }
        destination_url = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`
        break
      case "phone":
        content_data = { phoneNum }
        destination_url = `tel:${phoneNum}`
        break
      case "email":
        content_data = { emailAddr, emailSub, emailBody }
        destination_url = `mailto:${emailAddr}?subject=${encodeURIComponent(emailSub)}&body=${encodeURIComponent(emailBody)}`
        break
      case "sms":
        content_data = { smsPhone, smsMsg }
        destination_url = `sms:${smsPhone}?body=${encodeURIComponent(smsMsg)}`
        break
      case "upi":
        content_data = { upiPa, upiPn, upiTn, upiAm }
        destination_url = `upi://pay?pa=${upiPa}&pn=${encodeURIComponent(upiPn)}&tn=${encodeURIComponent(upiTn)}&am=${upiAm}&cu=INR`
        break
      case "google-maps":
        content_data = { mapLat, mapLng, mapAddress, enableMapUpi, mapUpiPa, mapUpiPn, mapUpiAm }
        destination_url = `${window.location.origin}${window.location.pathname}?map=`
        break
    }

    const payload = {
      name,
      type: qrType,
      is_dynamic: isDynamic,
      is_active: true,
      destination_url,
      content_data,
      styles: { color, dotStyle, eyeStyle, logo },
    }

    try {
      if (editQrId) {
        if (qrType !== "url" && qrType !== "whatsapp" && qrType !== "phone" && qrType !== "email" && qrType !== "sms" && qrType !== "upi" && qrType !== "google-maps") {
          payload.destination_url = `${payload.destination_url}${editQrId}`
        }
        await db.updateQR(editQrId, payload)
      } else {
        const newQR = await db.createQR(user.id, payload)
        if (isDynamic && qrType !== "url" && qrType !== "whatsapp" && qrType !== "phone" && qrType !== "email" && qrType !== "sms" && qrType !== "upi" && qrType !== "google-maps") {
          await db.updateQR(newQR.id, {
            destination_url: `${payload.destination_url}${newQR.id}`,
          })
        }
      }
      onSave()
    } catch (err) {
      console.error(err)
      alert("Error saving QR code.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-[#6F6F6A]">
        <div className="w-8 h-8 rounded-full border-2 border-[#D8D4C8] border-t-[#8E9C78] animate-spin mb-4" />
        <span className="text-sm font-mono tracking-wider uppercase">Loading Configurator...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="p-2 border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-white text-[#6F6F6A] hover:text-[#1C1C1A] rounded-xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1A] tracking-tight">
            {editQrId ? "Edit QR Code" : "Create QR Code"}
          </h1>
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: SELECT TYPE */
        <div className="space-y-6">
          <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm">
            <h3 className="font-serif text-lg font-bold text-[#1C1C1A] mb-4">Choose QR Code Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {QR_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setQrType(type.id as QRCodeData["type"])
                    setStep(2)
                  }}
                  className="flex flex-col items-start text-left p-5 border border-[#D8D4C8] hover:border-[#1C1C1A] rounded-xs hover:bg-[#FAFAF8] transition-all cursor-pointer group"
                >
                  <span className="text-[#8E9C78] group-hover:scale-110 transition-transform mb-2">
                    {type.icon}
                  </span>
                  <span className="text-sm font-serif font-bold text-[#1C1C1A] group-hover:text-[#8E9C78] transition-colors">
                    {type.title}
                  </span>
                  <span className="text-xs text-[#6F6F6A] mt-1.5 leading-relaxed">
                    {type.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* STEP 2: CONFIGURE CONTENT & STYLE */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Form Side */}
          <div className="space-y-6 lg:col-span-3">
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                1. General Settings
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  QR Code Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vesper Art Gala"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                />
              </div>

              {/* Static/Dynamic Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                  Routing Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                    <input
                      type="radio"
                      name="isDynamic"
                      checked={isDynamic}
                      onChange={() => setIsDynamic(true)}
                      className="accent-[#8E9C78]"
                    />
                    Dynamic (Change destination URL anytime)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                    <input
                      type="radio"
                      name="isDynamic"
                      checked={!isDynamic}
                      onChange={() => setIsDynamic(false)}
                      className="accent-[#8E9C78]"
                    />
                    Static (Permanent content)
                  </label>
                </div>
              </div>
            </div>

            {/* QR Configurator Form */}
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                2. QR Content Data
              </h3>

              {/* URL */}
              {qrType === "url" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={urlDest}
                    onChange={(e) => setUrlDest(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#D8D4C8] hover:border-[#6F6F6A] focus:border-[#1C1C1A] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                  />
                </div>
              )}

              {/* WhatsApp */}
              {qrType === "whatsapp" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      WhatsApp Number (Include Country Code)
                    </label>
                    <input
                      type="tel"
                      placeholder="918179072511"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Pre-filled Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Hi Likith! Interested to collaborate..."
                      value={waMsg}
                      onChange={(e) => setWaMsg(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                </div>
              )}

              {/* Phone */}
              {qrType === "phone" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 8179072511"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                  />
                </div>
              )}

              {/* Email */}
              {qrType === "email" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      placeholder="developer@example.com"
                      value={emailAddr}
                      onChange={(e) => setEmailAddr(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      placeholder="Inquiry about NovaQR"
                      value={emailSub}
                      onChange={(e) => setEmailSub(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Email Body
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your email message..."
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                </div>
              )}

              {/* SMS */}
              {qrType === "sms" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Recipient Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+918179072511"
                      value={smsPhone}
                      onChange={(e) => setSmsPhone(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      SMS Body Text
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Type text message..."
                      value={smsMsg}
                      onChange={(e) => setSmsMsg(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                </div>
              )}

              {/* UPI Payments */}
              {qrType === "upi" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Payee UPI VPA
                      </label>
                      <input
                        type="text"
                        placeholder="likith2615@okaxis"
                        value={upiPa}
                        onChange={(e) => setUpiPa(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Payee Name
                      </label>
                      <input
                        type="text"
                        placeholder="Likith Chippe"
                        value={upiPn}
                        onChange={(e) => setUpiPn(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Transaction Note (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Invoice #1092"
                        value={upiTn}
                        onChange={(e) => setUpiTn(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Amount in INR (Optional)
                      </label>
                      <input
                        type="number"
                        placeholder="500"
                        value={upiAm}
                        onChange={(e) => setUpiAm(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Maps Location */}
              {qrType === "google-maps" && (
                <div className="space-y-5">
                  {/* Map Provider Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Map Provider
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAFAF8] border border-[#D8D4C8] rounded-sm">
                      <button
                        type="button"
                        onClick={() => setMapProvider("osm")}
                        className={`py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer border-none ${
                          mapProvider === "osm"
                            ? "bg-[#1C1C1A] text-white"
                            : "bg-transparent text-[#6F6F6A] hover:text-[#1C1C1A]"
                        }`}
                      >
                        OpenStreetMap (Free)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapProvider("google")}
                        className={`py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer border-none ${
                          mapProvider === "google"
                            ? "bg-[#1C1C1A] text-white"
                            : "bg-transparent text-[#6F6F6A] hover:text-[#1C1C1A]"
                        }`}
                      >
                        Google Maps (Premium)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative space-y-2">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Search Location Address
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Taj Mahal, India"
                          value={mapAddress}
                          onChange={(e) => setMapAddress(e.target.value)}
                          className="flex-1 bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                        />
                        <button
                          type="button"
                          onClick={handleMapSearch}
                          title="Search address"
                          className="bg-[#1C1C1A] text-white hover:bg-[#3A3A38] px-3.5 rounded-xs cursor-pointer flex items-center justify-center border-none"
                        >
                          <Search size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={handleUseCurrentLocation}
                          title="Use current location"
                          className="bg-[#8E9C78] text-white hover:bg-[#6b7859] px-3.5 rounded-xs cursor-pointer flex items-center justify-center border-none gap-1.5 text-xs font-semibold"
                        >
                          <Navigation size={14} className="rotate-45" />
                          <span className="hidden sm:inline">My Location</span>
                        </button>
                      </div>
                    </div>

                    {mapProvider === "google" && (
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                          Google Maps API Key (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter API Key to remove watermark"
                          value={gmapsApiKey}
                          onChange={(e) => {
                            const key = e.target.value
                            setGmapsApiKey(key)
                            localStorage.setItem("gmaps_api_key", key)
                          }}
                          className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* Map Canvas div */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                      Pin Picker (Click Map or Drag Pin to Update Location)
                    </span>
                    <div
                      id="google-map-picker"
                      className="w-full h-[220px] border border-[#D8D4C8] rounded-xs bg-[#F7F5F0]"
                      style={{ zIndex: 1, display: mapProvider === "google" ? "block" : "none" }}
                    />
                    <div
                      id="leaflet-map-picker"
                      className="w-full h-[220px] border border-[#D8D4C8] rounded-xs bg-[#F7F5F0]"
                      style={{ zIndex: 1, display: mapProvider === "osm" ? "block" : "none" }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Latitude
                      </label>
                      <input
                        type="text"
                        value={mapLat}
                        onChange={(e) => setMapLat(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">
                        Longitude
                      </label>
                      <input
                        type="text"
                        value={mapLng}
                        onChange={(e) => setMapLng(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Successfully generated QR settings for coordinates: ${mapLat}, ${mapLng}`)
                    }}
                    className="w-full py-2.5 bg-[#8E9C78] hover:bg-[#6b7859] text-white font-serif text-sm font-semibold rounded-xs transition-colors cursor-pointer border-none"
                  >
                    QR generate QR for this location
                  </button>

                  {/* UPIR QR configuration in Maps */}
                  <div className="pt-4 border-t border-[#EDE9E0] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-[#1C1C1A] block">
                          Attach Associated UPIR QR
                        </span>
                        <span className="text-[10px] text-[#6F6F6A]">
                          Generate a secondary scannable payment QR alongside this map code
                        </span>
                      </div>
                      <button
                        onClick={() => setEnableMapUpi(!enableMapUpi)}
                        type="button"
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                          enableMapUpi ? "bg-[#8E9C78]" : "bg-[#D8D4C8]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            enableMapUpi ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {enableMapUpi && (
                      <div className="bg-[#FAFAF8] p-4 border border-[#D8D4C8] rounded-xs space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                              UPI VPA
                            </label>
                            <input
                              type="text"
                              placeholder="payee@upi"
                              value={mapUpiPa}
                              onChange={(e) => setMapUpiPa(e.target.value)}
                              className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-2.5 py-1.5 rounded-sm font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                              Payee Name
                            </label>
                            <input
                              type="text"
                              placeholder="Business Name"
                              value={mapUpiPn}
                              onChange={(e) => setMapUpiPn(e.target.value)}
                              className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-2.5 py-1.5 rounded-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 max-w-xs">
                          <label className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider block">
                            Requested Amount in INR
                          </label>
                          <input
                            type="number"
                            placeholder="50"
                            value={mapUpiAm}
                            onChange={(e) => setMapUpiAm(e.target.value)}
                            className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-2.5 py-1.5 rounded-sm font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Digital Business Card (vCard) */}
              {qrType === "vcard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">First Name</label>
                    <input
                      type="text"
                      value={vcard.firstName}
                      onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Last Name</label>
                    <input
                      type="text"
                      value={vcard.lastName}
                      onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Job Title</label>
                    <input
                      type="text"
                      value={vcard.jobTitle}
                      onChange={(e) => setVcard({ ...vcard, jobTitle: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Company</label>
                    <input
                      type="text"
                      value={vcard.company}
                      onChange={(e) => setVcard({ ...vcard, company: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Mobile Number</label>
                    <input
                      type="tel"
                      value={vcard.phone}
                      onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      value={vcard.email}
                      onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Office Address</label>
                    <input
                      type="text"
                      value={vcard.address}
                      onChange={(e) => setVcard({ ...vcard, address: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                    />
                  </div>
                </div>
              )}

              {/* Multi-Link Page (linkpage) */}
              {qrType === "linkpage" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Biolink Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Mercer Portfolio"
                        value={linkTitle}
                        onChange={(e) => setLinkTitle(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Avatar Image URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={linkAvatar}
                        onChange={(e) => setLinkAvatar(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Bio Description</label>
                      <textarea
                        rows={2}
                        placeholder="Say something about yourself..."
                        value={linkDesc}
                        onChange={(e) => setLinkDesc(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-sm text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold">Multiple Links</label>
                      <button
                        onClick={handleAddLink}
                        type="button"
                        className="text-xs text-[#8E9C78] hover:text-[#6b7859] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} /> Add Link
                      </button>
                    </div>

                    {customLinks.map((link, idx) => (
                      <div key={link.id} className="flex gap-2 items-center bg-[#FAFAF8] p-3 border border-[#D8D4C8] rounded-xs">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            placeholder="Link Title"
                            value={link.title}
                            onChange={(e) => handleLinkChange(link.id, "title", e.target.value)}
                            className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-2.5 py-1 rounded-sm"
                          />
                          <input
                            type="text"
                            placeholder="Link URL"
                            value={link.url}
                            onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
                            className="w-full bg-white border border-[#D8D4C8] outline-none text-xs text-[#6F6F6A] px-2.5 py-1 rounded-sm font-mono"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveLink(link.id)}
                          type="button"
                          className="text-rose-500 hover:text-rose-600 p-2 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#EDE9E0]">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold block">Social Handles</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Twitter Handle"
                        value={socials.twitter}
                        onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                      <input
                        type="text"
                        placeholder="LinkedIn Username"
                        value={socials.linkedin}
                        onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                      <input
                        type="text"
                        placeholder="GitHub Username"
                        value={socials.github}
                        onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#D8D4C8] outline-none text-xs text-[#1C1C1A] px-3 py-2 rounded-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* File Share (PDF, Image, Video) */}
              {qrType === "file" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Upload File</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.mp4,.mov,.avi"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-[#6F6F6A] file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border file:border-[#D8D4C8] file:text-xs file:font-semibold file:bg-[#1C1C1A] file:text-[#F7F5F0] hover:file:bg-[#3A3A38] file:cursor-pointer"
                    />
                    <p className="text-[10px] text-[#6F6F6A] mt-1">
                      Accepted types: PDF, PNG, JPG, MP4, MOV. Max limit: {profile?.plan === "teams" ? "20" : "1"} MB.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">File Name</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Upload a file..."
                      value={fileData.fileName}
                      className="w-full bg-[#FAFAF8] opacity-80 border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs cursor-not-allowed font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">File Size</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Auto-calculated"
                      value={fileData.fileSize}
                      className="w-full bg-[#FAFAF8] opacity-80 border border-[#D8D4C8] outline-none text-sm text-[#6F6F6A] px-3 py-2 rounded-xs cursor-not-allowed font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Styling customizer */}
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1A] border-b border-[#EDE9E0] pb-2">
                3. QR Styling Customizer
              </h3>

              {/* Color */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Foreground Color</label>
                <div className="flex gap-2 items-center flex-wrap">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      type="button"
                      className="w-8 h-8 rounded-full border cursor-pointer transition-transform"
                      style={{
                        backgroundColor: c,
                        borderColor: color === c ? "#F7F5F0" : "#D8D4C8",
                        transform: color === c ? "scale(1.15)" : "scale(1)",
                        boxShadow: color === c ? "0 0 0 2px #1C1C1A" : "none",
                      }}
                    />
                  ))}
                  <div className="flex items-center gap-1.5 ml-2 border border-[#D8D4C8] px-2 py-1 rounded-sm bg-[#FAFAF8]">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-6 h-6 border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 text-xs font-mono text-[#1C1C1A] bg-transparent border-none outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Dot Pattern */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Dot Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DOT_STYLES.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setDotStyle(id as any)}
                      type="button"
                      className={`py-2 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                        dotStyle === id ? `border-[#1C1C1A] bg-[#1C1C1A] text-white` : "border-[#D8D4C8] hover:border-[#6F6F6A] text-[#6F6F6A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Shape */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider block">Eye Shape</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EYE_STYLES.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setEyeStyle(id as any)}
                      type="button"
                      className={`py-2 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                        eyeStyle === id ? `border-[#1C1C1A] bg-[#1C1C1A] text-white` : "border-[#D8D4C8] hover:border-[#6F6F6A] text-[#6F6F6A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Center Logo */}
              <div className="flex justify-between items-center bg-[#FAFAF8] p-3 border border-[#D8D4C8] rounded-xs">
                <div>
                  <span className="text-xs font-semibold text-[#1C1C1A] block">Embed Center Logo</span>
                  <span className="text-xs text-[#6F6F6A]">Places a clean branded letter "T" logo at the center</span>
                </div>
                <button
                  onClick={() => setLogo(!logo)}
                  type="button"
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${logo ? "bg-[#8E9C78]" : "bg-[#D8D4C8]"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${logo ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setStep(1)}
                type="button"
                className="px-5 py-3 border border-[#D8D4C8] hover:border-[#1C1C1A] hover:bg-white text-xs font-semibold rounded-xs text-[#1C1C1A] cursor-pointer"
              >
                Back to Types
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] px-6 py-3 text-xs font-semibold rounded-xs tracking-wide transition-colors cursor-pointer"
              >
                Save QR Code
              </button>
            </div>
          </div>

          {/* Preview Panel Side */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-6">
            <div className="bg-white border border-[#D8D4C8] p-6 rounded-sm text-center shadow-[0_1px_4px_rgba(28,28,26,0.01)] flex flex-col items-center">
              
              {/* Optional secondary tabs for associated Map UPI QR */}
              {qrType === "google-maps" && enableMapUpi ? (
                <div className="flex gap-2 mb-4 w-full bg-[#FAFAF8] p-1 border border-[#D8D4C8] rounded-sm text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("primary")}
                    className={`flex-1 py-1 rounded-xs transition-colors cursor-pointer ${previewTab === "primary" ? "bg-[#1C1C1A] text-[#F7F5F0] font-bold" : "text-[#6F6F6A]"}`}
                  >
                    Location QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("upi")}
                    className={`flex-1 py-1 rounded-xs transition-colors cursor-pointer ${previewTab === "upi" ? "bg-[#1C1C1A] text-[#F7F5F0] font-bold" : "text-[#6F6F6A]"}`}
                  >
                    UPIR QR
                  </button>
                </div>
              ) : null}

              <span className="text-xs font-mono text-[#6F6F6A] uppercase tracking-wider font-semibold block mb-4">
                {previewTab === "upi" ? "Associated UPIR Payment QR" : "Real-Time Scannable Preview"}
              </span>

              <RealQRPattern
                value={getPreviewValue(previewTab)}
                color={color}
                dotStyle={dotStyle}
                eyeStyle={eyeStyle}
                logo={logo}
                size={220}
              />

              <div className="mt-4 flex gap-2 w-full">
                {["PNG", "SVG"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      const suffix = previewTab === "upi" ? "upi_payment" : "code"
                      downloadQR(
                        `${name || "preset"}_${suffix}`,
                        getPreviewValue(previewTab),
                        color,
                        dotStyle,
                        eyeStyle,
                        logo,
                        fmt.toLowerCase() as "png" | "svg",
                      )
                    }}
                    className="flex-1 bg-[#1C1C1A] text-white hover:bg-[#3A3A38] text-[10px] font-mono font-bold uppercase tracking-wider py-2 rounded-xs border-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download size={10} /> {fmt}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-left space-y-3 w-full bg-[#FAFAF8] border border-[#D8D4C8] p-4 rounded-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8E9C78]" />
                  <span className="text-xs font-bold text-[#1C1C1A]">Scan to Test</span>
                </div>
                <p className="text-xs text-[#6F6F6A] leading-relaxed">
                  Point your smartphone camera at the screen to test the destination in real-time.
                </p>
                <div className="pt-2 border-t border-[#EDE9E0] text-xs font-mono text-[#6F6F6A] break-all">
                  <span className="font-semibold text-[#1C1C1A] uppercase tracking-wider block">Encoded Content:</span>
                  {getPreviewValue(previewTab)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
