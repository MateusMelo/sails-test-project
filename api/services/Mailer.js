module.exports.sendConfirmationMail = function(obj) {
	
	sails.hooks.email.send(
		'confirmationEmail', 
			{
				name: obj.name
			},
			{
				to: obj.email,
				subject: '[SailsTestProject] Email de Confirmação'
			}, function(err) {}
	)
}