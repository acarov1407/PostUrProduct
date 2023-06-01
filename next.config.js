/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com']
    },
    i18n: {
        locales: ['es'],
        defaultLocale: 'es'
    }
}

module.exports = nextConfig
