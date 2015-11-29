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
    'underscore',
    'views/ApplicationView',
    'ApplicationRouter'
  ], function (
    $,
    _,
    Backbone,
    AppView,
    AppRouter) {

    'use strict';

    var appView = new AppView({
      el: $('#app-container')
    });
    appView.start();

    var appRouter = new AppRouter({
      appView: appView
    });
    //appRouter.start();
  });

});