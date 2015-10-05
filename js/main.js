/**
 * Created by rohitgirme on 9/27/15.
 */
require([
  'config'
], function () {

  'use strict';

  require([
    'jquery',
    'backbone',
    'views/ApplicationView',
    'ApplicationRouter'
  ], function ($, Backbone, AppView, AppRouter) {

    'use strict';

    var appView = new AppView();
    appView.start();

    var appRouter = new AppRouter({
      appView: appView
    });
    appRouter.start();
  });

});