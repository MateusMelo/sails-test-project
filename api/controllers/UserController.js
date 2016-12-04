module.exports = {

	dashboard: function(req, res) {

		res.view('user/dashboard', {layout: 'user_internal'});
	},

	profile: function(req, res) {

		res.view('user/profile', {layout: 'user_internal'});
	},

	update: function(req, res) {

		var data = { 
            name: req.param('name'), 
            email: req.param('email'),
            password: req.param('password'),
        };

        if(!data.password) {
        	delete data.password;
        }

        User.findOne({ 
        	id: {'!': req.session.user.id},
        	email: data.email
        }).exec(function(err, user) {
        	if(user) {
        		req.flash('profileMessage', 'That email is already taken.')
        		res.type('html');
        		return res.redirect('/profile');
        	} else {
        		
        		User.update({id: req.session.user.id}, data).exec(function(err, user) {
					if(err)
						return res.badRequest(err);

					req.session.user = user[0];

					req.flash('successProfileMessage', 'Profile updated successfully');

					return res.redirect('/profile');
				});

        	}
        });
	}
	
};

