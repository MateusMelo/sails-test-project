module.exports = {

	dashboard: function(req, res) {

		res.view('user/dashboard', {layout: 'user_internal'});
	},

	profile: function(req, res) {

		res.view('user/profile', {layout: 'user_internal'});
	},

	postProfile: function(req, res) {

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
	},

    list: function(req, res) {

        User.find({admin: false}).exec(function(err, users) {
            if(err)
                return res.serverError(err);

            res.view('admin/users/list', {layout: 'admin_internal', users: users});
        });
    },

    edit: function(req, res) {

        User.findOne({id: req.param('id')}).exec(function(err, user) {
            if(err)
                return res.serverError(err);

            res.view('admin/users/edit', {layout: 'admin_internal', user: user});
        });
    },
    update: function(req, res) {

        var data = { 
            name: req.param('name'), 
            email: req.param('email'),
            password: req.param('password'),
        };

        if(!data.password)
            delete data.password;

        User.findOne({ 
            id: {'!': req.param('id')},
            email: data.email
        }).exec(function(err, user) {
            if(user) {
                req.flash('userMessage', 'That email is already taken.')
                res.type('html');
                return res.redirect('back');
            } else {
                
                User.update({id: req.param('id')}, data).exec(function(err, user) {
                    if(err)
                        return res.badRequest(err);

                    req.flash('successUserMessage', 'User successfully updated.');

                    return res.redirect('admin/users');
                });

            }
        });
    },
    search: function() {},
    delete: function() {}
	
};

