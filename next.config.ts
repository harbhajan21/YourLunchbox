import type { NextConfig } from "next";

/** "/RepoName" on github.io, empty on a custom domain. Set by the deploy workflow. */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { loader: "custom", loaderFile: "./src/lib/imageLoader.ts" },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
