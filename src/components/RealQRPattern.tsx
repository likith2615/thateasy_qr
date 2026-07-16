import QRCode from "qrcode"

type DotStyle = "square" | "dots" | "rounded" | "classy"
type EyeStyle = "square" | "circle" | "rounded" | "leaf"

interface RealQRPatternProps {
  value: string
  color: string
  dotStyle: DotStyle
  eyeStyle: EyeStyle
  logo: boolean
  size?: number
}

// Generate the customized SVG markup as a React component or as a raw string for export
export function getCustomQRData(
  value: string,
  color: string,
  dotStyle: DotStyle,
  eyeStyle: EyeStyle,
  logo: boolean,
  size: number = 300,
) {
  let qr: any
  try {
    qr = QRCode.create(value || "https://thateasy-qr.com", {
      errorCorrectionLevel: "M",
    })
  } catch (err) {
    console.error(err)
    // Fallback if encoding fails
    qr = QRCode.create("https://thateasy-qr.com", { errorCorrectionLevel: "M" })
  }

  const matrixSize = qr.modules.size
  // We add a quiet zone/boundary so the QR code doesn't fill the entire image.
  // This makes scanning much faster and more reliable.
  const margin = size * 0.12
  const innerSize = size - 2 * margin
  const cell = innerSize / matrixSize
  const eyeSize = cell * 7

  const getCell = (r: number, c: number): boolean => {
    if (qr.modules.get) {
      return Boolean(qr.modules.get(r, c))
    }
    return Boolean(qr.modules.data[r * matrixSize + c])
  }

  // Generate eyes SVG path or tags
  const renderEye = (x: number, y: number) => {
    const outerProps = { fill: color }
    const innerFill = "none"
    const coreSize = cell * 3

    if (eyeStyle === "circle") {
      return `
        <g>
          <circle cx="${x + eyeSize / 2}" cy="${y + eyeSize / 2}" r="${eyeSize / 2}" ${
            outerProps.fill ? `fill="${outerProps.fill}"` : ""
          } />
          <circle cx="${x + eyeSize / 2}" cy="${y + eyeSize / 2}" r="${eyeSize / 2 - cell}" fill="white" />
          <circle cx="${x + eyeSize / 2}" cy="${y + eyeSize / 2}" r="${coreSize / 2}" ${
            outerProps.fill ? `fill="${outerProps.fill}"` : ""
          } />
        </g>
      `
    }
    if (eyeStyle === "rounded") {
      const r = cell * 1.5
      return `
        <g>
          <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" rx="${r}" ${
            outerProps.fill ? `fill="${outerProps.fill}"` : ""
          } />
          <rect x="${x + cell}" y="${y + cell}" width="${eyeSize - cell * 2}" height="${eyeSize - cell * 2}" rx="${r * 0.6}" fill="white" />
          <rect x="${x + cell * 2}" y="${y + cell * 2}" width="${coreSize}" height="${coreSize}" rx="${cell * 0.5}" ${
            outerProps.fill ? `fill="${outerProps.fill}"` : ""
          } />
        </g>
      `
    }
    if (eyeStyle === "leaf") {
      const cx = x + eyeSize / 2
      const cy = y + eyeSize / 2
      return `
        <g>
          <path d="M${cx},${y} Q${x + eyeSize},${y} ${x + eyeSize},${cy} Q${x + eyeSize},${y + eyeSize} ${cx},${y + eyeSize} Q${x},${y + eyeSize} ${x},${cy} Q${x},${y} ${cx},${y}Z" fill="${color}" />
          <path d="M${cx},${y + cell} Q${x + eyeSize - cell},${y + cell} ${x + eyeSize - cell},${cy} Q${x + eyeSize - cell},${y + eyeSize - cell} ${cx},${y + eyeSize - cell} Q${x + cell},${y + eyeSize - cell} ${x + cell},${cy} Q${x + cell},${y + cell} ${cx},${y + cell}Z" fill="white" />
          <circle cx="${cx}" cy="${cy}" r="${coreSize / 2}" fill="${color}" />
        </g>
      `
    }
    // Classic Square
    return `
      <g>
        <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" fill="${color}" />
        <rect x="${x + cell}" y="${y + cell}" width="${eyeSize - cell * 2}" height="${eyeSize - cell * 2}" fill="white" />
        <rect x="${x + cell * 2}" y="${y + cell * 2}" width="${coreSize}" height="${coreSize}" fill="${color}" />
      </g>
    `
  }

  // Draw data dots
  let dotsSvg = ""
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder pattern eyes (top-left, top-right, bottom-left)
      if (r < 7 && c < 7) continue
      if (r < 7 && c >= matrixSize - 7) continue
      if (r >= matrixSize - 7 && c < 7) continue

      // Skip center logo zone if logo is enabled (approx 5x5 center)
      if (logo) {
        const center = Math.floor(matrixSize / 2)
        if (
          r >= center - 2 &&
          r <= center + 2 &&
          c >= center - 2 &&
          c <= center + 2
        ) {
          continue
        }
      }

      if (getCell(r, c)) {
        const x = c * cell
        const y = r * cell
        const pad = dotStyle === "square" ? 0 : cell * 0.12

        if (dotStyle === "dots") {
          dotsSvg += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="${cell / 2 - pad}" fill="${color}" />`
        } else if (dotStyle === "rounded") {
          dotsSvg += `<rect x="${x + pad}" y="${y + pad}" width="${cell - pad * 2}" height="${cell - pad * 2}" rx="${cell * 0.3}" fill="${color}" />`
        } else if (dotStyle === "classy") {
          const s = cell - pad * 2
          dotsSvg += `<rect x="${x + pad}" y="${y + pad}" width="${s}" height="${s}" rx="${cell * 0.45}" ry="0" fill="${color}" />`
        } else {
          // Square classic
          dotsSvg += `<rect x="${x + pad}" y="${y + pad}" width="${cell - pad * 2}" height="${cell - pad * 2}" fill="${color}" />`
        }
      }
    }
  }

  // Center logo element
  let logoSvg = ""
  if (logo) {
    const cx = innerSize / 2
    const cy = innerSize / 2
    const logoSize = cell * 4.5
    const logoInnerSize = cell * 3.5
    logoSvg = `
      <g>
        <rect x="${cx - logoSize / 2}" y="${cy - logoSize / 2}" width="${logoSize}" height="${logoSize}" fill="white" rx="${cell}" />
        <rect x="${cx - logoInnerSize / 2}" y="${cy - logoInnerSize / 2}" width="${logoInnerSize}" height="${logoInnerSize}" fill="${color}" rx="${cell * 0.7}" />
        <text x="${cx}" y="${cy + cell * 0.4}" fill="white" font-family="Georgia, serif" font-weight="bold" font-size="${cell * 2.2}" text-anchor="middle">T</text>
      </g>
    `
  }

  const eyeTL = renderEye(0, 0)
  const eyeTR = renderEye((matrixSize - 7) * cell, 0)
  const eyeBL = renderEye(0, (matrixSize - 7) * cell)

  const rawSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      {/* Background fill */}
      <rect width="${size}" height="${size}" fill="#F7F5F0" />
      
      {/* White boundary card with parchment border outline */}
      <rect x="${margin - 12}" y="${margin - 12}" width="${innerSize + 24}" height="${innerSize + 24}" fill="white" stroke="#D8D4C8" stroke-width="1.5" rx="6" />
      
      {/* Centered QR code group */}
      <g transform="translate(${margin}, ${margin})">
        ${dotsSvg}
        ${eyeTL}
        ${eyeTR}
        ${eyeBL}
        ${logoSvg}
      </g>
    </svg>
  `

  return rawSvg
}

// React component wrapper
export default function RealQRPattern({
  value,
  color,
  dotStyle,
  eyeStyle,
  logo,
  size = 300,
}: RealQRPatternProps) {
  const svgMarkup = getCustomQRData(
    value,
    color,
    dotStyle,
    eyeStyle,
    logo,
    size,
  )

  return (
    <div
      className="flex items-center justify-center p-2 bg-[#F7F5F0] border border-[#D8D4C8] rounded-sm"
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  )
}

// Helper to trigger direct downloads
export function downloadQR(
  name: string,
  value: string,
  color: string,
  dotStyle: DotStyle,
  eyeStyle: EyeStyle,
  logo: boolean,
  format: "png" | "svg" | "pdf",
) {
  const svgString = getCustomQRData(value, color, dotStyle, eyeStyle, logo, 400)
  const fileName = `${name.toLowerCase().replace(/\s+/g, "_")}_qr`

  if (format === "svg") {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${fileName}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } else if (format === "png") {
    // Generate PNG via hidden Canvas
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 800
      canvas.height = 800
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#F7F5F0"
        ctx.fillRect(0, 0, 800, 800)
        ctx.drawImage(img, 0, 0, 800, 800)

        const pngUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = pngUrl
        link.download = `${fileName}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      URL.revokeObjectURL(url)
    }
    img.src = url
  } else if (format === "pdf") {
    // Render to a separate window configured for PDF printing
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>${name} - QR Code PDF</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: system-ui, sans-serif;
            }
            .container {
              text-align: center;
              border: 1px solid #D8D4C8;
              padding: 40px;
              border-radius: 4px;
            }
            h1 { font-size: 24px; margin-bottom: 8px; color: #1C1C1A; }
            p { font-size: 14px; color: #6F6F6A; margin-bottom: 24px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${name}</h1>
            <p>${value}</p>
            ${svgString}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
        </html>
      `)
      printWindow.document.close()
    }
  }
}
