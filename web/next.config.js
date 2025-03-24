import { resolve } from "node:path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@smoores/epub", "smoores/fs"],
  serverExternalPackages: [
    "piscina",
    "@mapbox/node-pre-gyp",
    "pino",
    "pino-pretty",
    "onnxruntime-node",
    "echogarden",
  ],
  output: "standalone",
  outputFileTracingRoot: resolve(new URL(import.meta.url).pathname, "../.."),
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude binary modules from server build
      config.externals.push({
        "onnxruntime-node": "commonjs onnxruntime-node",
      })
    }

    // Add rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
      exclude: /node_modules/,
    })

    return config
  },
}

export default nextConfig
