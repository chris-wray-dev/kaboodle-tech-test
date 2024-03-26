/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['https://via.placeholder.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				port: '',
				pathname: '/500/EE5E55/ffffff/**',
			},
		],
	},
};

export default nextConfig;
