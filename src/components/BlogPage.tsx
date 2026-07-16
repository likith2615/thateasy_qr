import { useState } from "react"
import { ArrowLeft, BookOpen, Clock, Heart, Share2, User } from "lucide-react"

export default function BlogPage() {
  const [activePostIdx, setActivePostIdx] = useState<number | null>(null)

  const posts = [
    {
      title: "The Art of the Physical QR: Branding Outside the Screen",
      excerpt: "Why premium brands are ditching standard industrial black-and-white QR codes in favor of custom-styled, integrated vectors. Explore the visual psychology of offline scans.",
      date: "July 12, 2026",
      readTime: "5 min read",
      category: "Design",
      author: "Evelyn Sterling",
      body: `
        <h3>1. Deconstructing the Finder Pattern</h3>
        <p>At the core of every Quick Response (QR) code are three large nested squares situated in the top-left, top-right, and bottom-left corners. In computer vision terms, these are referred to as <strong>Finder Patterns</strong> (or position detection patterns). They allow mobile lenses and camera sensors to detect the presence, scale, and orientation of the code within a 3D physical environment in milliseconds.</p>
        <p>Standard industrial QR codes render these eyes in harsh, unstyled black. However, high-end editorial layouts and premium product packaging require visual integration. By tailoring the eye frame style to rounded corners or organic leaf shapes, and matching the color tone to a quiet inkstone (#1C1C1A) or sage (#8E9C78), the QR code stops feeling like a mechanical barcode and becomes a natural component of your brand's physical style sheet.</p>

        <h3>2. Reed-Solomon Error Correction Level Math</h3>
        <p>One of the most powerful attributes of the QR format is its built-in resilience to physical damage, scratches, and low-light lens focusing. This is powered by <strong>Reed-Solomon Error Correction</strong> algorithms. When generating a QR code, you can select one of four error correction levels:</p>
        <ul>
          <li><strong>Level L:</strong> Recovers up to <strong>7%</strong> of lost or damaged data. Best for minimal density and fast scanning.</li>
          <li><strong>Level M:</strong> Recovers up to <strong>15%</strong> of lost data. The default choice for consumer brochures.</li>
          <li><strong>Level Q:</strong> Recovers up to <strong>25%</strong> of lost data. Good for industrial settings where codes face grease or dust.</li>
          <li><strong>Level H (High):</strong> Recovers up to <strong>30%</strong> of lost data. This is crucial when placing custom brand logos or symbols in the center of the QR matrix, as the code can fully reconstruct the hidden modules behind the logo.</li>
        </ul>

        <h3>3. Designing for the Physical Touchpoint</h3>
        <p>When printing QR codes, contrast is key. Most camera systems detect modules by calculating relative luminance values. For maximum readability, ensure you preserve a high contrast ratio between the dark modules and the warm alabaster background, and maintain a clear margin (referred to as the "Quiet Zone") of at least 4 modules wide around the outer perimeter of the code.</p>
      `
    },
    {
      title: "Leveraging Dynamic Codes for Campaign Agility",
      excerpt: "Printing thousands of QR codes on packaging or product flyers is risky if your destination links are static. Learn how dynamic redirects eliminate reprint costs.",
      date: "June 28, 2026",
      readTime: "4 min read",
      category: "Marketing",
      author: "Marcus Vance",
      body: `
        <h3>1. The Pitfall of Static Physical Print</h3>
        <p>A static QR code encodes your target URL directly into the pixelated module pattern. If you need to fix a typo, update a seasonal menu, or route users to a new promotional campaign, a static QR code requires you to recall your products, scrap your print materials, and reprint thousands of flyers. The cost is high, both financially and operationally.</p>

        <h3>2. The Dynamic Redirection Protocol</h3>
        <p>Dynamic QR codes solve this issue by introducing a lightweight, secure intermediary layer. Instead of encoding the long final destination URL (e.g., <code>https://mybrand.com/campaigns/2026/summer-launch-promo</code>), the QR code encodes a short, static redirection link (e.g., <code>https://thateasy-qr.com/r/campaign-id</code>).</p>
        <p>When a scanner reads this code, the request goes to the intermediary server, which instantly responds with a standard HTTP 302 Found response, forwarding the scanner to the current target destination URL. This swap happens in under 120 milliseconds, leaving the user with a seamless redirect experience.</p>

        <h3>3. Real-time Diagnostic Analytics</h3>
        <p>Because every scan request passes through the dynamic redirection handler, you can collect valuable marketing analytics. You can track peak scan times, verify which print brochures generate the most engagement, and analyze device distribution (iOS vs. Android) to optimize your landing page design. Crucially, Thateasy_qr does this with user privacy in mind, discarding IP logs immediately after resolving geographic regions.</p>
      `
    },
    {
      title: "A Designer's Guide to QR Contrast, Styling, & High-Res Printing",
      excerpt: "A deep dive into dot layouts, alignment eyes, and background contrast ratios that ensure your bespoke QR codes remain highly scannable by all mobile lens models.",
      date: "June 15, 2026",
      readTime: "8 min read",
      category: "Guides",
      author: "Evelyn Sterling",
      body: `
        <h3>1. Vector Graphics vs. Raster Compression</h3>
        <p>Bespoke packaging design demands precision. When exporting a QR code, always prefer vector formats like <strong>SVG</strong> over compressed raster formats like JPG or PNG. Vector graphics scale infinitely without pixelating, ensuring that when your printer prints the physical code, the borders between light and dark modules remain mathematically sharp. A blurry print border can confuse camera sensor autofocus systems, delaying the scan.</p>

        <h3>2. Color Theory and Lens Luminosity</h3>
        <p>While dynamic computer vision algorithms can compensate for various color values, placing dark gray, deep inkstone (#1C1C1A), or warm copper tones against a light cream background (#F7F5F0) guarantees the highest scan success rate. Avoid pastel colors or low-contrast combinations like yellow modules on white paper. The camera's red, green, and blue (RGB) channels must see clear luminance differentials to parse the data matrix.</p>

        <h3>3. The Importance of Quiet Zones</h3>
        <p>In graphic design, white space is a critical aesthetic choice. In QR design, it is a technical requirement. The "Quiet Zone" is the blank border surrounding the QR code. Without it, nearby text, images, or margins can bleed into the scanning area, preventing the reader from isolating the finder patterns. We recommend keeping the quiet zone margin at 10-15% of the total QR width to ensure a clean boundary on product tags and restaurant tables.</p>
      `
    }
  ]

  if (activePostIdx !== null) {
    const post = posts[activePostIdx]
    return (
      <div className="bg-[#F7F5F0] py-16 px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)] font-sans">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setActivePostIdx(null)}
            className="flex items-center gap-2 text-xs font-mono text-[#6F6F6A] hover:text-[#1C1C1A] mb-8 font-semibold transition-colors group cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO ARTICLES
          </button>

          {/* Post Header */}
          <header className="space-y-4 border-b border-[#D8D4C8] pb-8 mb-10">
            <div className="flex items-center gap-3 text-xs font-mono text-[#8E9C78]">
              <span className="uppercase tracking-widest font-bold">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1A] tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 pt-3 text-xs text-[#6F6F6A] font-mono">
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Post Body (Editorial Rich Text Layout) */}
          <article 
            className="prose prose-stone max-w-none text-sm text-[#6F6F6A] leading-relaxed space-y-6 font-sans text-left
              [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1C1C1A] [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-4
              [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-3 [&>ul]:space-y-2 [&>ul]:mb-4
              [&>ul_strong]:text-[#1C1C1A]
              [&_code]:bg-[#EDE9E0] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-xs [&_code]:font-mono [&_code]:text-[11px] [&_code]:text-[#1C1C1A]"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Post Footer Actions */}
          <footer className="mt-16 border-t border-[#D8D4C8] pt-8 flex justify-between items-center text-xs font-mono text-[#6F6F6A]">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 hover:text-[#1C1C1A] transition-colors cursor-pointer bg-transparent border-0">
                <Heart size={14} />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#1C1C1A] transition-colors cursor-pointer bg-transparent border-0">
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
            <span>Published by Thateasy_qr Operations</span>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F5F0] py-16 px-6 md:px-12 lg:px-24 min-h-[calc(100vh-140px)] font-sans">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="border-b border-[#D8D4C8] pb-12 mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8E9C78] font-semibold block mb-3">
            Thateasy_qr Journal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1A] tracking-tight leading-none">
            The Editorial Sanctuary
          </h1>
          <p className="text-[#6F6F6A] mt-4 text-md leading-relaxed font-sans max-w-xl">
            Thoughtful write-ups on design systems, physical branding, marketing analytics, and the intersection of real-world print with digital tech.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="space-y-16">
          {posts.map((post, idx) => (
            <article key={idx} className="border-b border-[#D8D4C8] pb-12 last:border-b-0 flex flex-col md:flex-row gap-8 items-start">
              {/* Post Metadata (Desktop Left Column) */}
              <div className="w-full md:w-1/4 shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-2 md:gap-4 text-xs font-mono text-[#6F6F6A]">
                <div>
                  <span className="text-[#8E9C78] uppercase tracking-wider font-semibold block mb-1">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <div>
                  <span className="block">{post.readTime}</span>
                  <span className="text-[#1C1C1A] mt-1 block">By {post.author}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="flex-1">
                <h2 
                  onClick={() => setActivePostIdx(idx)}
                  className="font-serif text-2xl md:text-3xl font-bold text-[#1C1C1A] hover:text-[#8E9C78] transition-colors leading-tight cursor-pointer"
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#6F6F6A] mt-4 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <button 
                    onClick={() => setActivePostIdx(idx)}
                    className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1C1C1A] border-b border-[#1C1C1A] pb-1 cursor-pointer hover:text-[#8E9C78] hover:border-[#8E9C78] transition-colors bg-transparent"
                  >
                    Read Article &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
