/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: 'picsum.photos' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'avatars.githubusercontent.com' },
        ],
    },
};

module.exports = nextConfig;
