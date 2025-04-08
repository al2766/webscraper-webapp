/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Increase the body parser size limit for large HTML responses
      largePageDataBytes: 5 * 1024 * 1024, // 5MB
    },
    async headers() {
      return [
        {
          source: '/api/proxy',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: 'default-src *; style-src * \'unsafe-inline\'; script-src * \'unsafe-inline\' \'unsafe-eval\'; img-src * data: \'unsafe-inline\'; connect-src * \'unsafe-inline\'; frame-src *;',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;