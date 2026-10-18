import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 🟢 Добавляем официальное разрешение для твоего облака Supabase:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ekrhesundfehqshlfdoj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
