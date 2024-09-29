/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'is1-ssl.mzstatic.com',
          port: '',
          pathname: '/**',  // Povolit všechny cesty obrázků z tohoto hostingu
        },
        {
          protocol: 'https',
          hostname: 'images.ctfassets.net',
          port: '',
          pathname: '/**',  // Povolit obrázky z Contentful
        },
      ],
    },
  }
  
export default nextConfig;