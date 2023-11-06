module.exports = {
	apps: [
		{
			name: 'links-server',
			script: 'NODE_ENV=development node ./dist/bin/server.js',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
			},
		},
	],
};