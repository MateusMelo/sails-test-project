/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  //Guest routes
  'get /': {
    view: 'guest/login'
  },
  'get /signup': {
    view: 'guest/signup'
  },


  //User routes
  'get /dashboard': {
    view: 'user/dashboard',
    locals: {
      layout: 'user_internal'
    }
  },
  'get /profile': {
    view: 'user/profile',
    locals: {
      layout: 'user_internal'
    }
  },

  //Admin routes
  'get /admin': {
    view: 'admin/login'
  },
  'get /admin/dashboard': {
    view: 'admin/dashboard',
    locals: {
      layout: 'admin_internal'
    }
  },
  'get /admin/users': {
    view: 'admin/users/list',
    locals: {
      layout: 'admin_internal'
    }
  },
  'get /admin/users/deleted': {
    view: 'admin/users/list_deleted',
    locals: {
      layout: 'admin_internal'
    }
  },
  'get /admin/users/edit': {
    view: 'admin/users/edit',
    locals: {
      layout: 'admin_internal'
    }
  }

};
