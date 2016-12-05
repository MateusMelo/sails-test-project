var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use('local-admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
},
function(req, email, password, done) {

    User.findOne({ email: email, admin: true }, function (err, user) {
      
        if (err) 
            return done(err);

        if (!user)
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong email.')); // req.flash is the way to set flashdata using connect-flash

        bcrypt.compare(password, user.password, function (err, res) {

            if (!res)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            return done(null, user);

        });

    });
}));

passport.use('local-guest-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
},
function(req, email, password, done) {

    process.nextTick(function() {

        User.findOne({ email: email }, function (err, user) {
        
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'Endereço de email já está em uso.'));
            } else {

                var data = { 
                    name: req.param('name'), 
                    email: req.param('email'), 
                    password: req.param('password') 
                };

                User.create(data).exec(function(err, user) {
                    if(err) 
                        return done(err);
                    
                    return done(null, user);
                });

            }
    
        });
    
    });
  
}));

passport.use('local-user-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
},
function(req, email, password, done) {

    User.findOne({ email: email }, function (err, user) {
      
        if (err)
            return done(err);

        if (!user)
            return done(null, false, req.flash('loginMessage', 'Email não cadastrado.')); // req.flash is the way to set flashdata using connect-flash

        bcrypt.compare(password, user.password, function (err, res) {

            if (!res)
                return done(null, false, req.flash('loginMessage', 'Senha incorreta.')); // create the loginMessage and save it to session as flashdata

            return done(null, user);

        });
  
    });
  
}));