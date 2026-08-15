/** @type {import('next').NextConfig} */
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import path from 'path';

initOpenNextCloudflareForDev();

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')]
  }
};

export default nextConfig;
