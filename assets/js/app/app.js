import {validation} from 'modules/validate';
import {enhancePage} from 'modules/bootstrap';
import {parallax} from 'modules/parallax';

var initiateJs = new Promise (
	function(resolve, reject) {
		enhancePage();
	}
)
.then(
	parallax.call(this)
);