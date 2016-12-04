/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	dashboard: function(req, res) {

		res.view('admin/dashboard', {layout: 'admin_internal'});
	}
	
};

