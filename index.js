
var crypto = require('crypto');


function salt(callback) {
	crypto.randomBytes(64, function(err, salt) {
		if (err) {
			callback(err);
		} else {
			callback(undefined, salt.toString('hex'));
		}
	});
};

function hash(secret, salt, callback, iterations) {
	crypto.pbkdf2(secret, salt, iterations || 100000, 64, 'sha512', function(err, key) {
		if (err) {
			callback(err);
		} else {
			callback(undefined, key.toString('hex'));
		}
	});
};


module.exports = {
	salt: salt,
	hash: hash
};