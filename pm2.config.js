module.exports = {
	apps: [
		{
			name: 'links-server',
			script: 'NODE_ENV=production node ./dist/bin/server.js',
			instances: 'max',
			exec_mode: 'cluster',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
