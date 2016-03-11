/**
 * Created by rohitgirme on 9/27/15.
 */
require([
  'config'],
  function () {

  'use strict';

  require([
    'jquery',
    'backbone',
    'underscore',
    'views/ApplicationView',
    'ApplicationRouter',
    'models/editor/EditorFactory'
  ], function (
    $,
    Backbone,
    _,
    AppView,
    AppRouter,
    EditorFactory) {

    'use strict';

    var appView = new AppView({
      el: $('#app-container')
    });
    appView.start();

    EditorFactory.initialize();

    var appRouter = new AppRouter({
      appView: appView
    });
    //appRouter.start();
  });

});