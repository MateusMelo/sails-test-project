var passport = require('passport');

module.exports = {

	signup: function(req, res) {

        if(!RequestValidator.checkParams(req.allParams())) {
            req.flash('name', req.param('name'));
            req.flash('email', req.param('email'));
            req.flash('signupMessage', 'Preencha todos campos.')
            return res.redirect('/signup');
        }

		passport.authenticate('local-guest-signup', function(err, user, info) {

            if ((err) || (!user)) {
            	req.flash('name', req.param('name'));
            	req.flash('email', req.param('email'));
            	return res.redirect('/signup');
            }

            if(user) {
				Mailer.sendConfirmationMail(user);
			}

            return res.redirect('/');

        })(req, res);

	},

	login: function(req, res) {

        if(!RequestValidator.checkParams(req.allParams())) {
            req.flash('email', req.param('email'));
            req.flash('loginMessage', 'Preencha todos campos.')
            return res.redirect('/');
        }

        passport.authenticate('local-user-login', function(err, user, info) {

            if ((err) || (!user)) {
            	req.flash('email', req.param('email'));
            	return res.redirect('/');
            }

            req.logIn(user, function(err) {
                if (err) 
                	res.send(err);
                
                req.session.authenticated = true;
                req.session.user = user;

                return res.redirect('/dashboard');
            });

        })(req, res);

	},

	logout: function(req, res) {
		req.session.authenticated = false;
		delete req.session.user;
        req.logout();
        return res.redirect('/');
	}
};

