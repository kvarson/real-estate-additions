import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['pg', 'sequelize'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // PostgreSQL ve Sequelize için external packages
      config.externals.push({
        'pg': 'commonjs pg',
        'pg-hstore': 'commonjs pg-hstore',
        'sequelize': 'commonjs sequelize',
      });
    }
    return config;
  },
  // Configuration for development indicators
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
};

export default withNextIntl(nextConfig);
