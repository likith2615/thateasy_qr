import { defineConfig, createLogger, loadEnv, type HtmlTagDescriptor, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"

import siteConfiguration from "./.figma/make/site.json"

const isFigmaSandbox = process.env.FIGMA === "1" || process.env.FIGMA === "true"

// Set only by the cached-preview build, so HTML-to-Design can map bundle frames
// back to source. The publish/deploy build never sets it → published sites don't
// embed source.
const emitSourcemaps = process.env.EMIT_SOURCEMAPS === "true"

// Custom logger — replaces the figma-make-app / Vite banner with clean Thateasy_qr branding
const logger = createLogger()
const originalInfo = logger.info.bind(logger)
logger.info = (msg, opts) => {
  // Suppress the generated "figma-make-app" or legacy "Figma Make App" banner line
  if (msg.includes("figma-make-app") || msg.includes("Figma Make App")) return
  originalInfo(msg, opts)
}

// Vite config — https://vitejs.dev/config/
export default defineConfig({
  customLogger: logger,
  base: process.env.FIGMA_PUBLIC_URL ? `${process.env.FIGMA_PUBLIC_URL}/` : "/",
  build: {
    sourcemap: emitSourcemaps ? "inline" : false,
    minify: !emitSourcemaps,
  },
  plugins: [
    react(),
    tailwindcss(),
    figmaSiteConfiguration(siteConfiguration),
    figmaErrorOverlayReplay(),
    figmaReactRefreshBoundaryFallback(),
    figmaMakeKitPlugin({ storiesGlob: "/src/**/*.stories.{ts,tsx,js,jsx}" }),
    figmaApiProxy(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
    strictPort: true,
    hmr: isFigmaSandbox ? { clientPort: 443 } : undefined,
    watch: { ignored: ["**/.figma/**"] },
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
  },
})

type FigmaSiteConfiguration = {
  title?: string
  description?: string
  language?: string
  robots?: {
    index?: boolean
  }
  icons?: {
    icon?: string
  }
  openGraph?: {
    image?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  customScripts?: {
    headStart?: string
    headEnd?: string
    bodyStart?: string
    bodyEnd?: string
  }
  accessibility?: {
    addBypassLinks?: boolean
  }
}

/** Applies /.figma/make/site.json to the generated document shell. */
function figmaSiteConfiguration(config: FigmaSiteConfiguration): Plugin {
  function sanitizeHtmlValue(value: string | undefined): string {
    return value?.replace(/[^a-zA-Z0-9_-]/g, "") || ""
  }
  function escapeHtmlText(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }
  function replaceHtmlCommentSlot(
    html: string,
    slotName: string,
    content: string,
  ): string {
    return html.replace(`<!-- ${slotName} -->`, content)
  }

  const title = config.title ?? "Figma Make App"
  const description = config.description ?? ""
  const favicon = config.icons?.icon ?? ""
  const socialImage = config.openGraph?.image ?? ""
  const language = sanitizeHtmlValue(config.language) || "en"
  const googleAnalyticsId = sanitizeHtmlValue(
    config.analytics?.googleAnalyticsId,
  )
  const headStart = config.customScripts?.headStart ?? ""
  const headEnd = config.customScripts?.headEnd ?? ""
  const bodyStart = config.customScripts?.bodyStart ?? ""
  const bodyEnd = config.customScripts?.bodyEnd ?? ""
  const robotsTxt =
    config.robots?.index === false ? "User-agent: *\nDisallow: /\n" : ""

  return {
    name: "figma-site-configuration",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!robotsTxt || req.url?.split("?")[0] !== "/robots.txt")
          return next()

        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.end(robotsTxt)
      })
    },
    generateBundle() {
      if (!robotsTxt) return

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsTxt,
      })
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let result = html
        result = replaceHtmlCommentSlot(result, "figma:lang", language)
        result = replaceHtmlCommentSlot(
          result,
          "figma:title",
          escapeHtmlText(title),
        )
        result = replaceHtmlCommentSlot(result, "figma:head-start", headStart)
        result = replaceHtmlCommentSlot(result, "figma:head-end", headEnd)
        result = replaceHtmlCommentSlot(result, "figma:body-start", bodyStart)
        result = replaceHtmlCommentSlot(result, "figma:body-end", bodyEnd)

        const tags: HtmlTagDescriptor[] = []
        if (description) {
          tags.push({
            tag: "meta",
            attrs: { name: "description", content: description },
            injectTo: "head",
          })
        }
        if (config.robots?.index === false) {
          tags.push({
            tag: "meta",
            attrs: { name: "robots", content: "noindex, nofollow" },
            injectTo: "head",
          })
        }
        if (favicon) {
          tags.push({
            tag: "link",
            attrs: { rel: "icon", href: favicon },
            injectTo: "head",
          })
        }
        if (title) {
          tags.push({
            tag: "meta",
            attrs: { property: "og:title", content: title },
            injectTo: "head",
          })
        }
        if (description) {
          tags.push({
            tag: "meta",
            attrs: { property: "og:description", content: description },
            injectTo: "head",
          })
        }
        if (socialImage) {
          tags.push(
            {
              tag: "meta",
              attrs: { property: "og:image", content: socialImage },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "twitter:card", content: "summary_large_image" },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "twitter:image", content: socialImage },
              injectTo: "head",
            },
          )
        }

        if (googleAnalyticsId) {
          tags.push(
            {
              tag: "script",
              attrs: {
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
              },
              injectTo: "head",
            },
            {
              tag: "script",
              children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(googleAnalyticsId)});
`,
              injectTo: "head",
            },
          )
        }

        if (config.accessibility?.addBypassLinks) {
          tags.push(
            {
              tag: "style",
              children: `
  .figma-bypass-link {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 2147483647;
    transform: translateY(-150%);
    border-radius: 6px;
    background: #111827;
    color: #fff;
    padding: 8px 12px;
    font: 600 14px/1.2 system-ui, sans-serif;
    text-decoration: none;
  }
  .figma-bypass-link:focus {
    transform: translateY(0);
  }
`,
              injectTo: "head",
            },
            {
              tag: "a",
              attrs: { class: "figma-bypass-link", href: "#root" },
              children: "Skip to content",
              injectTo: "body-prepend",
            },
          )
        }

        return {
          html: result,
          tags,
        }
      },
    },
  }
}

/**
 * Replay the most recent build error to clients that connect after
 * it was first broadcast. Vite buffers an error payload only while
 * no clients are connected and clears the buffer on the first
 * reconnect (see `bufferedMessage` in `createWebSocketServer`), so
 * if the preview iframe reloads after Vite already delivered an
 * error to a live socket, the new socket misses the payload and
 * the overlay stays hidden even though the build is still broken.
 * We intercept `ws.send` to remember the latest error and replay
 * it on every new connection; the cache clears on a successful
 * `update` or `full-reload` so a stale overlay can't survive a
 * fixed build.
 */
function figmaErrorOverlayReplay(): Plugin {
  return {
    name: "figma-error-overlay-replay",
    apply: "serve",
    configureServer(server) {
      let lastError: object | null = null

      const origSend = server.ws.send.bind(server.ws) as (
        ...args: any[]
      ) => void
      server.ws.send = (((...args: any[]) => {
        const payload = args[0]
        if (payload && typeof payload === "object" && !Array.isArray(payload)) {
          const type = (payload as { type?: string }).type
          if (type === "error") {
            lastError = (payload as object)
          } else if (type === "update" || type === "full-reload") {
            lastError = null
          }
        }
        return origSend(...args)
      }) as typeof server.ws.send)

      server.ws.on("connection", (socket) => {
        if (lastError !== null) {
          socket.send(JSON.stringify(lastError))
        }
      })
    },
  }
}

/**
 * Reload when a module that previously defined a React Refresh boundary stops
 * defining one. This happens when an agent moves a component into a new file
 * and replaces the old module with a re-export:
 *
 *   export { default } from './app/App'
 *
 * Vite otherwise accepts the update using the previous module's HMR boundary,
 * but the re-export-only transform no longer registers a replacement for the
 * mounted component family. React reports a successful refresh while leaving
 * the old tree mounted until the page is reloaded.
 */
function figmaReactRefreshBoundaryFallback(): Plugin {
  const hadRefreshBoundary = new Map<string, boolean>()
  let sendFullReload: (() => void) | null = null

  return {
    name: "figma-react-refresh-boundary-fallback",
    apply: "serve",
    enforce: "post",
    configureServer(server) {
      sendFullReload = () => server.ws.send({ type: "full-reload", path: "*" })
    },
    transform(code, id) {
      if (!/\.[jt]sx?(?:\?|$)/.test(id) || id.includes("/node_modules/"))
        return null

      const moduleId = id.split("?")[0] ?? id
      const hasRefreshBoundary = code.includes("registerExportsForReactRefresh")
      const previousHadRefreshBoundary = hadRefreshBoundary.get(moduleId)
      hadRefreshBoundary.set(moduleId, hasRefreshBoundary)

      if (previousHadRefreshBoundary && !hasRefreshBoundary) {
        queueMicrotask(() => sendFullReload?.())
      }

      return null
    },
  }
}

/**
 * Serves a blank render-target page at /.figma/make/kit.html that
 * the Figma preview script drives directly. The page exposes a
 * registry of every file matching `storiesGlob` on
 * window.__FIGMA__.stories so the design surface can dynamically
 * import + mount each entry into its own grid view.
 *
 * Dev-only: `apply: 'serve'` gates the plugin to `vite dev`. Prod
 * builds (`vite build`) skip it entirely so the route doesn't leak
 * into shipped bundles.
 */
function figmaMakeKitPlugin(options: {
  storiesGlob: string | string[]
}): Plugin {
  const storiesGlob = Array.isArray(options.storiesGlob)
    ? options.storiesGlob
    : [options.storiesGlob]
  const ROUTE = "/.figma/make/kit.html"
  const VIRTUAL_ID = "virtual:figma-stories"
  const RESOLVED_ID = "\0" + VIRTUAL_ID
  const STORIES_MODULE = `export const stories = import.meta.glob(${JSON.stringify(storiesGlob)})`
  const HTML_BOOTSTRAP = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<div id="figma-make-kit-root"></div>
<script type="module">
  import { stories } from 'virtual:figma-stories'
  window.__FIGMA__ = Object.assign(window.__FIGMA__ ?? {}, { stories })
  window.dispatchEvent(new CustomEvent('figma.ready'))
</script>
</body>
</html>`

  return {
    name: "figma-make-kit",
    apply: "serve",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      return STORIES_MODULE
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ""
        if (url.split("?")[0] !== ROUTE) return next()

        try {
          res.setHeader("Content-Type", "text/html")
          res.end(await server.transformIndexHtml(url, HTML_BOOTSTRAP))
        } catch (err) {
          next(err as Error)
        }
      })
    },
  }
}

function figmaApiProxy(): Plugin {
  let supabase: any = null

  return {
    name: "figma-api-proxy",
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), "")
      const supabaseUrl = env.VITE_SUPABASE_URL || ""
      const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || ""
      if (supabaseUrl && supabaseAnonKey) {
        supabase = createClient(supabaseUrl, supabaseAnonKey)
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "", `http://${req.headers.host}`)
        if (!url.pathname.startsWith("/api/")) {
          return next()
        }

        if (!supabase) {
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ message: "Supabase not configured on server" }))
          return
        }

        try {
          // Parse request body if POST/PUT
          let body: any = null
          if (req.method === "POST" || req.method === "PUT") {
            const buffers = []
            for await (const chunk of req) {
              buffers.push(chunk)
            }
            const data = Buffer.concat(buffers).toString()
            body = data ? JSON.parse(data) : {}
          }

          res.setHeader("Content-Type", "application/json")

          if (url.pathname === "/api/auth") {
            const action = url.searchParams.get("action")
            if (action === "get_user") {
              const { data, error } = await supabase.auth.getUser()
              if (error) throw error
              res.end(JSON.stringify(data.user))
            } else if (action === "signup") {
              const { email, password, name, avatarUrl, plan, redirectTo } = body
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  data: { full_name: name },
                  emailRedirectTo: redirectTo,
                },
              })
              if (error) throw error
              if (data.user) {
                await supabase.from("profiles").upsert({
                  id: data.user.id,
                  name,
                  organization: "Thateasy_qr Organization",
                  avatar_url: avatarUrl || "",
                  plan: plan || "free",
                  updated_at: new Date().toISOString(),
                })
              }
              res.end(JSON.stringify(data.user))
            } else if (action === "signin") {
              const { email, password } = body
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              })
              if (error) throw error
              res.end(JSON.stringify(data.user))
            } else if (action === "signout") {
              await supabase.auth.signOut()
              res.end(JSON.stringify({ success: true }))
            }
          } else if (url.pathname === "/api/profile") {
            if (req.method === "GET") {
              const userId = url.searchParams.get("userId")
              const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single()
              if (error) throw error
              res.end(JSON.stringify(data))
            } else if (req.method === "POST") {
              const { userId, updates } = body
              const { data, error } = await supabase
                .from("profiles")
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq("id", userId)
                .select()
                .single()
              if (error) throw error
              res.end(JSON.stringify(data))
            }
          } else if (url.pathname === "/api/qrs") {
            const userId = url.searchParams.get("userId")
            const { data, error } = await supabase
              .from("qrs")
              .select("*")
              .eq("user_id", userId)
              .order("created_at", { ascending: false })
            if (error) throw error
            res.end(JSON.stringify(data || []))
          } else if (url.pathname === "/api/qr") {
            const qrId = url.searchParams.get("qrId")
            if (req.method === "GET") {
              const { data, error } = await supabase
                .from("qrs")
                .select("*")
                .eq("id", qrId)
                .single()
              if (error) throw error
              res.end(JSON.stringify(data))
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
                res.end(JSON.stringify(data))
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
                res.end(JSON.stringify(data))
              }
            } else if (req.method === "DELETE") {
              const { error } = await supabase.from("qrs").delete().eq("id", qrId)
              if (error) throw error
              res.end(JSON.stringify({ success: true }))
            }
          } else if (url.pathname === "/api/scans") {
            const userId = url.searchParams.get("userId")
            const { data: scansData, error: scansError } = await supabase
              .from("scans")
              .select("*, qrs!inner(user_id)")
              .eq("qrs.user_id", userId)
            if (scansError) throw scansError
            const cleaned = (scansData || []).map((s: any) => {
              const { qrs, ...rest } = s
              return rest
            })
            res.end(JSON.stringify(cleaned))
          } else if (url.pathname === "/api/scan") {
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
            res.end(JSON.stringify({ success: true }))
          } else {
            res.statusCode = 404
            res.end(JSON.stringify({ message: "Not Found" }))
          }
        } catch (err: any) {
          res.statusCode = 500
          res.end(JSON.stringify({ message: err.message || "Internal Server Error" }))
        }
      })
    },
  }
}
