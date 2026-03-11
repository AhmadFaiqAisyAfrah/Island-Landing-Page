/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.us-west-2.amazonaws.com', // Notion images
            },
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // Secure Notion images
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Unsplash for covers
            },
            {
                protocol: 'https',
                hostname: 'www.notion.so',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Google profile photos
            },
        ],
    },
};

export default nextConfig;
