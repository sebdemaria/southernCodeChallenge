/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "mars.jpl.nasa.gov",
            },
        ],
    },
};

module.exports = nextConfig;
