(function () {
	const libsDirectory = './libs';

	(<DojoLoader.RootRequire> require).config({
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

	require([ 'app/main' ], function () { });
}());
