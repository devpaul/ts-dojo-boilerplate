import * as registerSuite from 'intern!object';
import * as expect from 'intern/chai!expect';
import main from 'src/main';

registerSuite({
	name: 'main',

	'app initializes with a promise containing a null value'() {
		expect(main.app).to.not.be.null;
		return main.app.then((app) => {
			expect(app).to.be.null;
		});
	}
});
