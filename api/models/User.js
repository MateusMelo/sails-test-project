var bcrypt = require('bcryptjs');

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		password: {
            type: 'string'
        },
		admin: {
			type: 'boolean',
			defaultsTo: false
		},
		deleted_at: {
			type: 'datetime',
			defaultsTo: null
		},

		verifyPassword: function (password) {
			return bcrypt.compareSync(password, this.password);
		}
	},

	beforeCreate: function (attrs, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(attrs.password, salt, function (err, hash) {
				attrs.password = hash;
				return cb();
			});
		});
	},

	beforeUpdate: function (attrs, cb) {
	
		if(attrs.password) {
			bcrypt.genSalt(10, function(err, salt) {
				if (err) 
					return cb(err);

				bcrypt.hash(attrs.password, salt, function(err, crypted) {
					if(err) 
						return cb(err);

					delete attrs.password;
					attrs.password = crypted;
					return cb();
				});
			});
	
		} else {
			return cb();
		}
	},

	validationMessages: {

        email: {
            required: 'Email is required',
            unique: 'Email address is already taken',
            email: 'Provide valid email address',

        },
        name: {
            required: 'Name is required'
        },
        password: {
        	required: 'Password is required'	
        }
    }

};

