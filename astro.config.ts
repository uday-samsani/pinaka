import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import { SITE } from "./src/config";

// export default defineConfig({
//   output: 'server',
//   adapter: vercel({
//     webAnalytics: { enabled: true }
//   }),
// });
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      filter: page =>
        page !== "https://udaysamsani.com/admin/index.html" &&
        page !== "https://udaysamsani.com/admin/" &&
        page !== "https://www.udaysamsani.com/admin/index.html" &&
        page !== "https://www.udaysamsani.com/admin/",
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
