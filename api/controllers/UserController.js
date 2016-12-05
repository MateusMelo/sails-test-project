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

        if(!data.email) {
            req.flash('profileMessage', 'O Email deve ser preenchido.')
            return res.redirect('/profile');
        }

        User.findOne({ 
        	id: {'!': req.session.user.id},
        	email: data.email
        }).exec(function(err, user) {
        	if(user) {
        		req.flash('profileMessage', 'Endereço de email já está em uso.')
        		res.type('html');
        		return res.redirect('/profile');
        	} else {
        		
        		User.update({id: req.session.user.id}, data).exec(function(err, user) {
					if(err)
						return res.badRequest(err);

					req.session.user = user[0];

					req.flash('successProfileMessage', 'Dados atualizados.');

					return res.redirect('/profile');
				});

        	}
        });
	},

    list: function(req, res) {

        var query = { admin: false, deleted_at: null };
        if(req.query.q)
            query.name = {'like': '%' + req.query.q + '%'};

        User.find(query).exec(function(err, users) {
            if(err)
                return res.serverError(err);

            res.view('admin/users/list', {layout: 'admin_internal', users: users});
        });
    },

    deleted: function(req, res) {

        var query = { deleted_at: {'!': null} };
        if(req.query.q)
            query.name = {'like': '%' + req.query.q + '%'};

        User.find(query).exec(function(err, users) {
            if(err)
                return res.serverError(err);

            res.view('admin/users/list_deleted', {layout: 'admin_internal', users: users});
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

        if(!data.email) {
            req.flash('userMessage', 'O Email deve ser preenchido.')
            return res.redirect('back');
        }

        User.findOne({ 
            id: {'!': req.param('id')},
            email: data.email
        }).exec(function(err, user) {
            if(user) {
                req.flash('userMessage', 'Endereço de email já está em uso..')
                res.type('html');
                return res.redirect('back');
            } else {
                
                User.update({id: req.param('id')}, data).exec(function(err, user) {
                    if(err)
                        return res.badRequest(err);

                    req.flash('successUserMessage', 'Dados do usuário atualizados.');

                    return res.redirect('admin/users');
                });

            }
        });
    },
    search: function() {},
    delete: function(req, res) {

        User.update({id: req.param('id')}, {deleted_at: new Date()}).exec(function(err, user) {
            if(err)
                return res.badRequest(err);

            req.flash('successUserMessage', 'Usuário deletado.');

            return res.redirect('admin/users');
        });

    }
	
};

