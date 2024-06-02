/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            [
                'next-superjson-plugin',
                {
                    excluded: [],
                },
            ],
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['picsum.photos', 'lh3.googleusercontent.com', 'cdn.discordapp.com'],
    },
};

module.exports = nextConfig;
