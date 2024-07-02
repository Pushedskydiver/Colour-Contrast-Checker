/**
 * @type {import('@remix-run/dev').AppConfig}
 */
// const flatRoutes = require('remix-flat-routes').flatRoutes;

module.exports = {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
	future: {},
	serverModuleFormat: 'cjs',
	serverPlatform: 'node',
};
