/**
 * Created by rohitgirme on 10/4/15.
 */

define([
  'backbone',
  'utils/Constants'
], function (Backbone, Constants) {

  return Backbone.Router.extend({

    routes: {
      "": "displayMainView"
    },

    initialize: function (options) {
      this.appView = options.appView;
    },

    start: function () {
      Backbone.history.start({
        pushState: true
      });
      this.navigate('', true);
    },

    displayMainView: function () {
      this.appView.showView(Constants.MAIN_VIEW);
    }

  });

});
