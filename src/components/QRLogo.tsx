interface QRLogoProps {
  size?: number
  fontSize?: string
  logoColor?: string
}

export default function QRLogo({
  size = 22,
  fontSize = "1.5rem",
  logoColor = "#8E9C78",
}: QRLogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={logoColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        {/* Top-Left Eye */}
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect
          x="4.5"
          y="4.5"
          width="2"
          height="2"
          fill={logoColor}
          stroke="none"
        />

        {/* Top-Right Eye */}
        <rect x="15" y="2" width="7" height="7" rx="1" />
        <rect
          x="17.5"
          y="4.5"
          width="2"
          height="2"
          fill={logoColor}
          stroke="none"
        />

        {/* Bottom-Left Eye */}
        <rect x="2" y="15" width="7" height="7" rx="1" />
        <rect
          x="4.5"
          y="17.5"
          width="2"
          height="2"
          fill={logoColor}
          stroke="none"
        />

        {/* Data points */}
        <rect x="15" y="15" width="3" height="3" fill="#1C1C1A" stroke="none" />
        <rect x="19" y="19" width="3" height="3" fill="#1C1C1A" stroke="none" />
        <rect
          x="11"
          y="11"
          width="3"
          height="3"
          fill={logoColor}
          stroke="none"
        />
      </svg>
      <span
        style={{
          fontFamily: "'Crimson Text', Georgia, serif",
          fontWeight: 600,
          fontSize: fontSize,
          color: "#1C1C1A",
          letterSpacing: "-0.02em",
        }}
      >
        Thateasy
      </span>
      <span
        style={{
          fontFamily: "'Crimson Text', Georgia, serif",
          fontStyle: "italic",
          fontSize: fontSize,
          color: logoColor,
          letterSpacing: "-0.02em",
        }}
      >
        _qr
      </span>
    </div>
  )
}
