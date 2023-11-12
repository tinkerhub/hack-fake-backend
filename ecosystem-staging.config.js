module.exports = {
	apps: [
		{
			name: "hack-fake-server",
			script: "./build/src/App.js",
			env: {
				NODE_ENV: "staging",
			},
		},
	],
};
