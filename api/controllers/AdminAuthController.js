var passport = require('passport');

module.exports = {
	login: function(req, res) {
		passport.authenticate('local-admin-login', function(err, user, info) {

            if ((err) || (!user)) {
            	req.flash('email', req.param('email'));
                req.flash('loginMessage', 'Bad credentials.')
            	return res.redirect('/admin');
            }

            req.logIn(user, function(err) {
                if (err) 
                	res.send(err);
                
                req.session.authenticated = true;
                req.session.user = user;
                req.session.admin = true;

                return res.redirect('/admin/dashboard');
            });

        })(req, res);
	},

	logout: function(req, res) {
		req.session.authenticated = false;
		req.session.admin = false;
		delete req.session.user;
        req.logout();
        return res.redirect('/admin');
	}
};

