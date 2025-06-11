// next-sitemap.config.ts

export default {
    siteUrl: 'https://gs-tech-info.vercel.app/', // Replace with your actual domain
    generateRobotsTxt: true, // Automatically generate robots.txt
    sitemapSize: 5000, // Optional: limit sitemap size
    changefreq: 'weekly', // Optional
    priority: 0.7, // Optional
    exclude: ['/private-page'], // Optional: pages to exclude
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: '/private-page' },
        ],
    },
}