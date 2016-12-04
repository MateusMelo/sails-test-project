module.exports.sendConfirmationMail = function(obj) {
	
	sails.hooks.email.send(
		'confirmationEmail', 
			{
				name: obj.name
			},
			{
				to: obj.email,
				subject: '[SailsTestProject] Confirmation Email'
			}, function(err) {
				console.log(err || 'Mail Sent!');
			}
	)
}