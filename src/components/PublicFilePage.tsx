import { QRCodeData } from "../lib/db"

export default function PublicFilePage({ qr }: { qr: QRCodeData }) {
  const {
    fileName = "Shared File",
    fileSize = "Unknown Size",
    fileType = "Unknown Type",
    fileUrl = "#",
  } = qr.content_data || {}

  // Determine file icon
  const getFileExtension = (name: string) => {
    return name.split(".").pop()?.toUpperCase() || "FILE"
  }

  const extension = getFileExtension(fileName)

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-white border border-[#D8D4C8] p-8 rounded-sm shadow-[0_2px_40px_rgba(28,28,26,0.05)]">
        {/* File Card info */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-[#EDE9E0]">
          {/* File Thumbnail/Icon */}
          <div className="w-20 h-24 bg-[#F7F5F0] border border-[#D8D4C8] rounded-sm flex flex-col items-center justify-between p-3 mb-6 shadow-inner relative overflow-hidden">
            <div
              className="w-6 h-6 border-b-2 border-r-2 border-[#D8D4C8] absolute top-0 right-0 bg-[#EDE9E0]"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <div className="h-6" /> {/* Spacer */}
            <span className="font-mono text-xs font-bold text-[#8E9C78] tracking-widest bg-white border border-[#EDE9E0] px-2 py-0.5 rounded-sm">
              {extension}
            </span>
            <span className="text-[9px] font-mono text-[#6F6F6A] uppercase tracking-wider">
              {fileSize}
            </span>
          </div>

          <h1 className="font-serif text-xl font-bold text-[#1C1C1A] tracking-tight break-all max-w-full px-2">
            {fileName}
          </h1>

          <p className="text-xs font-mono text-[#6F6F6A] mt-2 uppercase tracking-wider">
            {fileType}
          </p>
        </div>

        {/* Media Preview Section */}
        {fileUrl && fileUrl !== "#" && (
          <div className="mt-6 border-t border-[#EDE9E0] pt-6">
            {fileType.startsWith("image/") ? (
              <div className="border border-[#D8D4C8] rounded-xs overflow-hidden bg-[#F7F5F0]">
                <img
                  src={fileUrl}
                  alt={fileName}
                  className="w-full h-auto max-h-[300px] object-contain mx-auto"
                />
              </div>
            ) : fileType.startsWith("video/") ? (
              <div className="border border-[#D8D4C8] rounded-xs overflow-hidden bg-black">
                <video
                  src={fileUrl}
                  controls
                  className="w-full h-auto max-h-[300px]"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Download Section */}
        <div className="pt-6 space-y-6">
          <p className="text-center text-sm text-[#6F6F6A] leading-relaxed">
            This file has been securely shared via Thateasy_qr. Click the button
            below to download the file directly to your device.
          </p>

          <a
            href={fileUrl}
            download={fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#1C1C1A] text-[#F7F5F0] hover:bg-[#3A3A38] text-center py-3.5 text-sm font-semibold tracking-wide rounded-xs transition-colors cursor-pointer"
          >
            Download File ({fileSize})
          </a>
        </div>
      </div>

      {/* Brand Attribution */}
      <div className="mt-8 text-center text-xs text-[#6F6F6A]">
        <span>Powered by </span>
        <span className="font-serif font-bold text-[#1C1C1A]">
          Nova<span className="italic text-[#8E9C78]">QR</span>
        </span>
      </div>
    </div>
  )
}
