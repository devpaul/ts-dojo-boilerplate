(function () {
	const libsDirectory = './libs';

	(<any> require).config({
		baseUrl: '.',
		packages: [
			{
				name: 'app',
				location: './src'
			},
			{
				name: 'dojo-core',
				location: `${ libsDirectory }/dojo-core`
			},
			{
				name: 'dojo-has',
				location: `${ libsDirectory }/dojo-has`
			},
			{
				name: 'dojo-shim',
				location: `${ libsDirectory }/dojo-shim`
			}
		]
	});

	(<any> require)([ 'app/main' ], function () { });
}());
