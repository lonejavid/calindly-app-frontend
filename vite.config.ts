import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { buildHomepageJsonLdScriptTags } from "./seo/buildHomepageStructuredData";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteOrigin = (env.VITE_PUBLIC_SITE_URL || "https://www.schedley.com").replace(
    /\/$/,
    "",
  );

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "inject-homepage-jsonld",
        transformIndexHtml(html) {
          const snippet = buildHomepageJsonLdScriptTags(siteOrigin);
          return html.replace("</head>", `    ${snippet}\n  </head>`);
        },
      },
    ],
    server: {
      port: 3000,
      strictPort: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
