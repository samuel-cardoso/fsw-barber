/** @type {import('next').NextConfig} */
const nextConfig = {
    // Abaixo estou permitindo ao next que mostre as imagens que estão no servidor 
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io"
            }
        ]
    }
}

export default nextConfig