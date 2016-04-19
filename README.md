# Installation
	npm install mauth-crypto --save
# Registration
	var mauth = require('mauth-crypto');
	
	$('#register-submit').click(function(event) {
		var username = $('#register-username').val();
		var password = $('#register-password').val();
		if (password === $('#register-password-confirm').val()) {
			mauth.salt(function(err, salt) {
				if (!err) {
					mauth.hash(password, salt, function(err, hash) {
						$.ajax({
							method: 'POST',
							url: '/register',
							data: {
								username: username,
								salt: salt,
								secret: hash
							},
							dataType: 'json'
						});
					}, 1000);
				}
			});
		}
	});

# Login
	var mauth = require('mauth-crypto');
	
	$('#login-submit').click(function(event) {
		var username = $('#login-username').val();
		var password = $('#login-password').val();
		$.ajax({
			method: 'POST',
			url: '/getSalt',
			data: {
				username: username
			},
			dataType: 'json'
		})
		.done(function(response) {
			mauth.hash(password, response.salt, function(err, hash) {
				$.ajax({
					method: 'POST',
					url: '/user/login',
					data: {
						username: username,
						secret: hash
					},
					dataType: 'json'
				});
			}, 1000);
		});
	});